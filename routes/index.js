var express = require('express');
var router = express.Router();
var HomeController = require ('../controllers/HomeController')

require('dotenv').config();
router.get("/webhook", HomeController.getWebhook);
router.post("/webhook", HomeController.postWebhook);





module.exports = router;
