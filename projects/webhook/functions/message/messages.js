exports.welcomeMessage = (profile) => {
    return {
        "type": "text",
        "text": `ยินดีต้อนรับคุณ ${profile.displayName}`,
        "sender": {
            "name": "BOT",
            "iconUrl": "https://cdn-icons-png.flaticon.com/512/10176/10176915.png "
        },
        "quickReply": {
            "items": [{
                    "type": "action",
                    "action": {
                        "type": "message",
                        "label": "Yes",
                        "text": "Yes"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "uri",
                        "label": "Phone order",
                        "uri": "tel:09001234567"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "datetimepicker",
                        "label": "Select date",
                        "data": "storeId=12345",
                        "mode": "date",
                        "initial": "2024-08-25",
                        "min": "2024-08-01",
                        "max": "2024-12-31"
                      }
                      
                },
                {
                    "type": "action",
                    "action": {
                        "type": "clipboard",
                        "label": "Copy",
                        "clipboardText": "3B48740B"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "cameraRoll",
                        "label": "Send photo"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "camera",
                        "label": "Open camera"
                    }
                }
            ]
        }
    }
}
exports.welcomeBack = (profile) => {
    return {
        "type": "text",
        "text": `อ้าววคุณ ${profile.displayName} สบายดีไหมครับ`,
        "sender": {
            "name": "BOT",
            "iconUrl": "https://cdn-icons-png.flaticon.com/512/10176/10176915.png "
        },
        "quickReply": {
            "items": [{
                    "type": "action",
                    "action": {
                        "type": "message",
                        "label": "Yes",
                        "text": "Yes"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "uri",
                        "label": "Phone order",
                        "uri": "tel:09001234567"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "clipboard",
                        "label": "Copy",
                        "clipboardText": "3B48740B"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "datetimepicker",
                        "label": "Select date",
                        "data": "storeId=12345",
                        "mode": "date",
                        "initial": "2024-08-25",
                        "min": "2024-08-01",
                        "max": "2024-12-31"
                      }
                      
                },
                {
                    "type": "action",
                    "action": {
                        "type": "cameraRoll",
                        "label": "Send photo"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "camera",
                        "label": "Open camera"
                    }
                }
            ]
        }
    }
}
exports.postbackDate = (date) => {
    return {
        "type": "text",
        "text": `กรอกข้อมูลเพิ่มเติม โดยต้องกรอกข้อมูลตัวอย่างนี้ \nBooking Date:${date} \nName: Thepnatee Phojan \nPhone: 0909090999 \n`,
        "sender": {
            "name": "BOT",
            "iconUrl": "https://cdn-icons-png.flaticon.com/512/10176/10176915.png "
        },
        "quickReply": {
            "items": [
                {
                    "type": "action",
                    "action": {
                        "type": "postback",
                        "label": "ลงทะเบียน",
                        "data": `{"date"=${date},"type"="register"}`,
                        "displayText": "ลงทะเบียน",
                        "inputOption": "openKeyboard",
                        "fillInText": `กรอกข้อมูลเพิ่มเติม โดยต้องกรอกข้อมูล\n---\nBooking Date:${date} \nName: \nPhone: \n---`
                      }
                }
            ]
        }
    }
}