const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const flex = require('../message/flex');


exports.broadcast = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }

    await line.broadcastConsumption(request.body)
    return response.status(200).send("Send broadcast");

});

exports.multicast = onRequest(async (request, response) => {

    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }

    const users = request.body.to;
    const dataArray = users;
    const maxLength = 500;
    const resultArray = [];

    for (let i = 0; i < dataArray.length; i += maxLength) {
        const subArray = dataArray.slice(i, i + maxLength);
        resultArray.push(subArray);
    }

    for (const userIds of resultArray) {
        let data = {
            "to": userIds,
            "messages": [{
                "type": "flex",
                "altText": "^^ vdo ^^",
                "contents": {
                    "type": "bubble",
                    "size": "giga",
                    "hero": {
                        "type": "video",
                        "url": "https://workshop-ex10.s3.ap-southeast-1.amazonaws.com/vdo.mp4",
                        "previewUrl": "https://workshop-ex10.s3.ap-southeast-1.amazonaws.com/preview.png",
                        "aspectRatio": "1280:720",
                        "altContent": {
                            "type": "image",
                            "size": "full",
                            "url": "https://workshop-ex10.s3.ap-southeast-1.amazonaws.com/preview.png"
                        }
                    }
                }
            }]
        }
        await line.multicast(data)
    }
    return response.status(200).send("Send multicast");


});

exports.push = onRequest(async (request, response) => {

    const userId = request.body.to
    if (userId) {
        const profile = await line.getProfile(userId)
        await line.pushWithTokenV2(userId, [flex.profile(profile.pictureUrl, profile.displayName)])
    }
    return response.status(200).send("Send Push");

});