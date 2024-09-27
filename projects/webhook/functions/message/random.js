exports.welcomeMessage = () => {
    return {
        "type": "text",
        "text": "สวัสดี ทุกคน มาเริ่มแตกตี้กันเถอะ ... หากน้องเข้ามาที่หลัง รบกวนให้ทุกคนพิมพ์ ทักทาย เพื่อให้น้องรู้จักก่อนเพื่อนๆก่อนนะ ",
        "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://cloud.ex10.tech/public/filestore/Role-0ffccdc7-6e08-11ed-ad02-e6a905c1c90f.jpg",
                "action": {
                    "type": "message",
                    "label": "ตี้ฉัน",
                    "text": "ตี้ฉัน"
                }
            }]
        }
    }
}

exports.memberJoinedMessage = (displayName, countGroup) => {
    return {
        "type": "text",
        "text": "สวัสดี " + displayName + " มาเริ่มแตก...ตี้!  ตอนนี้กลุ่มของท่านมี " + countGroup + " คนแล้ว",
        "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://cloud.ex10.tech/public/filestore/Role-0ffccdc7-6e08-11ed-ad02-e6a905c1c90f.jpg",
                "action": {
                    "type": "message",
                    "label": "ตี้ฉัน",
                    "text": "ตี้ฉัน"
                }
            }]
        }
    }
}

exports.summaryGroup = (countGroup) => {
    return {
        "type": "text",
        "text": "ตอนนี้ ตี้ของคุณมี " + countGroup + " คน แบ่งกันให้ถูกนะ!",
        "quickReply": {
            "items": [{
                "type": "action",
                "imageUrl": "https://cloud.ex10.tech/public/filestore/Role-0ffccdc7-6e08-11ed-ad02-e6a905c1c90f.jpg",
                "action": {
                    "type": "message",
                    "label": "ตี้ฉัน",
                    "text": "ตี้ฉัน"
                }
            }]
        }
    }
}


exports.summaryGroupError = (countGroup, totalMember) => {
    return {
        type: "text",
        text: "จำนวนสมาชิกในโต๊ะไม่ถูกต้อง \ สมาชิกในโต๊ะปัจจุบัน : " + countGroup + "  แต่ผลรวมท่านได้ : " + totalMember + " \n\n กลับไปกรอกใหม่ให้ถูกต้อง!"
    }
}

exports.countTableError = (countGroup) => {
    return {
        type: "text",
        text: "โปรดระบุจำนวนโต๊ะ มากกว่า 2 โต๊ะให้เหมาะกับจำนวนคน  \n\n ปัจจุบันมีสมาชิก:" + countGroup + " คน"
    }
}

exports.namelist = (reportMessage) => {
    return {
        type: "text",
        text: reportMessage
    }
}