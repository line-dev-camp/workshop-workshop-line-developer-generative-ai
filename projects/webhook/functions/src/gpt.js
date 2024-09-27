const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const flex = require('../message/flex');
const gpt = require('../util/gpt.util');
const firebase = require('../util/firebase.util');

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
            await line.isAnimationLoading(event.source.userId)
        }


        const userId = event.source.userId
        if (event.type === "message") {
            if (event.message.type === "text") {
                const prompt = event.message.text;
                let payload;

                if (prompt.includes('Image')) {
                    const imagePrompt = prompt.split(':')[1];
                    const response = await gpt.openaiImageRequest(imagePrompt);
                    payload = {
                        type: "image",
                        originalContentUrl: response,
                        previewImageUrl: response
                    };

                } else {


                    const response = await gpt.openaiTextRequest(prompt, userId);

                    payload = {
                        type: "text",
                        text: response,
                    }
                }
                await line.reply(event.replyToken, [payload]);
            }
        }

    }
    return response.end();

});

exports.history = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }
    if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
        return response.status(401).send("Unauthorized");
    }

    const events = request.body.events
    for (const event of events) {

        const userId = event.source.userId


        if (event.source.type !== "group") {
            await line.isAnimationLoading(userId)
        }


        if (event.type === "message") {
            if (event.message.type === "text") {

                let payload;

                let response = await gpt.chatHistory(event.message.text, userId);

                const isCheckFormatJson = response.includes('json');

                if (isCheckFormatJson) {

                    const cleanedString = response.replace(/json/g, '').replace(/```/g, '').trim();
                    const order = JSON.parse(cleanedString);

                    const uuid = Math.floor(Date.now() / 1000)
                    payload = flex.foodBill(order, uuid)

                } else {
                    payload = {
                        type: "text",
                        text: response,
                    }
                }

                await line.replyWithStateless(event.replyToken, [payload]);
            }
        }

    }
    return response.end();

});

exports.disc = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }
    if (!line.verifySignature(request.headers["x-line-signature"], request.body)) {
        return response.status(401).send("Unauthorized");
    }

    const events = request.body.events
    for (const event of events) {

        if (event.source.type !== "group") {
            // Display a loading animation in one-on-one chats between users and LINE Official Accounts.
            await line.isAnimationLoading(event.source.userId)
        }
        if (event.type === "follow") {

            const profile = await line.getProfile(event.source.userId)

            await line.replyWithStateless(event.replyToken, [{
                "type": "text",
                "text": `ยินดีต้อนรับคุณ ${profile.displayName}เข้าสู่การประเมิน DISC คุณสามารถเริ่มประเมินได้เลย`,
                "sender": {
                    "name": "BOT",
                    "iconUrl": "https://cdn-icons-png.flaticon.com/512/6349/6349320.png"
                },
                "quickReply": {
                    "items": [{
                        "type": "action",
                        "imageUrl": "https://cdn-icons-png.flaticon.com/512/2339/2339864.png",
                        "action": {
                            "type": "uri",
                            "label": "ประเมิน",
                            "uri": `${process.env.LIFF_ENDPOINT_DISC}`
                        }
                    }]
                }
            }])

        }
        if (event.type === "message" && event.message.type === "text") {
            const profile = await line.getProfile(event.source.userId)
            if (event.message.text === "ฉันได้ประเมินเรียบร้อยแล้ว") {



                const user = await firebase.getUserAnswer(event.source.userId)


                const image = await gpt.openaiImageRequest(user.description)
                answer = {
                    model: user.model,
                    description: user.description,
                    image: image,
                }


                await line.replyWithStateless(event.replyToken, [{
                    "type": "text",
                    "text": `คุณ ${profile.displayName} คุณอยู่ในกลุ่ม ${answer.model} \r\n\r\n รายละเอียด ${answer.description}`,
                }, {
                    "type": "image",
                    "originalContentUrl": answer.image,
                    "previewImageUrl": answer.image
                }])



            }

        }
    }
    return response.end();

});


exports.createAnswerByUserId = onRequest({
    cors: true
}, async (request, response) => {

    try {
        if (request.method !== "POST") {
            return response.status(200).send("Method Not Allowed");
        }

        const profile = await line.getProfileByIDToken(request.headers.authorization);

        const {
            answers
        } = request.body;
        const answersMapIndex = answers.map((answer, index) => `${index + 1}. ${answer}`);


        const responseModel = await gpt.openaiTextRequestDISC(JSON.stringify(answersMapIndex))
        const cleanedString = responseModel.replace(/json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedString);

        const object = {
            "userId": profile.sub,
            "model": parsed.model,
            "description": parsed.description,
            "Answers": answersMapIndex,
        }
        await firebase.insertUserAnswer(object)

        return response.status(200).json(object).end();

    } catch (error) {
        console.error("Error:", error);
        return response.status(500).send("Internal Server Error");
    }

});