var express = require('express');
var router = express.Router();
var homepageController = require ('../controllers/HomeController')

require('dotenv').config();
router.get("/", homepageController.getHomePage);
router.get("/webhook", homepageController.getWebhook);
router.post("/webhook", homepageController.postWebhook);
router.post("/set-up-profile", homepageController.handleSetupProfile);
router.get("/set-up-profile", homepageController.getSetupProfilePage);

router.get("/info-order", homepageController.getInfoOrderPage);
router.post("/set-info-order", homepageController.setInfoOrder);


module.exports = router;
