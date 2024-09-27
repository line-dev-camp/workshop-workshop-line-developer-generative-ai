const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const messages = require('../message/bucket');
const firebase = require('../util/firebase.util')


exports.receive = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }
    if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
        return response.status(401).send("Unauthorized");
    }

    const events = request.body.events

    for (const event of events) {

        if (event.source.type !== "group") {
            return response.status(200).send("Permission is Faled");
        }

        /*🔥 1. Join to Chat Group 🔥
        https://developers.line.biz/en/reference/messaging-api/#join-event
        */
        if (event.type === "join") {
            await line.reply(event.replyToken, [messages.welcomeMessage()])
            return response.end();
        }

        /* 🔥 2. Member Joined to Chat Group 🔥
        https://developers.line.biz/en/reference/messaging-api/#member-joined-event
        }*/
        if (event.type === "memberJoined") {
            for (let member of event.joined.members) {
                if (member.type === "user") {

                    const profile = await line.getProfileByGroup(event.source.groupId, member.userId)
                    await line.reply(event.replyToken, [messages.memberJoinedMessage(profile.displayName)])
                }
            }
            return response.end();
        }

        /* 🔥 3. Event Message is ['image', 'audio', 'video', 'file'] 🔥
        https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects
        }*/
        const validateEventType = ['image', 'audio', 'video', 'file']
        if (event.type === "message" && validateEventType.includes(event.message.type)) {

            /* ✅ 3.1 Get Content By API  
            https://developers.line.biz/en/reference/messaging-api/#get-content
            */
            const binary = await line.getContent(event.message.id)

            const extension = firebase.getExtension(event.message.fileName, event.message.type)

            /* ✅ 3.2 Upload Firebase Storage Bucket -> Convert binary  to Medie file  */
            const publicUrl = await firebase.saveImageToStorage( event.source.groupId,event.message.id,binary,extension)

            console.log("publicUrl", publicUrl);
            
            /* ✅ 3.3 Insert Object to Firestore  */
            await firebase.insertImageGroup(event.source.groupId, event.message.id, publicUrl)

            /* ✅ 3.4 Reply View album  */
            console.log("publicUrl", publicUrl);
            
            await line.reply(event.replyToken, [messages.text(publicUrl)])

            return response.end();
        }

        /* 🔥 4. Leave From Chat Group 🔥
          https://developers.line.biz/en/reference/messaging-api/#leave-event
          */
        if (event.type === "leave") {

            console.log(event.source.groupId)
            await firebase.deleteGroupImages(event.source.groupId)
            return response.end();
        }



    }
    return response.end();

});