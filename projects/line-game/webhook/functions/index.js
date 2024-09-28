const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({
    region: "asia-northeast1",
    memory: "1GB",
    concurrency: 40
})

exports.webhook = require('./src/webhook')
exports.service = require('./src/service')
// exports.message = require('./src/message')
// exports.bucket = require('./src/bucket')
// exports.random = require('./src/random')
// exports.gpt = require('./src/gpt')
// exports.gemini = require('./src/gemini')
// exports.cronjob = require('./src/cronjob')
// exports.game = require('./src/game')