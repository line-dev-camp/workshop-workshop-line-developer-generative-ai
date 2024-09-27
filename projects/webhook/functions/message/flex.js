exports.profile = (pictureUrl, name) => {
    return {
        "type": "flex",
        "altText": "Profile",
        "contents": {
            "type": "bubble",
            "size": "mega",
            "hero": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                    "type": "image",
                    "url": "https://mpics.mgronline.com/pics/Images/564000004884401.JPEG",
                    "aspectMode": "cover",
                    "align": "center",
                    "aspectRatio": "16:9"
                }],
                "height": "50px",
                "backgroundColor": "#138f2d"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "text",
                        "text": name,
                        "weight": "bold",
                        "size": "xl",
                        "align": "center",
                        "offsetBottom": "10px"
                    },
                    {
                        "type": "image",
                        "url": pictureUrl,
                        "align": "center",
                        "size": "100%",
                        "aspectMode": "cover",
                        "aspectRatio": "3:4"
                    },
                    {
                        "type": "text",
                        "text": "Software Developer",
                        "size": "md",
                        "color": "#aaaaaa",
                        "align": "center"
                    },
                    {
                        "type": "text",
                        "text": "Employee ID: 12345678",
                        "size": "sm",
                        "color": "#aaaaaa",
                        "align": "center",
                        "margin": "sm"
                    }
                ],
                "backgroundColor": "#f0f4f8"
            }
        }
    }
}

exports.service = () => {
    return {
        "type": "flex",
        "altText": "Service",
        "contents": {
            "type": "bubble",
            "size": "giga",
            "hero": {
                "type": "image",
                "url": "https://mpics.mgronline.com/pics/Images/564000004884401.JPEG",
                "aspectMode": "cover",
                "align": "center",
                "gravity": "center",
                "position": "relative",
                "aspectRatio": "16:9",
                "size": "100%"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "text",
                        "text": "Bank Services",
                        "weight": "bold",
                        "size": "xl",
                        "align": "center",
                        "margin": "md"
                    },
                    {
                        "type": "separator",
                        "margin": "lg"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "margin": "lg",
                        "contents": [{
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "button",
                                        "style": "primary",
                                        "action": {
                                            "type": "message",
                                            "label": "Check Balance",
                                            "text": "Check Balance"
                                        },
                                        "color": "#0084B6",
                                        "margin": "sm",
                                        "adjustMode": "shrink-to-fit"
                                    },
                                    {
                                        "type": "button",
                                        "style": "primary",
                                        "action": {
                                            "type": "message",
                                            "label": "Transfer Funds",
                                            "text": "Transfer Funds"
                                        },
                                        "color": "#28A745",
                                        "margin": "sm",
                                        "adjustMode": "shrink-to-fit"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "button",
                                        "style": "primary",
                                        "action": {
                                            "type": "message",
                                            "label": "Pay Bills",
                                            "text": "Pay Bills"
                                        },
                                        "color": "#FFC107",
                                        "margin": "sm",
                                        "adjustMode": "shrink-to-fit"
                                    },
                                    {
                                        "type": "button",
                                        "style": "primary",
                                        "action": {
                                            "type": "message",
                                            "label": "New Account",
                                            "text": "Open New Account"
                                        },
                                        "color": "#17A2B8",
                                        "margin": "sm",
                                        "adjustMode": "shrink-to-fit"
                                    }
                                ]
                            },
                            {
                                "type": "button",
                                "style": "primary",
                                "action": {
                                    "type": "message",
                                    "label": "Loan Services",
                                    "text": "Loan Services"
                                },
                                "color": "#DC3545",
                                "margin": "sm"
                            }
                        ]
                    }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "text",
                        "text": "Kasikorn Bank",
                        "weight": "bold",
                        "size": "md",
                        "align": "center",
                        "margin": "md"
                    },
                    {
                        "type": "text",
                        "text": "Bangkok Branch",
                        "size": "sm",
                        "color": "#aaaaaa",
                        "align": "center"
                    },
                    {
                        "type": "text",
                        "text": "Tel: +66 2 123 4567",
                        "size": "sm",
                        "color": "#aaaaaa",
                        "align": "center",
                        "margin": "md"
                    }
                ]
            }
        }
    }
}

