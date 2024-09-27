const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const flex = require('../message/flex');
const messages = require('../message/messages');
const chartjs = require('../util/chartjs.util');

exports.receive = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }
    // if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
    //     return response.status(401).send("Unauthorized");
    // }

    const events = request.body.events
    for (const event of events) {

        if (event.source.type !== "group") {
            await line.isAnimationLoading(event.source.userId)
        }

        console.log(JSON.stringify(event));

        switch (event.type) {
            case "follow":
                const profile = await line.getProfile(event.source.userId)

                console.log(JSON.stringify(profile));


                if (event.follow.isUnblocked) {
                    await line.reply(event.replyToken, [messages.welcomeBack(profile)])
                } else {
                    await line.reply(event.replyToken, [messages.welcomeMessage(profile)])
                }
                break;
            case "unfollow":

                // console.log(JSON.stringify(event));

                break;
            case "message":


                if (event.message.type === "text") {
                    const profile = await line.getProfile(event.source.userId)

                    switch (event.message.text) {
                        case "demo":

                            await line.replyWithStateless(event.replyToken, [{
                                "type": "text",
                                "text": JSON.stringify(profile)
                            }])


                            break;
                        case "สวัสดี":

                            await line.replyWithStateless(event.replyToken, [messages.welcomeMessage(profile)])


                            break;

                        case "profile":

                            await line.replyWithStateless(event.replyToken, [flex.profile(profile.pictureUrl, profile.displayName)])


                            break;

                        case "vdo":

                            await line.replyWithStateless(event.replyToken, [flex.vdo()])


                            break;

                        case "service":

                            await line.replyWithStateless(event.replyToken, [flex.service()])


                            break;

                        case "bill":

                            await line.replyWithStateless(event.replyToken, [flex.bill()])

                        case "queue":

                            await line.replyWithStateless(event.replyToken, [flex.queue()])


                            break;

                        case "booking":

                            await line.replyWithStateless(event.replyToken, [flex.booking()])


                            break;

                        case "chart":
                            let chartUrl = await chartjs.createChart(event.source.userId, event.message.id)
                            // For Dev 
                            chartUrl = chartUrl.replace('http://127.0.0.1:9199', process.env.STORAGE_URL);


                            await line.reply(event.replyToken, [flex.chartBar(chartUrl)])

                            break;

                        default:
                            break;
                    }

                }

                break;
            case "postback":
                const date = event.postback.params.date
                console.log(date);
                if (date) {
                    await line.replyWithStateless(event.replyToken, [messages.postbackDate(date)])
                }


                break;


        }

    }
    return response.end();

});

exports.destination = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }
    // if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
    //     return response.status(401).send("Unauthorized");
    // }

    const destination = request.body.destination
    const events = request.body.events
    for (const event of events) {

        if (event.source.type !== "group") {
            await line.isAnimationLoading(event.source.userId)
        }

        console.log("destination : " + destination);


        switch (event.type) {

            case "message":


                if (event.message.type === "text") {
                    const profile = await line.getProfile(event.source.userId)
                    if (destination === process.env.LINE_MESSAGING_DESTINATION_A) {
                        await line.replyWithStateless(event.replyToken, [messages.welcomeMessage(profile)])
                    }
                    if (destination === process.env.LINE_MESSAGING_DESTINATION_B) {
                     console.log(JSON.stringify(event));
                     
                    }

                break;
        }
    }


}
return response.end();

});

exports.group = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }
    // if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
    //     return response.status(401).send("Unauthorized");
    // }

    const events = request.body.events
    for (const event of events) {

        if (event.source.type !== "group") {
            return response.status(200).send("Permission is Faled");
        }

        console.log(JSON.stringify(event));

        switch (event.type) {
            case "join":
                await line.reply(event.replyToken, [{
                    "type": "text",
                    "text": `สวัสดีทุกคน`,
                    "sender": {
                        "name": "BOT",
                        "iconUrl": "https://cdn-icons-png.flaticon.com/512/10176/10176915.png "
                    },
                    "quickReply": {
                        "items": [{
                                "type": "action",
                                "action": {
                                    "type": "uri",
                                    "label": "add friend",
                                    "uri": "https://line.me/R/ti/p/@563cfvvc"
                                }
                            },
                            {
                                "type": "action",
                                "action": {
                                    "type": "uri",
                                    "label": "share",
                                    "uri": "https://line.me/R/nv/recommendOA/@563cfvvc"
                                }
                            }
                        ]
                    }
                }])
                break;
            case "leave":
                console.log(JSON.stringify(event));
                break;
            case "memberJoined":

                for (let member of event.joined.members) {
                    if (member.type === "user") {

                        const groupinfo = await line.getGroupInfoByGroupId(event.source.groupId)
                        const profile = await line.getProfileByGroup(event.source.groupId, member.userId)
                        await line.reply(event.replyToken, [{
                            "type": "text",
                            "text": `สวัสดีคุณ ${profile.displayName} เข้าสู่กลุ่ม ${groupinfo.groupName} ครับ`,
                        }])
                    }
                }

                break;
            case "memberLeft":

                for (const member of event.left.members) {
                    if (member.type === "user") {

                        console.log(JSON.stringify(event));

                    }
                }

                break;
            case "message":


                console.log('event object', event.message);


                if (event.message.type === "text") {

                    if (event.message.text == "สวัสดี") {

                        await line.reply(event.replyToken, [{
                            "type": "text",
                            "text": `สวัสดีครับ`,
                            "quoteToken": event.message.quoteToken
                        }])

                    } else {

                        const groupInfo = await line.groupInfo(event.source.groupId)
                        await line.reply(event.replyToken, [{
                            "type": "text",
                            "text": `${JSON.stringify(groupInfo)}`,
                        }])

                    }


                }

                break;
        }

    }
    return response.end();

});

exports.timeout = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.send(request.method);
    }

    // if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
    //     return response.status(401).send("Unauthorized");
    // }

    const currentTimeStamp = Math.floor(Date.now() / 1000)

    const events = request.body.events
    for (const event of events) {

        switch (event.type) {
            case "message":
                if (event.message.type === "text") {

                    if (event.message.text === "flex") {

                        await line.replyWithStateless(event.replyToken, [flex.unixtime(currentTimeStamp + 60)])

                    }

                }

                break;
            case "postback":
                const expireTime = event.postback.data
                let message = (currentTimeStamp > expireTime) ? "❌ Time Out" : "✅ In Time"

                console.log("message:", message);


                await line.replyWithStateless(event.replyToken, [{
                    "type": "text",
                    "text": message
                }])

                break;
        }

    }

    return response.end();

});