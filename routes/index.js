var express = require('express');
var router = express.Router();
var homepageController = require ('../controllers/HomeController')
var zaloController = require('../controllers/ZaloController')

require('dotenv').config();
router.get("/", homepageController.getHomePage);
router.get("/webhook", homepageController.getWebhook);
router.post("/webhook", homepageController.postWebhook);
router.post("/set-up-profile", homepageController.handleSetupProfile);
router.get("/set-up-profile", homepageController.getSetupProfilePage);
router.get("/zalo_verifierVOIK98U59YDtihmNd88L05kDhJQt-trjCZam.html" , homepageController.verify)
router.get("/info-order/:id", homepageController.getInfoOrderPage);
router.post("/set-info-order", homepageController.setInfoOrder);

router.post('/webhookZalo',homepageController.postwebhookZalo)
router.post('/zalo/sendMessage',zaloController.handleMessage)
router.get('/zalo/CallBack',zaloController.getCallBack)
router.get('/zalo/Auth',zaloController.accessTokenByRef)
module.exports = router;