exports.bill = () => {
    return {
        "type": "flex",
        "altText": "Service",
        "contents": {
            "type": "bubble",
            "size": "giga",
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "text",
                        "text": "Thai Delight Restaurant",
                        "weight": "bold",
                        "size": "xl"
                    },
                    {
                        "type": "text",
                        "text": "123 Bangkok St, Bangkok, Thailand",
                        "size": "sm",
                        "color": "#aaaaaa"
                    },
                    {
                        "type": "text",
                        "text": "Tel: +66 2 123 4567",
                        "size": "sm",
                        "color": "#aaaaaa"
                    }
                ]
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "text",
                        "text": "Food Bill",
                        "weight": "bold",
                        "size": "xl"
                    },
                    {
                        "type": "separator",
                        "margin": "md"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "lg",
                        "spacing": "sm",
                        "contents": [{
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "1. Fried Rice (2 plates)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$10.00",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "2. Pad Thai (1 plate)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$6.00",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "3. Tom Yum Soup (1 bowl)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$7.00",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "4. Green Curry (1 bowl)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$8.00",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "5. Spring Rolls (3 pcs)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$4.00",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "6. Papaya Salad (1 plate)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$5.50",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "7. Sticky Rice (1 bowl)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$3.00",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "8. Mango with Sticky Rice (1 plate)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$6.50",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "9. Thai Iced Tea (1 glass)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$3.50",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "10. Coconut Water (1 glass)",
                                        "size": "sm",
                                        "color": "#555555",
                                        "flex": 0
                                    },
                                    {
                                        "type": "text",
                                        "text": "$4.50",
                                        "size": "sm",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "lg"
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "margin": "lg",
                        "contents": [{
                                "type": "text",
                                "text": "Subtotal",
                                "size": "md",
                                "color": "#555555"
                            },
                            {
                                "type": "text",
                                "text": "$53.00",
                                "size": "md",
                                "color": "#111111",
                                "align": "end"
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "text",
                                "text": "Service Charge (10%)",
                                "size": "md",
                                "color": "#555555"
                            },
                            {
                                "type": "text",
                                "text": "$5.30",
                                "size": "md",
                                "color": "#111111",
                                "align": "end"
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "lg"
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "margin": "lg",
                        "contents": [{
                                "type": "text",
                                "text": "Total",
                                "size": "md",
                                "weight": "bold"
                            },
                            {
                                "type": "text",
                                "text": "$58.30",
                                "size": "md",
                                "color": "#111111",
                                "align": "end",
                                "weight": "bold"
                            }
                        ]
                    }
                ]
            }
        }
    }
}

exports.queue = () => {
    return {
        "type": "flex",
        "altText": "Service",
        "contents": {
            "type": "bubble",
            "size": "giga",
            "body": {
                "type": "box",
                "layout": "vertical",
                "background": {
                    "type": "linearGradient",
                    "angle": "45deg",
                    "startColor": "#02300e",
                    "centerColor": "#03691e",
                    "endColor": "#02db3c",
                    "centerPosition": "50%"
                },
                "contents": [{
                        "type": "text",
                        "text": "Queue Ticket",
                        "weight": "bold",
                        "size": "xl",
                        "align": "center",
                        "margin": "md",
                        "color": "#ffffff"
                    },
                    {
                        "type": "text",
                        "text": "ร้านหมีล่า",
                        "weight": "bold",
                        "size": "lg",
                        "align": "center",
                        "margin": "sm",
                        "color": "#ffffff"
                    },
                    {
                        "type": "text",
                        "text": "Queue Number",
                        "weight": "bold",
                        "size": "md",
                        "align": "center",
                        "margin": "lg",
                        "color": "#ffffff"
                    },
                    {
                        "type": "text",
                        "text": "A007",
                        "weight": "bold",
                        "align": "center",
                        "color": "#ffffff",
                        "margin": "md",
                        "size": "5xl"
                    },
                    {
                        "type": "separator",
                        "margin": "xl"
                    },
                    {
                        "type": "text",
                        "text": "Location: 123 Food Street, Bangkok",
                        "size": "sm",
                        "color": "#ffffff",
                        "align": "center",
                        "margin": "sm"
                    },
                    {
                        "type": "text",
                        "text": "Date: 2024-08-11",
                        "size": "sm",
                        "color": "#ffffff",
                        "align": "center",
                        "margin": "xs"
                    },
                    {
                        "type": "text",
                        "text": "Time: 18:30",
                        "size": "sm",
                        "color": "#ffffff",
                        "align": "center",
                        "margin": "xs"
                    }
                ],
                "spacing": "md",
                "paddingAll": "20px",
                "backgroundColor": "#ffffff",
                "justifyContent": "center"
            }
        }
    }
}

