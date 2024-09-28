const {
    onRequest
} = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const firebase = require('../util/firebase.util');
const flex = require('../message/flex');
const QRCode = require("qrcode");

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

        switch (event.type) {
            case "follow":
                const profile = await line.getProfile(event.source.userId)
                await firebase.insertUser(profile)
                await line.reply(event.replyToken, [flex.profileView(profile.pictureUrl, profile.displayName, "0")])
                break;
            case "message":

                if (event.message.text === "RANDOM") {

                    usersList = await firebase.getUser()

                    groupUsers(usersList).forEach(async (group, groupIndex) => {

                        const groupId = `group${groupIndex + 1}`;
                        group.forEach(async (user) => {
                            user = await firebase.getUserByUserId(user.userId)
                        });
                        const groupData = {
                            groupId: groupId,
                            users: group
                        };
                        firebase.updateGameGroup(groupData)
                    })

                    return response.end();
                }
                if (event.message.text === "My Profile") {

                    let user = await firebase.getUserByUserId(event.source.userId)
                    await line.reply(event.replyToken, [flex.profileView(user.pictureUrl, user.displayName, user.point.toString())])

                    return response.end();
                }
                if (event.message.text === "My Group") {

                    let groupsData = await firebase.getGameByUserId()
                    if (groupsData.length  > 0) {

                        const groupsWithUser = findGroupsByUserId(groupsData, event.source.userId);
                        let userFlex = []
                        groupsWithUser.forEach(async group => {
                            for (const user of group.users) {

                                let profile = await firebase.getUserByUserId(user.userId)

                                userFlex.push(flex.profile(profile.pictureUrl, profile.displayName, profile.point.toString()))
                            }
                            await line.reply(event.replyToken, [flex.team(userFlex)])
                            return response.end();
                        });
                    }



                    return response.end();
                }

                if (event.message.text === "My QR") {
                    // Usage example
                    const image = await generateQRCodeImage(event.source.userId)
                    const base64Image = image.split(';base64,').pop();
                    const imageBuffer = Buffer.from(base64Image, 'base64');
                    const publicUrl = await firebase.saveImageToStorage(event.source.userId, imageBuffer, "png")
                    console.log(publicUrl);
                    await line.reply(event.replyToken, [{
                        "type": "image",
                        "originalContentUrl": `https://a6e9aa01d4cc.ngrok.app/line-workshop-game.appspot.com/${event.source.userId}.png`,
                        "previewImageUrl": `https://a6e9aa01d4cc.ngrok.app/line-workshop-game.appspot.com/${event.source.userId}.png`
                    }])
                    return response.end();
                }

                break;



        }

    }
    return response.end();

});

// Function to shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

// Function to group users into arrays of 3, after shuffling
function groupUsers(users) {
    const groupSize = 3;
    const shuffledUsers = shuffleArray([...users]); // Copy the array to avoid mutating the original
    const result = [];

    for (let i = 0; i < shuffledUsers.length; i += groupSize) {
        result.push(shuffledUsers.slice(i, i + groupSize));
    }

    return result;
}

function findGroupsByUserId(groups, userId) {
    return groups.filter(group =>
        group.users.some(user => user.userId === userId)
    );
}

// Function to generate a QR code image as a base64 string
async function generateQRCodeImage(text) {
    try {
        // Generate QR code as a data URL (base64 image)
        const qrCodeDataUrl = await QRCode.toDataURL(text, {
            width: 300, // Set the size of the QR code
            margin: 1, // Set the margin around the QR code
            color: {
                dark: '#000000', // QR code color
                light: '#ffffff' // Background color
            }
        });

        console.log('QR Code Image generated successfully');
        return qrCodeDataUrl; // Returns the QR code as a base64 image string
    } catch (error) {
        console.error('Error generating QR Code Image:', error);
        throw error;
    }
}