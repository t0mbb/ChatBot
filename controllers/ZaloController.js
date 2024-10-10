const request = require('request');
require("dotenv").config();
var zaloServices = require ("../services/zaloverify");
const MY_VERIFY_TOKEN = process.env.ZALO_TOKEN;


let handleMessage = async () => {
     let response = {
        "text": `Hello World!`
      }
    // Sends the response message
    callSendAPI( response);  
};

function callSendAPI(response) {
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
        console.log(body);
      if (!err) {
         return console.log('message sent!')
   
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }


  let getCallBack = async (req, res) => {
    try {
    await zaloServices.Zaloverify()
    let authtoken = req.query['code'];
    let queryOAID = req.query['oa_id'];
    let result = await postAccessToken(authtoken);
    return res.status(200).json({ authtoken,queryOAID , result}) 
    }
   catch(error)
   {
    return res.status(404).json(error)
   }
    
};
  let postAccessToken = ( authCode ) => {
    let request_body = {
        "code" : authCode, 
        "app_id" : `${process.env.APPID}`,
        "grant_type" : "authorization_code",
        "code_verifier": process.env.CODE_VERIFIER
      }
    
      // Send the HTTP request to the Messenger Platform
      request({
        "uri": "https://oauth.zaloapp.com/v4/oa/access_token",
        "qs": { "secret_key": process.env.SECRETKEY},
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
          console.log(body);
        if (!err) {
           return console.log('TOKEN SUCCESS')
     
        } else {
          console.error("ERROR | " + err);
        }
      }); 
  }

module.exports = {
 handleMessage : handleMessage,
 getCallBack : getCallBack
};