exports.booking = () => {
    return {
        "type": "flex",
        "altText": "booking",
        "contents": {
            "type": "carousel",
            "contents": [{
                    "type": "bubble",
                    "size": "kilo",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "image",
                                    "url": "https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6dfa24c23.jpg/1280x720/fit/80/6527703c22510107c74303e6f757a638.jpg",
                                    "size": "full",
                                    "align": "start",
                                    "aspectMode": "cover"
                                }],
                                "offsetTop": "none"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Deluxe Rooms",
                                    "weight": "bold",
                                    "color": "#000000"
                                }],
                                "offsetStart": "none",
                                "offsetTop": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [{
                                        "type": "icon",
                                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                                        "offsetTop": "sm",
                                        "offsetStart": "md",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.2",
                                        "size": "xs",
                                        "margin": "sm",
                                        "gravity": "top",
                                        "offsetStart": "md",
                                        "offsetTop": "sm",
                                        "color": "#ffffff"
                                    }
                                ],
                                "position": "absolute",
                                "offsetTop": "20px",
                                "backgroundColor": "#3E3E3Ecc",
                                "cornerRadius": "xl",
                                "width": "55px",
                                "height": "25px",
                                "offsetEnd": "20px"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Discription",
                                    "size": "sm",
                                    "weight": "bold",
                                    "color": "#000000"
                                }],
                                "offsetTop": "md"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Stylish and comfortable, with a nod to the Jet Age, these rooms make the most of natural light and city views.",
                                    "wrap": true,
                                    "size": "xxs"
                                }],
                                "offsetStart": "none",
                                "width": "230px",
                                "offsetTop": "md"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                        "type": "text",
                                        "text": "Facilties",
                                        "size": "sm",
                                        "weight": "bold",
                                        "color": "#000000"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": []
                                    }
                                ],
                                "offsetTop": "20px"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [{
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Wifi",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/93/93158.png",
                                                    "size": "16px",
                                                    "align": "start",
                                                    "offsetTop": "xs",
                                                    "offsetStart": "sm"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "width": "30px"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "King bed",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/952/952772.png",
                                                    "size": "20px",
                                                    "align": "start",
                                                    "offsetTop": "xs",
                                                    "offsetStart": "xl"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "width": "60px",
                                            "offsetStart": "md"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Sofa",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/333/333493.png",
                                                    "size": "24px",
                                                    "align": "start",
                                                    "offsetStart": "xs"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "offsetStart": "xl",
                                            "width": "50px"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Iron",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/114/114834.png",
                                                    "size": "28px",
                                                    "align": "start",
                                                    "offsetBottom": "sm"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "offsetStart": "xl"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": "+5",
                                                "offsetTop": "10px",
                                                "offsetStart": "10px",
                                                "color": "#ffffff"
                                            }],
                                            "backgroundColor": "#000000",
                                            "width": "40px",
                                            "height": "40px",
                                            "cornerRadius": "60px",
                                            "offsetTop": "xl"
                                        }
                                    ],
                                    "height": "60px"
                                }]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Total Price",
                                    "weight": "bold",
                                    "size": "sm",
                                    "color": "#000000"
                                }],
                                "offsetTop": "lg"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "120$ / night",
                                    "offsetTop": "md",
                                    "weight": "bold",
                                    "color": "#3F92D8"
                                }],
                                "height": "50px",
                                "offsetTop": "sm"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "Book Now",
                                    "uri": "http://linecorp.com/"
                                },
                                "style": "primary",
                                "color": "#3F92D8"
                            }
                        ],
                        "paddingAll": "0px",
                        "paddingBottom": "10px",
                        "paddingStart": "lg",
                        "paddingEnd": "lg",
                        "paddingTop": "lg"
                    }
                },
                {
                    "type": "bubble",
                    "size": "kilo",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "image",
                                    "url": "https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5cd9b6593b1c7.jpg/1280x720/fit/80/a52a45c417f4ec7ebf0b4f5a72af0433.jpg",
                                    "size": "full",
                                    "align": "start",
                                    "aspectMode": "cover"
                                }],
                                "offsetTop": "none"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "Deluxe Rooms",
                                        "weight": "bold",
                                        "color": "#000000"
                                    },
                                    {
                                        "type": "text",
                                        "text": "Only 1 room left!",
                                        "weight": "bold",
                                        "color": "#EC1C1C",
                                        "size": "xs",
                                        "gravity": "bottom"
                                    }
                                ],
                                "offsetStart": "none",
                                "offsetTop": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [{
                                        "type": "icon",
                                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                                        "offsetTop": "sm",
                                        "offsetStart": "md",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.5",
                                        "size": "xs",
                                        "margin": "sm",
                                        "gravity": "top",
                                        "offsetStart": "md",
                                        "offsetTop": "sm",
                                        "color": "#ffffff"
                                    }
                                ],
                                "position": "absolute",
                                "offsetTop": "20px",
                                "backgroundColor": "#3E3E3Ecc",
                                "cornerRadius": "xl",
                                "width": "55px",
                                "height": "25px",
                                "offsetEnd": "20px"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Discription",
                                    "size": "sm",
                                    "weight": "bold",
                                    "color": "#000000"
                                }],
                                "offsetTop": "md"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Take things up a notch in these rooms on our highest floors with stunning views of Kansas City.",
                                    "wrap": true,
                                    "size": "xxs"
                                }],
                                "offsetStart": "none",
                                "width": "230px",
                                "offsetTop": "md"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                        "type": "text",
                                        "text": "Facilties",
                                        "size": "sm",
                                        "weight": "bold",
                                        "color": "#000000"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": []
                                    }
                                ],
                                "offsetTop": "20px"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [{
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Wifi",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/93/93158.png",
                                                    "size": "16px",
                                                    "align": "start",
                                                    "offsetTop": "xs",
                                                    "offsetStart": "sm"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "width": "30px"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "King bed",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/952/952772.png",
                                                    "size": "20px",
                                                    "align": "start",
                                                    "offsetTop": "xs",
                                                    "offsetStart": "xl"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "width": "60px",
                                            "offsetStart": "md"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Sofa",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/333/333493.png",
                                                    "size": "24px",
                                                    "align": "start",
                                                    "offsetStart": "xs"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "offsetStart": "xl",
                                            "width": "50px"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Iron",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/114/114834.png",
                                                    "size": "28px",
                                                    "align": "start",
                                                    "offsetBottom": "sm"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "offsetStart": "xl"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": "+8",
                                                "offsetTop": "10px",
                                                "offsetStart": "10px",
                                                "color": "#ffffff"
                                            }],
                                            "backgroundColor": "#000000",
                                            "width": "40px",
                                            "height": "40px",
                                            "cornerRadius": "60px",
                                            "offsetTop": "xl"
                                        }
                                    ],
                                    "height": "60px"
                                }]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Total Price",
                                    "weight": "bold",
                                    "size": "sm",
                                    "color": "#000000"
                                }],
                                "offsetTop": "lg"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "150$ / night",
                                    "offsetTop": "md",
                                    "weight": "bold",
                                    "color": "#3F92D8"
                                }],
                                "height": "50px",
                                "offsetTop": "sm"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "Book Now",
                                    "uri": "http://linecorp.com/"
                                },
                                "style": "primary",
                                "color": "#3F92D8"
                            }
                        ],
                        "paddingAll": "0px",
                        "paddingBottom": "10px",
                        "paddingStart": "lg",
                        "paddingEnd": "lg",
                        "paddingTop": "lg"
                    }
                },
                {
                    "type": "bubble",
                    "size": "kilo",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "image",
                                    "url": "https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0f69621.jpg/1280x720/fit/80/67847187902c93b863d44388d57b88fe.jpg",
                                    "size": "full",
                                    "align": "start",
                                    "aspectMode": "cover"
                                }],
                                "offsetTop": "none"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Luxury Corner Rooms",
                                    "weight": "bold",
                                    "color": "#000000"
                                }],
                                "offsetStart": "none",
                                "offsetTop": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "contents": [{
                                        "type": "icon",
                                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                                        "offsetTop": "sm",
                                        "offsetStart": "md",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "4.9",
                                        "size": "xs",
                                        "margin": "sm",
                                        "gravity": "top",
                                        "offsetStart": "md",
                                        "offsetTop": "sm",
                                        "color": "#ffffff"
                                    }
                                ],
                                "position": "absolute",
                                "offsetTop": "20px",
                                "backgroundColor": "#3E3E3Ecc",
                                "cornerRadius": "xl",
                                "width": "55px",
                                "height": "25px",
                                "offsetEnd": "20px"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Discription",
                                    "size": "sm",
                                    "weight": "bold",
                                    "color": "#000000"
                                }],
                                "offsetTop": "md"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Our corner rooms feature a comfortable, contemporary KC-inspired design and give you double the views of Kansas City.",
                                    "wrap": true,
                                    "size": "xxs"
                                }],
                                "offsetStart": "none",
                                "width": "230px",
                                "offsetTop": "md"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                        "type": "text",
                                        "text": "Facilties",
                                        "size": "sm",
                                        "weight": "bold",
                                        "color": "#000000"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": []
                                    }
                                ],
                                "offsetTop": "20px"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [{
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Wifi",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/93/93158.png",
                                                    "size": "16px",
                                                    "align": "start",
                                                    "offsetTop": "xs",
                                                    "offsetStart": "sm"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "width": "30px"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "King bed",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/952/952772.png",
                                                    "size": "20px",
                                                    "align": "start",
                                                    "offsetTop": "xs",
                                                    "offsetStart": "xl"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "width": "60px",
                                            "offsetStart": "md"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Sofa",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/333/333493.png",
                                                    "size": "24px",
                                                    "align": "start",
                                                    "offsetStart": "xs"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "offsetStart": "xl",
                                            "width": "50px"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Iron",
                                                    "size": "xs"
                                                },
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/114/114834.png",
                                                    "size": "28px",
                                                    "align": "start",
                                                    "offsetBottom": "sm"
                                                }
                                            ],
                                            "offsetTop": "xxl",
                                            "offsetStart": "xl"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": "+12",
                                                "offsetTop": "10px",
                                                "offsetStart": "sm",
                                                "color": "#ffffff"
                                            }],
                                            "backgroundColor": "#000000",
                                            "width": "40px",
                                            "height": "40px",
                                            "cornerRadius": "60px",
                                            "offsetTop": "xl"
                                        }
                                    ],
                                    "height": "60px"
                                }]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "Total Price",
                                    "weight": "bold",
                                    "size": "sm",
                                    "color": "#000000"
                                }],
                                "offsetTop": "lg"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "text",
                                    "text": "180$ / night",
                                    "offsetTop": "md",
                                    "weight": "bold",
                                    "color": "#3F92D8"
                                }],
                                "height": "50px",
                                "offsetTop": "sm"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "Book Now",
                                    "uri": "http://linecorp.com/"
                                },
                                "style": "primary",
                                "color": "#3F92D8"
                            }
                        ],
                        "paddingAll": "0px",
                        "paddingBottom": "10px",
                        "paddingStart": "lg",
                        "paddingEnd": "lg",
                        "paddingTop": "lg"
                    }
                }
            ]
        }
    }
}

