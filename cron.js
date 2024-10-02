const cron = require("cron");
const https = require("https");

const url = "https://chatbot-seii.onrender.com"
const job = new cron.CronJob('*/14 * * * *', function() {
    console.log(" Restarting Server");

    https.get(url , (res) => {
        if(res.statusCode === 200) {
            console.log("Ping Succeed")
        }
        else {
            console.error(`Ping error : ${res.statusCode}`);
        }
    })
    .on('error' , (err) => {
        console.error('Error during Restart :' , err.message);
    });
});
module.exports = {
    job: job 
}