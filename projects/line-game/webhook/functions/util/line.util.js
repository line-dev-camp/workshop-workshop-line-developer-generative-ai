const axios = require("axios");
const cache = require('./cache.util.js');
const jose = require("node-jose");
const qs = require('qs');
const crypto = require('crypto');



/*
#Get profile
https://developers.line.biz/en/reference/messaging-api/#get-profile
*/

exports.getProfile = async (userId) => {

    try {

        const url = `${process.env.LINE_MESSAGING_API}/profile/${userId}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Failed to fetch user profile. API responded with status: ${response.status}`);

        }

    } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};
/*
Cache Profile to memory
https://www.npmjs.com/package/node-cache
*/
exports.getProfileByCache = async (userId) => {

    try {
        let profile = cache.getCache(userId);
        if (profile == undefined) {

            const url = `${process.env.LINE_MESSAGING_API}/profile/${userId}`;

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                cache.setCache(userId, response.data)
                return response.data
            } else {
                throw new Error(`Failed to fetch user profile. API responded with status: ${response.status}`);

            }
        }
        return profile

    } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/*
Get group chat member profile
https://developers.line.biz/en/reference/messaging-api/#get-group-member-user-ids
*/

exports.getProfileByGroup = async (groupId, userId) => {

    try {

        const url = `${process.env.LINE_MESSAGING_API}/group/${groupId}/member/${userId}`;
        console.log(url)
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Failed to fetch user profile. API responded with status: ${response.status}`);

        }
    } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};
/*
Get group chat member profile
https://developers.line.biz/en/reference/messaging-api/#get-group-member-user-ids
*/

exports.groupInfo = async (groupId) => {

    try {
        const url = `${process.env.LINE_MESSAGING_API}/group/${groupId}/summary/`;
        console.log(url)
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Failed to fetch user profile. API responded with status: ${response.status}`);

        }
    } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/*
Get profile information from an ID token
https://developers.line.biz/en/docs/line-login/verify-id-token/#get-profile-info-from-id-token
*/

exports.getProfileByIDToken = async (idToken) => {

    try {
        const response = await axios.post(process.env.LINE_ENDPOINT_API_VERIFY, {
            id_token: idToken,
            client_id: process.env.LINE_LIFF_CHANNEL_ID,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch user profile. API responded with status: ${response.status}`);
        }
        console.info(`[getProfileByIDToken] : User profile retrieved successfully.`, response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        // throw error;
        return false;
    }
};

/*
Get profile information from an ID token
https://developers.line.biz/en/docs/line-login/verify-id-token/#get-profile-info-from-id-token
*/

exports.getGroupInfoByGroupId = async (groupId) => {

    try {
        const url = `${process.env.LINE_MESSAGING_API}/group/${groupId}/summary`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Failed to fetch group profile. API responded with status: ${response.status}`);

        }
    } catch (error) {
        console.error('Error fetching group profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};
/*
#Display a loading animation
https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message
*/
exports.isAnimationLoading = async (userId) => {
    try {

        const accessToken = await issueStatelessAccessToken();

        const url = `${process.env.LINE_MESSAGING_API}/chat/loading/start`;
        const response = await axios.post(url, {
            "chatId": `${userId}`,
            "loadingSeconds": 10 // The default value is 20.
            // Number of seconds to display a loading animation. You can specify a any one of 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, or 60.
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 202) {
            return response.data;
        } else {
            throw new Error(`Failed to send Animation loading. API responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error sending Animation loading:', error.message);
        throw error;
    }
};

/*richmenu messsage with stateless*/
exports.richMenuWithStateless = async (userId, richMenuId) => {
    try {
        const accessToken = await issueStatelessAccessToken();

        const url = `${process.env.LINE_MESSAGING_API}/user/${userId}/richmenu/${richMenuId}`;

        console.log(url);
        const response = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed Change Rich Menu. API responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error in sending stateless Rich Menu:', error.message);
        throw error;
    }
};

/*Reply Long Live Token*/
exports.reply = async (token, payload) => {
    const url = `${process.env.LINE_MESSAGING_API}/message/reply`;
    const response = await axios.post(url, {
        replyToken: token,
        messages: payload
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(`Failed to send reply. API responded with status: ${response.status}`);
    }
};

/*Reply messsage with stateless token*/
exports.replyWithStateless = async (token, payload) => {
    try {
        const accessToken = await issueStatelessAccessToken();

        const url = `${process.env.LINE_MESSAGING_API}/message/reply`;
        const response = await axios.post(url, {
            replyToken: token,
            messages: payload
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to send reply. API responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error in sending stateless reply:', error.message);
        throw error;
    }
};


exports.multicast = async (payload) => {
    try {
        const accessToken = await issueStatelessAccessToken();

        const url = `${process.env.LINE_MESSAGING_API}/message/multicast`;
        const response = await axios.post(url, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to send reply. API responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error in sending stateless reply:', error.message);
        throw error;
    }
};

/*Push messsage with stateless token*/
exports.pushWithStateless = async (userId, payload) => {
    try {
        const accessToken = await issueStatelessAccessToken();

        const url = `${process.env.LINE_MESSAGING_API}/message/push`;
        const response = await axios.post(url, {
            to: userId,
            messages: payload
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to send reply. API responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error in sending stateless reply:', error.message);
        throw error;
    }
};

/*Push messsage with channel access token v2.1*/
exports.pushWithTokenV2 = async (userId, payload) => {
    try {
        const accessToken = await issueTokenv2_1()

        const url = `${process.env.LINE_MESSAGING_API}/message/push`;
        const response = await axios.post(url, {
            to: userId,
            messages: payload
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to send reply. API responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error in sending stateless reply:', error.message);
        throw error;
    }
};

/*

Retrying an API request
https://developers.line.biz/en/docs/messaging-api/retrying-api-request/
*/
exports.pushRetryKey = async (userId, payload) => {
    try {

        const accessToken = await issueStatelessAccessToken();

        const url = `${process.env.LINE_MESSAGING_API}/message/push`;
        const response = await axios.post(url, {
            to: userId,
            messages: payload
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const status = false
        if (!status) {

            const responseRetry = await axios.post(url, {
                to: userId,
                messages: payload
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Line-Retry-Key': response.headers['x-line-request-id'],
                    'Content-Type': 'application/json'
                }
            });

            if (responseRetry.status !== 500) {
                return response.data;
            } else {
                throw new Error(`Failed Retrying an API request. API responded with status: ${response.status}`);
            }

        }

    } catch (error) {
        console.error('Error in sending stateless reply:', error.message);
        throw error;
    }
};


/*
Send broadcast message
https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message
*/
exports.broadcastConsumption = async (payload) => {
    try {
        const accessToken = await issueStatelessAccessToken();
        // Fetch all required data concurrently
        const [quotaMessage, quotaConsumption, numberOfFollowers] = await Promise.all([
            getQuota(accessToken),
            getConsumption(accessToken),
            getNumberOfFollowers(accessToken),
        ]);

        console.log("Quota ", quotaMessage);
        console.log("Consumption", quotaConsumption);
        console.log("Number Of Followers", numberOfFollowers);

        // Calculate remaining quota and compare with the number of followers
        if (parseInt(quotaMessage.value - quotaConsumption.totalUsage) > numberOfFollowers.followers) {
            const url = `${process.env.LINE_MESSAGING_API}/message/broadcast`;
            const response = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Failed to send broadcast. API responded with status: ${response.status}`);
            }
        }

    } catch (error) {
        console.error('Error in broadcastConsumption:', error);
        throw error;
    }

};

/*
Get the target limit for sending messages this month
https://developers.line.biz/en/reference/messaging-api/#get-quota
*/
async function getQuota(accessToken) {
    const url = `${process.env.LINE_MESSAGING_API}/message/quota`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });
    return response.data;
}

/*
Get number of messages sent this month
https://developers.line.biz/en/reference/messaging-api/#get-consumption
*/
async function getConsumption(accessToken) {
    const url = `${process.env.LINE_MESSAGING_API}/message/quota/consumption`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });
    return response.data;
}

