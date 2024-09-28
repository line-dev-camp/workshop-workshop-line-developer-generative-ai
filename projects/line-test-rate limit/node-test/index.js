const fs = require('fs');
const axios = require('axios');

const LINE_API_ENDPOINT = 'https://api.line.me/v2/bot/message/push';
const LINE_ACCESS_TOKEN = ''; // Replace with your access token
const USER_ID_FILE = 'userid.txt';
const LOG_FILE = 'push_message_log.txt';

// Adjust these values based on your requirements and LINE API rate limits
const MAX_REQUESTS_PER_SECOND = 100; // Adjust based on allowed rate

async function sendPushMessage(userId, message) {
  try {
    const response = await axios.post(LINE_API_ENDPOINT, {
      to: userId,
      messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
      }
    });
    console.log(response);
    // console.log(`Push message sent to ${userId}: ${response.data.message}`);
    logResponse(userId, response.data);
  } catch (error) {
    // console.error(`Error sending push message to ${userId}:`, error);
    logError(userId, error);
  }
}

function logResponse(userId, response) {
    const date = new Date();
    const bangkokTime = date.toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok'
    });
    const logMessage = `[${bangkokTime}] User ID: ${userId}, Response: ${JSON.stringify(response)}\n`;
    fs.appendFileSync(LOG_FILE, logMessage);
}

function logError(userId, error) {
    const date = new Date();
    const bangkokTime = date.toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok'
    });
    const errorMessage = `[${bangkokTime}] User ID: ${userId}, Error: ${JSON.stringify(error.response.data)}\n`;
    fs.appendFileSync(LOG_FILE, errorMessage);
}


async function main() {
    const date = new Date();
    const bangkokTime = date.toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok'
    });
    console.log("bangkokTime:", bangkokTime);
  try {
    const userIds = fs.readFileSync(USER_ID_FILE, 'utf8').split('\n');

    let currentBatch = []; // Array to hold a batch of user IDs for requests
    let startTime = Date.now();

    for (const userId of userIds) {
      currentBatch.push(userId.trim());

      if (currentBatch.length === MAX_REQUESTS_PER_SECOND) {
        await sendBatchRequests(currentBatch); // Send current batch
        currentBatch = []; // Reset batch
        startTime = Date.now(); // Reset time for next batch
      }
    }

    // Send any remaining user IDs at the end
    if (currentBatch.length > 0) {
      await sendBatchRequests(currentBatch);
    }

    console.log('Push messages sent successfully!');
    console.log("bangkokTime:", bangkokTime);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sendBatchRequests(userIds) {
  const promises = userIds.map(userId => sendPushMessage(userId, 'Your push message here')); // Replace with your message
  await Promise.all(promises); // Wait for all batch requests to finish
}

main();