exports.report = () => {
    return {
        "type": "flex",
        "altText": "booking",
        "contents": {
            "type": "bubble",
            "size": "giga",
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "text",
                        "text": "Sales Report",
                        "weight": "bold",
                        "color": "#1DB446",
                        "size": "xl"
                    },
                    {
                        "type": "text",
                        "text": "January - June 2024",
                        "size": "sm",
                        "color": "#AAAAAA"
                    }
                ]
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "text",
                                "text": "Month",
                                "weight": "bold",
                                "color": "#555555",
                                "size": "sm"
                            },
                            {
                                "type": "text",
                                "text": "Sales",
                                "weight": "bold",
                                "color": "#555555",
                                "size": "sm",
                                "align": "end"
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "sm"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [{
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "January",
                                        "size": "md",
                                        "color": "#555555"
                                    },
                                    {
                                        "type": "text",
                                        "text": "฿10,000",
                                        "size": "md",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ],
                                "margin": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "February",
                                        "size": "md",
                                        "color": "#555555"
                                    },
                                    {
                                        "type": "text",
                                        "text": "฿8,500",
                                        "size": "md",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ],
                                "margin": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "March",
                                        "size": "md",
                                        "color": "#555555"
                                    },
                                    {
                                        "type": "text",
                                        "text": "฿12,000",
                                        "size": "md",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ],
                                "margin": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "April",
                                        "size": "md",
                                        "color": "#555555"
                                    },
                                    {
                                        "type": "text",
                                        "text": "฿9,000",
                                        "size": "md",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ],
                                "margin": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "May",
                                        "size": "md",
                                        "color": "#555555"
                                    },
                                    {
                                        "type": "text",
                                        "text": "฿7,500",
                                        "size": "md",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ],
                                "margin": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [{
                                        "type": "text",
                                        "text": "June",
                                        "size": "md",
                                        "color": "#555555"
                                    },
                                    {
                                        "type": "text",
                                        "text": "฿11,000",
                                        "size": "md",
                                        "color": "#111111",
                                        "align": "end"
                                    }
                                ],
                                "margin": "sm"
                            }
                        ]
                    }
                ]
            }
        }

    }
}

