let sendZALOOATemplate = () =>{
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "EMPTY ARENA BILLIARDS CUSTOMER SERVICES ",
                        "image_url": "https://res.cloudinary.com/ddx8hv83x/image/upload/v1728461643/338859574_3427471284142607_6439415094304391260_n_1_gl2cu1.png",
                        "subtitle": "| CẮT CAM |",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://chatbot.zalo.me/ref/2127175614726328357?id=cat_cam",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://chatbot.zalo.me/ref/2127175614726328357?id=cat_cam",
                                "title": "Kết Nối ZALO OA  "
                            },
                            {
                                "type": "postback",
                                "title": "Quay Lại Menu",
                                "payload": "SEND_QUICKREPLY"
                            }
                        ]
                    },
               
                ]
            }
        }
    };
};



let sendCTKMTemplate = () =>{
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "CTKM Tháng 10 Của EMPTY ARENA BILLIARDS ",
                        "image_url": "https://res.cloudinary.com/dwsqbwhnq/image/upload/v1728917595/CTKM_THANG_10_e8gscm.jpg",
                        "subtitle": "  ▪️ 𝐓𝐡𝐚́𝐧𝐠 𝟏𝟎 𝐁𝐮̀𝐧𝐠 𝐍𝐨̂̉ 𝐯𝐨̛́𝐢 𝐂𝐓𝐊𝐌 - 𝐆𝐢𝐚́ 𝐂𝐡𝐢̉ 𝐓𝐮̛̀ 𝟑𝟓𝐤/𝐡▪️",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02kepfTJbv1kCZ44LdQqW3emRKuVRke28ZktibbYWbsgKU86qay3Zs6KD7JU8pZjkXl&id=61561715665445",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quay Lại Menu",
                                "payload": "SEND_QUICKREPLY"
                            }
                        ]
                    },
               
                ]
            }
        }
    };
};

let sendLookupOrderTemplate = () =>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Khách iu chọn nút đặt bàn và điền thông tin ",
                "buttons":[
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                        "title": "ĐẶT BÀN",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false: open the webview in new tab
                    },
                    {
                        "type": "postback",
                        "title": "Quay lại Menu",
                        "payload": "SEND_QUICKREPLY"
                    }
                ]
            }
        }
    };
};



let backToMainMenuTemplate = ()=>{
    return {
        "text": "What can I do to help you today?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Categories",
                "payload": "CATEGORIES",
            },
            {
                "content_type": "text",
                "title": "Lookup Order",
                "payload": "LOOKUP_ORDER",
            },
            {
                "content_type": "text",
                "title": "Talk to an agent",
                "payload": "TALK_AGENT",
            },
        ]
    };
};

let setDatbanTemplate = ()=>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"We're checking your order. We will send you a message when the process is complete." +
                    "\nThank you!",
                "buttons":[
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};

module.exports = {
    sendZALOOATemplate: sendZALOOATemplate,
   
    sendLookupOrderTemplate: sendLookupOrderTemplate,
    backToMainMenuTemplate: backToMainMenuTemplate,
    setDatbanTemplate: setDatbanTemplate,
    sendCTKMTemplate : sendCTKMTemplate
};
