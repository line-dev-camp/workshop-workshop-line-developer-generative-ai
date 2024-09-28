exports.profileView = (publicUrl, displayName, point) => {
  return {
    "type": "flex",
    "altText": "My Profile",
    "contents": {
      "type": "bubble",
      "size": "mega",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "image",
            "url": "https://bucket.ex10.tech/images/1bbc97d2-78e2-11ef-ab4d-0242ac12000e/originalContentUrl.jpg",
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "1:1",
            "gravity": "center"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "box",
              "layout": "vertical",
              "contents": [{
                "type": "image",
                "url": publicUrl,
                "size": "80%",
                "aspectRatio": "1:1",
                "align": "center"
              }]
            }],
            "position": "absolute",
            "background": {
              "type": "linearGradient",
              "angle": "0deg",
              "endColor": "#00000000",
              "startColor": "#00000099"
            },
            "width": "100%",
            "height": "100%",
            "justifyContent": "center"
          }
        ],
        "paddingAll": "0px"
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "image",
            "url": "https://bucket.ex10.tech/images/c5cedb7e-78e5-11ef-ab4d-0242ac12000e/originalContentUrl.png",
            "size": "full",
            "aspectMode": "cover",
            "gravity": "center",
            "aspectRatio": "16:9"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [{
                "type": "text",
                "text": displayName,
                "weight": "bold",
                "align": "center",
                "scaling": true,
                "offsetTop": "20px"
              },
              {
                "type": "text",
                "text": point,
                "weight": "bold",
                "align": "center",
                "scaling": true,
                "offsetTop": "20px",
                "offsetEnd": "20px"
              }
            ],
            "justifyContent": "center",
            "position": "absolute",
            "width": "100%",
            "height": "30%"
          }
        ],
        "backgroundColor": "#905C44",
        "paddingAll": "0px"
      },
      "action": {
        "type": "uri",
        "label": "action",
        "uri": process.env.LINE_LIFF_PROFILE_URL,
        "altUri": {
          "desktop": process.env.LINE_LIFF_PROFILE_URL
        }
      }
    }
  }
}
exports.profile = (publicUrl, displayName, point) => {
  return {
    "type": "bubble",
    "size": "mega",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [{
          "type": "image",
          "url": "https://bucket.ex10.tech/images/1bbc97d2-78e2-11ef-ab4d-0242ac12000e/originalContentUrl.jpg",
          "size": "full",
          "aspectMode": "cover",
          "aspectRatio": "1:1",
          "gravity": "center"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [{
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "image",
              "url": publicUrl,
              "size": "80%",
              "aspectRatio": "1:1",
              "align": "center"
            }]
          }],
          "position": "absolute",
          "background": {
            "type": "linearGradient",
            "angle": "0deg",
            "endColor": "#00000000",
            "startColor": "#00000099"
          },
          "width": "100%",
          "height": "100%",
          "justifyContent": "center"
        }
      ],
      "paddingAll": "0px"
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [{
          "type": "image",
          "url": "https://bucket.ex10.tech/images/c5cedb7e-78e5-11ef-ab4d-0242ac12000e/originalContentUrl.png",
          "size": "full",
          "aspectMode": "cover",
          "gravity": "center",
          "aspectRatio": "16:9"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [{
              "type": "text",
              "text": displayName,
              "weight": "bold",
              "align": "center",
              "scaling": true,
              "offsetTop": "20px"
            },
            {
              "type": "text",
              "text": point,
              "weight": "bold",
              "align": "center",
              "scaling": true,
              "offsetTop": "20px",
              "offsetEnd": "20px"
            }
          ],
          "justifyContent": "center",
          "position": "absolute",
          "width": "100%",
          "height": "30%"
        }
      ],
      "backgroundColor": "#905C44",
      "paddingAll": "0px"
    }
  }
}
exports.team = (flexData) => {
  return {
    "type": "flex",
    "altText": "My Group",
    "contents": {
      "type": "carousel",
      "contents": flexData
    }
  }
}