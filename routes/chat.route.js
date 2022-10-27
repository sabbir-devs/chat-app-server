const express = require('express');
const chatController = require('../controllers/chat.controller');
const router = express.Router();

router.route("/")
    .post(chatController.createChatController)

router.route("/:userId")
    .get(chatController.getUserByIdController)

router.route("/find/:firstId/:secondId")
    .get(chatController.findChatController)


module.exports = router;