exports.vdo = () => {
    return {
        "type": "flex",
        "altText": "^^ vdo ^^",
        "contents": {
            "type": "bubble",
            "size": "giga",
            "hero": {
                "type": "video",
                "url": "https://workshop-ex10.s3.ap-southeast-1.amazonaws.com/vdo.mp4",
                "previewUrl": "https://workshop-ex10.s3.ap-southeast-1.amazonaws.com/preview.png",
                "aspectRatio": "1280:720",
                "altContent": {
                    "type": "image",
                    "size": "full",
                    "url": "https://workshop-ex10.s3.ap-southeast-1.amazonaws.com/preview.png"
                }
            }
        }
    }
}

exports.unixtime = (time) => {


    return {
        "type": "flex",
        "altText": "UnixTime",
        "contents": {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "md",
                "action": {
                    "type": "uri",
                    "uri": "https://line.me/"
                },
                "contents": [{
                    "type": "text",
                    "text": "Expire",
                    "size": "xl",
                    "weight": "bold"
                }]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                    "type": "button",
                    "style": "primary",
                    "color": "#905c44",
                    "margin": "xxl",
                    "action": {
                        "type": "postback",
                        "label": "action",
                        "data": time
                    }
                }]
            }
        }
    }

};

exports.chartBar = (chartUrl) => {
    return {
        "type": "flex",
        "altText": 'Chart Flex Message',
        "contents": {
            "type": "bubble",
            "size": "giga",
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "text",
                        "text": "Sales Report",
                        "weight": "bold",
                        "color": "#1DB446",
                        "size": "xl"
                    },
                    {
                        "type": "text",
                        "text": "August 2024",
                        "size": "sm",
                        "color": "#AAAAAA"
                    }
                ]
            },
            "hero": {
                "type": "image",
                "url": chartUrl,
                "size": "full",
                "margin": "none",
                "gravity": "center",
                "aspectMode": "fit"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "text",
                                "text": "Total Sales",
                                "size": "md",
                                "color": "#555555"
                            },
                            {
                                "type": "text",
                                "text": "฿50,000",
                                "size": "md",
                                "color": "#111111",
                                "align": "end"
                            }
                        ]
                    },
                    {
                        "type": "separator",
                        "margin": "md"
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "text",
                                "text": "Best Seller",
                                "size": "md",
                                "color": "#555555"
                            },
                            {
                                "type": "text",
                                "text": "Product A",
                                "size": "md",
                                "color": "#111111",
                                "align": "end"
                            }
                        ],
                        "margin": "md"
                    },
                    {
                        "type": "separator",
                        "margin": "md"
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "text",
                                "text": "Average Transaction Value",
                                "size": "md",
                                "color": "#555555"
                            },
                            {
                                "type": "text",
                                "text": "฿416.67",
                                "size": "md",
                                "color": "#111111",
                                "align": "end"
                            }
                        ],
                        "margin": "md"
                    }
                ]
            }
        }
    }

};


