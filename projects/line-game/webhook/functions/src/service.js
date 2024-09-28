const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const firebase = require('../util/firebase.util');

exports.createPoint = onRequest({
    cors: true
}, async (request, response) => {

    try {
        if (request.method !== "POST") {
            return response.status(200).send("Method Not Allowed");
        }

     
        if (!request.body.value) {
            return response.status(401).send("User not authorized");
        }
        const userIdTarget = request.body.value;

        const profile = await line.getProfileByIDToken(request.headers.authorization);
        if (userIdTarget!== profile.sub) {

            const user = await firebase.getUserByUserId(profile.sub);
            if (user) {
                let point = user.point + 1;

                const object = {
                    message: "คุณได้รับ 1 point",
                };
                const count = await firebase.countScanUser(profile.sub, userIdTarget);
                if (count == 0) {
                    const responseUpdate = await firebase.update(profile.sub, point);
                    if (responseUpdate) {
                        await firebase.insertScanUser(profile.sub, userIdTarget);
                        return response.status(200).json(object).end();

                    }
                }
            }

        }
        const object = {
            message: "คุณไม่สามารถรับ point ได้",
        };


        return response.status(200).json(object).end();

    } catch (error) {
        console.error("Error:", error);
        return response.status(500).send("Internal Server Error");
    }

});