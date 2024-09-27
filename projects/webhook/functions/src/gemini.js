const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const gemini = require('../util/gemini.util');


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
                if (event.message.type === "text") {
                    // const msg = await gemini.textOnly(event.message.text);
                    const msg = await gemini.chat(event.message.text);
                    await line.reply(event.replyToken, [{ type: "text", text: msg }]);
                    return response.end();
                  }
        
                  if (event.message.type === "image") {
                    const imageBinary = await line.getContent(event.message.id);
                    const msg = await gemini.multimodal(imageBinary);
                    await line.reply(event.replyToken, [{ type: "text", text: msg }]);
                    return response.end();
                  }
            }
        }

    }
    return response.end();

});