exports.foodBill = (order, uuid) => {
    return {
        type: "flex",
        altText: "Service",
        contents: {
            type: "bubble",
            size: "giga",
            header: {
                type: "box",
                layout: "vertical",
                contents: [{
                        type: "text",
                        text: "Thai Delight Restaurant",
                        weight: "bold",
                        size: "xl"
                    },
                    {
                        type: "text",
                        text: "123 Bangkok St, Bangkok, Thailand",
                        size: "sm",
                        color: "#aaaaaa"
                    },
                    {
                        type: "text",
                        text: "Tel: +66 2 123 4567",
                        size: "sm",
                        color: "#aaaaaa"
                    },
                    {
                        type: "text",
                        text: `Order Id : ${uuid}`,
                        size: "sm",
                        color: "#aaaaaa"
                    }
                ]
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: [{
                        type: "text",
                        text: "Food Bill",
                        weight: "bold",
                        size: "xl"
                    },
                    {
                        type: "separator",
                        margin: "md"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        margin: "lg",
                        spacing: "sm",
                        contents: order.items.map((item, index) => ({
                            type: "box",
                            layout: "horizontal",
                            contents: [{
                                    type: "text",
                                    text: `${index + 1}. ${item.name}`,
                                    size: "sm",
                                    color: "#555555",
                                    flex: 0
                                },
                                {
                                    type: "text",
                                    text: `${item.price} ฿`,
                                    size: "sm",
                                    color: "#111111",
                                    align: "end"
                                }
                            ]
                        }))
                    },
                    {
                        type: "separator",
                        margin: "lg"
                    },
                    {
                        type: "box",
                        layout: "horizontal",
                        margin: "lg",
                        contents: [{
                                type: "text",
                                text: "Total",
                                size: "md",
                                weight: "bold"
                            },
                            {
                                type: "text",
                                text: `${order.total} ฿`,
                                size: "md",
                                color: "#111111",
                                align: "end",
                                weight: "bold"
                            }
                        ]
                    },
                    {
                        type: "separator",
                        margin: "xl"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        contents: [{
                                type: "text",
                                text: "QR Payment",
                                align: "center"
                            },
                            {
                                type: "image",
                                url: "https://developers-resource.landpress.line.me/fx/img/linecorp_code_withborder.png"
                            }
                        ],
                        margin: "xl"
                    }
                ]
            }
        }
    }
}