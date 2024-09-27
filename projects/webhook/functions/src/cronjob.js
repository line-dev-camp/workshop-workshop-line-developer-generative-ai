const { onRequest } = require("firebase-functions/v2/https");
const {onSchedule} = require("firebase-functions/v2/scheduler");

exports.cronjob = onRequest(async (request, response) => {

    // do something    
    // https://cron-job.org/en/
    
    console.log("Hello World");
    return response.end();

});


// exports.scheduled = onSchedule("every 2 minutes", async (event) => {
//     // do somthing
//     // firebase cloud functions scheduler

//     console.log("Hello World");
//     return response.end();
// });

