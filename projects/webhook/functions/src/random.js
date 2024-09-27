const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const messages = require('../message/random');
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

                    /* ✅ 2.1 Firebase : Insert User to Group  */
                    await firebase.insertUserGroup(event.source.groupId, profile)

                    /* ✅ 2.2 Firebase : Total Number User in Group  */
                    const countGroup = await firebase.countUserGroup(event.source.groupId)

                    /* ✅ 2.3 Reply Member Joined to Chat Group  */
                    await line.reply(event.replyToken, [messages.memberJoinedMessage(profile.data.displayName, countGroup)])
                }
            }
            return response.end();
        }

        /* 🔥 3. Event Message 🔥
      https://developers.line.biz/en/reference/messaging-api/#message-event
       */
        if (event.type === "message" && event.message.type === "text") {

            /* ✅ 3.1 insert User to Group  */
            const profile = await line.getProfileByGroup(event.source.groupId, event.source.userId)
            await firebase.insertUserGroup(event.source.groupId,profile)

            let textMessage = event.message.text


            /* 🚨 Check Total Member Group From Database */
            if (textMessage === "ตี้ฉัน") {

                /* ✅ 3.2 Firebase : Total Number User in Group */
                let countGroup = await firebase.countUserGroup(event.source.groupId)

                /* ✅ 3.3 Reply Total Member Group */
                await line.reply(event.replyToken, [messages.summaryGroup(countGroup)])

                return response.end();
            }


            /* 🚀 main feature  */
            let splitStringMessage = textMessage.split(' ')
            let subStringMessage = splitStringMessage[0].substring(0, 4)
            if (subStringMessage === "แตก") {

                /* ✅ 3.4 Firebase : Total Number User in Group */
                let countGroup = await firebase.countUserGroup(event.source.groupId)
                /* 🔎 Validate Element Array from 
                    subStringMessage = แตก
                    splitStringMessage  = [แตก, 4,4,4,5] 
                */
                const tableSizeArray = await validateAndExtractNumbers(splitStringMessage, subStringMessage)
                /* 🔎 Summary Array */
                const totalMember = tableSizeArray.reduce((acc, val) => acc + val, 0);
                /* ❌ [Reply Error Message] Table < 2 */
                if (tableSizeArray.length < 2) {
                    await line.reply(event.replyToken, [messages.countTableError(countGroup)]);
                    return response.end();
                }

                /* ❌[reoply Error message] Summary group from array not equl all member in group  */
                if (countGroup !== totalMember) {
                    await line.reply(event.replyToken,  [messages.summaryGroupError(countGroup, totalMember)]);
                    return response.end();
                }

                /* ✅ 3.5 Shuffle Table Group */
                await shuffleTableGroup(event.replyToken, event.source.groupId, tableSizeArray);
                return response.end();

            }

        }



        /* 🔥 4. Member Leave From Chat Group 🔥
        https://developers.line.biz/en/reference/messaging-api/#member-left-event
        */
        if (event.type === "memberLeft") {
            for (const member of event.left.members) {
                if (member.type === "user") {
                    await firebase.deleteUserGroup(member.userId, event.source.groupId)

                }
            }
            return response.end();
        }


        /* 🔥 5. Leave From Chat Group 🔥
        https://developers.line.biz/en/reference/messaging-api/#leave-event
        */
        if (event.type === "leave") {
            await firebase.deleteGroup(event.source.groupId)
            return response.end();
        }



    }
    return response.end();

});


async function validateAndExtractNumbers(splitMessages, excludedMessage) {
    return splitMessages
        .filter(message => message !== excludedMessage)
        .map(message => {
            const extractedNumber = Number(message.substring(0, 2));
            if (!isNaN(extractedNumber) && extractedNumber !== 0) {
                return extractedNumber;
            } else {
                throw new Error('❌ Invalid number format');
            }
        });
}

/*  Reply Message and Random User and Table */
async function shuffleTableGroup (replyToken, groupId, tableSizeArray) {

    // Fetch and shuffle user list
    const usersInGroup = await firebase.getUserGroup(groupId);

    const shuffledUsers = await shuffleArray(usersInGroup);


    // Determine the number of tables
    const maxTables = 20;
    const tables = await createTables(maxTables, tableSizeArray.length);


    // Distribute users across tables
    let currentTableIndex = 0;
    shuffledUsers.forEach(user => {
        tables[currentTableIndex].members.push(user);
        if (tables[currentTableIndex].members.length === parseInt(tableSizeArray[currentTableIndex])) {
            currentTableIndex++;
        }
    });

    // Construct the message report
    let reportMessage = '';
    tables.forEach((table, index) => {
        if (table.members.length > 0) {
            reportMessage += `โต๊ะ ${index + 1} จำนวน ${table.members.length} คน\n`;
            table.members.forEach((member, memberIndex) => {
                reportMessage += `\n ${memberIndex + 1}. ${member.displayName}`;
            });
            reportMessage += "\n------------------\n";
        }
    });

    reportMessage += "แตกโต๊ะ แต่ไม่แตกแยก กลับมาแตกด้วยกันใหม่น้า";

    // Reply with the message
    await line.reply(replyToken,  [messages.namelist(reportMessage)]);
}

/*  Shuffle Array By Chat GPT */
async function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* Create Maximum Table */
async function createTables(maxTables, requiredTables) {
    if (requiredTables > maxTables) {
        return false;
    }
    const tables = [];
    for (let i = 0; i < maxTables; i++) {
        tables.push({
            members: []
        });
    }
    return tables;
}