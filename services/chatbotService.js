require("dotenv").config();
var request = require ("request") ;
var homepageService = require ("./homepageService")
var templateMessage = require("./templateMessage")

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const SECONDARY_RECEIVER_ID = process.env.SECONDARY_RECEIVER_ID;
const PRIMARY_RECEIVER_ID = process.env.FACEBOOK_APP_ID;

let sendMessageWelcomeNewUser = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await homepageService.getFacebookUsername(sender_psid);
            //send text message
            let response1 = {
                "text": `Empty Arena Billiards Hà Nội rất hân hạnh được phục vụ quý khách ${username} !`
            };

            //send an image
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://res.cloudinary.com/ddx8hv83x/image/upload/v1728461643/338859574_3427471284142607_6439415094304391260_n_1_gl2cu1.png"
                    }
                }
            };


            //send a quick reply
            let response3 = {
                "text": "Vui lòng chọn theo MENU để Empty phục vụ khách iu ạ",
                "quick_replies": [
                    {"content_type": "text",
                        "title": "CATEGORIES",
                        "payload": "CATEGORIES",},
                    ,         {
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
                    {
                        "content_type": "text",
                        "title": "Đặt Bàn",
                        "payload": "DATBAN",
                    },
                    {
                        "content_type": "text",
                        "title": "Thông Tin Giải",
                        "payload": "TOURNAMENTS",
                    },
                    {
                        "content_type": "text",
                        "title": "CẮT CAM | ZALO OA ",
                        "payload": "ZALOOA",
                    },
                ]
            };

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessage = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            await homepageService.markMessageRead(sender_psid);
            await homepageService.sendTypingOn(sender_psid);
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let requestTalkToAgent = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //send a text message
            let response1 = {
                "text": "Ok. Someone real will be with you in a few minutes ^^"
            };

            await sendMessage(sender_psid, response1);

            //change this conversation to page inbox
            let app = "page_inbox"
            await passThreadControl(sender_psid, app);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let passThreadControl = (sender_psid, app) => {
    return new Promise((resolve, reject) => {
        try {
            let target_app_id = "";
            let metadata = "";

            if(app === "page_inbox"){
                target_app_id = SECONDARY_RECEIVER_ID;
                metadata = "Pass thread control to inbox chat";
            }
            if(app === "primary"){
                target_app_id = PRIMARY_RECEIVER_ID;
                metadata = "Pass thread control to the bot, primary app";
            }
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "target_app_id": target_app_id,
                "metadata": metadata
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/pass_thread_control",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(body)
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendCategories = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //send a generic template message
            let response = templateMessage.sendCategoriesTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendLookupOrder = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.sendLookupOrderTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let showHeadphones = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.sendHeadphonesTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

let showTVs = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

let showPlaystation = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

let backToCategories = (sender_psid) => {
    sendCategories(sender_psid)
};

let backToMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.backToMainMenuTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let takeControlConversation = (sender_psid) =>{
    return new Promise((resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "metadata": "Pass this conversation from page inbox to the bot - primary app"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/take_thread_control",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, async (err, res, body) => {
                if (!err) {
                    //send messages
                    await sendMessage(sender_psid, {"text": "The super bot came back !!!"});
                    await backToMainMenu(sender_psid);
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    sendMessage: sendMessage,
    sendMessageWelcomeNewUser: sendMessageWelcomeNewUser,
    sendCategories: sendCategories,
    sendLookupOrder: sendLookupOrder,
    requestTalkToAgent: requestTalkToAgent,
    showHeadphones: showHeadphones,
    showTVs: showTVs,
    showPlaystation: showPlaystation,
    backToCategories: backToCategories,
    backToMainMenu: backToMainMenu,
    passThreadControl: passThreadControl,
    takeControlConversation: takeControlConversation
};
