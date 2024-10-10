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
    const authorizationToken = req.params.AUTHORIZATION_CODE;
    const oaid = req.params.OA_ID;
    let authtoken2query = req.query['AUTHORIZATION_CODE'];
    let queryOAID = req.query['OA_ID'];
    return res.status(200).json({ authorizationToken, oaid , authtoken2query,queryOAID}) 
    }
   catch(error)
   {
    return res.status(404).json(error)
   }
    
};


module.exports = {
 handleMessage : handleMessage,
 getCallBack : getCallBack
};