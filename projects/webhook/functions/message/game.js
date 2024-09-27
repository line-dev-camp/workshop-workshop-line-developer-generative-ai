const quickReplyMember = {
    "items": [{
            "type": "action",
            "imageUrl": "https://bucket.ex10.tech/images/8d325cbc-d31f-11ee-97d4-0242ac12000b/originalContentUrl.png",
            "action": {
                "type": "message",
                "label": "เข้าร่วม",
                "text": "เข้าร่วม"
            }
        },
        {
            "type": "action",
            "imageUrl": "https://bucket.ex10.tech/images/c29daf78-d323-11ee-97d4-0242ac12000b/originalContentUrl.png",
            "action": {
                "type": "message",
                "label": "กติกา",
                "text": "กติกา"
            }
        },
        {
            "type": "action",
            "imageUrl": "https://bucket.ex10.tech/images/bdbdcdd7-d381-11ee-97d4-0242ac12000b/originalContentUrl.png",
            "action": {
                "type": "message",
                "label": "เริ่มเกม",
                "text": "เริ่มเกม"
            }
        },
        {
            "type": "action",
            "imageUrl": "https://bucket.ex10.tech/images/871f88ff-d3b0-11ee-97d4-0242ac12000b/originalContentUrl.png",
            "action": {
                "type": "message",
                "label": "ล้างเกมของคุณ",
                "text": "ล้างเกมของคุณ"
            }
        }
    ]
}
const quickReplyGame = {
    "items": [{
            "type": "action",
            "imageUrl": "https://bucket.ex10.tech/images/8d325cbc-d31f-11ee-97d4-0242ac12000b/originalContentUrl.png",
            "action": {
                "type": "message",
                "label": "สร้างเกม",
                "text": "สร้างเกม"
            }
        },
        {
            "type": "action",
            "imageUrl": "https://bucket.ex10.tech/images/871f88ff-d3b0-11ee-97d4-0242ac12000b/originalContentUrl.png",
            "action": {
                "type": "message",
                "label": "ล้างเกมของคุณ",
                "text": "ล้างเกมของคุณ"
            }
        }
    ]
}




exports.textMessageQuickReply = (text) => {
    return {
        "type": "text",
        "text": text,
        "quickReply": quickReplyMember
    }

};
exports.textMessageQuickReplyGame = (text) => {
    return {
        "type": "text",
        "text": text,
        "quickReply": quickReplyGame
    }

};
exports.textMessageEndGame = (text) => {
    return {
        "type": "text",
        "text": text,
        "quickReply": {
            "items": [{
                    "type": "action",
                    "imageUrl": "https://bucket.ex10.tech/images/9f2a63dc-d84e-11ee-97d4-0242ac12000b/originalContentUrl.png",
                    "action": {
                        "type": "clipboard",
                        "label": "สรุปผลการแข่งขัน",
                        "clipboardText": text
                    }
                }, {
                    "type": "action",
                    "imageUrl": "https://bucket.ex10.tech/images/8d325cbc-d31f-11ee-97d4-0242ac12000b/originalContentUrl.png",
                    "action": {
                        "type": "message",
                        "label": "เข้าร่วม",
                        "text": "เข้าร่วม"
                    }
                },
                {
                    "type": "action",
                    "imageUrl": "https://bucket.ex10.tech/images/c29daf78-d323-11ee-97d4-0242ac12000b/originalContentUrl.png",
                    "action": {
                        "type": "message",
                        "label": "กติกา",
                        "text": "กติกา"
                    }
                },
                {
                    "type": "action",
                    "imageUrl": "https://bucket.ex10.tech/images/bdbdcdd7-d381-11ee-97d4-0242ac12000b/originalContentUrl.png",
                    "action": {
                        "type": "message",
                        "label": "เริ่มเกม",
                        "text": "เริ่มเกม"
                    }
                },
                {
                    "type": "action",
                    "imageUrl": "https://bucket.ex10.tech/images/871f88ff-d3b0-11ee-97d4-0242ac12000b/originalContentUrl.png",
                    "action": {
                        "type": "message",
                        "label": "ล้างเกมของคุณ",
                        "text": "ล้างเกมของคุณ"
                    }
                }
            ]
        }
    }

};

exports.ruleMessage = () => {
    return {
        "type": "text",
        "text": "มาดูวิธีการเล่นกัน\n1. รอจนสมาชิกพร้อม หรือ ครบทุกคน\n2. พิมพ์ เริ่มเกม เพื่อเริ่มเกม โดยทุกคนต้องเลือก ค้อน กรรไกร หรือ กระดาษ\n3. ผู้สร้างเกม 1 คนต่อการ สร้างเกมได้ 1 ครั้ง\n4. หากต้องการสร้างเกมใหม่ต้องพิมพ์ จบเกม ก่อนเสมอ\n5. เงื่อนไขการเล่น หรือ บทลงโทษเป็นไปตามผู้สร้างเกมกำหนด ขอให้สนุกกับเป่ายิ้งฉุบ",
        "quickReply": quickReplyMember
    }

};

exports.textMessage = (text) => {
    return {
        type: "text",
        text: text
    }
}