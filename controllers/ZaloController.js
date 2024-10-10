const request = require('request');
require("dotenv").config();

const MY_VERIFY_TOKEN = process.env.ZALO_TOKEN;

let handleMessage = async (sender_psid, received_message) => {
     let response = {
        "text": `You sent the message: Now send me an image!`
      }
    // Sends the response message
    callSendAPI(sender_psid, response);  
};

function callSendAPI(sender_psid, response) {
    // Construct the message body
  
    let request_body = {
      
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://openapi.zalo.me/v2.0/oa/message",
      "qs": { "access_token": process.env.ZALO_TOKEN},
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
   
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }


module.exports = {
 handleMessage : handleMessage
};