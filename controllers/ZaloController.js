const request = require('request');
require("dotenv").config();
var zaloServices = require ("../services/zaloverify");
const session = require('express-session');
const querystring = require('querystring');
const MY_VERIFY_TOKEN = process.env.ZALO_TOKEN;


let handleMessage = async () => {
     let response = {
        "text": `Hello World!`
      }
    // Sends the response message
    callSendAPI( response);  
};

function callSendAPI(response , req,res) {
    // Construct the message body
  
    let request_body = {
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://openapi.zalo.me/v2.0/oa/message",
      "qs": { "access_token": req.session.access_token},
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
        "app_id" : process.env.APPID,
        "grant_type" : "authorization_code",
        "code_verifier": process.env.CODE_VERIFIER
      }
      let formBody = querystring.stringify(request_body);
      request({
        "uri": "https://oauth.zaloapp.com/v4/oa/access_token",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded" ,
            "secret_key": process.env.SECRETKEY
          },
        "body": formBody
      }, (err, req,res, body) => {
          const access_token = req.body.access_token;
          const refresh_token = req.body.refresh_token;
          accessTokenByRef(refresh_token);
          console.log(refresh_token);
          console.log(access_token);

        if (!err) {
           return console.log('TOKEN SUCCESS')
     
        } else {
          console.error("ERROR | " + err);
        }
      }); 
  }

  let accessTokenByRef = (refresh_token) => {
        let request_body = {
            "refresh_token" : refresh_token, 
            "app_id" : process.env.APPID,
            "grant_type" : "refresh_token",
          }
          let formBody = querystring.stringify(request_body);
          request({
            "uri": "https://oauth.zaloapp.com/v4/oa/access_token",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded" ,
                "secret_key": process.env.SECRETKEY
              },
            "body": formBody
          }, (err, req, res, body) => {
       
              console.log("body : " ,body)
             
            if (!err) {
                
         
            } else {
              console.error("ERROR | " + err);
            }
          }); 
  }

module.exports = {
 handleMessage : handleMessage,
 getCallBack : getCallBack,
 accessTokenByRef : accessTokenByRef
};