/*
Get number of followers
https://developers.line.biz/en/reference/messaging-api/#get-number-of-followers
*/
async function getNumberOfFollowers(accessToken) {
   const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const url = `${process.env.LINE_MESSAGING_API}/insight/followers?date=${currentDate}`;
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });
    return response.data;
}


/* 
  # Stateless Channel Access Token
  https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token
  https://medium.com/linedevth/stateless-channel-access-token-e489dfc210ad

  Issues channel access tokens that are only valid for 15 minutes. There is no limit to the number of tokens that can be issued. Once a stateless channel access token is issued, it can't be revoked.


*/
async function issueStatelessAccessToken() {
    try {

        let token = cache.getCache(process.env.LINE_MESSAGING_CHANNEL_ID);
        if (token == undefined) {
            const response = await axios.post(process.env.LINE_MESSAGING_OAUTH_ISSUE_TOKENV3, {
                grant_type: 'client_credentials',
                client_id: process.env.LINE_MESSAGING_CHANNEL_ID,
                client_secret: process.env.LINE_MESSAGING_CHANNEL_SECRET
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            if (response.status === 200 && response.data && response.data.access_token) {
                cache.setCache(process.env.LINE_MESSAGING_CHANNEL_ID, response.data.access_token)
                return response.data.access_token;
            } else {
                throw new Error('Failed to obtain access token, check response for details.');
            }
        }
        return token;
    } catch (error) {
        console.error('Error issuing token:', error.message);
        throw error;
    }
}



/*
#verify-signature
https://developers.line.biz/en/docs/messaging-api/receiving-messages/#verify-signature
https://medium.com/linedevth/7a94d9548f34

When your bot server receives a request, verify the request sender. To make sure the request is from the LINE Platform, make your bot server verify the signature in the x-line-signature request header.
*/
exports.verifySignature = (originalSignature, body) => {
    const signature = crypto
        .createHmac("SHA256", process.env.LINE_MESSAGING_CHANNEL_SECRET)
        .update(JSON.stringify(body))
        .digest("base64");

    if (signature !== originalSignature) {
        return false;
    }
    return true;
};


/*

Get content
https://developers.line.biz/en/reference/messaging-api/#get-content
! Content is automatically deleted after a certain period from when the message was sent. There is no guarantee for how long content is stored.
*/

exports.getContent = async (messageId) => {

    try {

        const url = `${process.env.LINE_DATA_MESSAGING_API}/message/${messageId}/content`
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
            },
            responseType: 'arraybuffer',
        });

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Failed to fetch user profile. API responded with status: ${response.status}`);

        }

    } catch (error) {
        console.error('Error Get Content:', error.response ? error.response.data : error.message);
        throw error;
    }
};