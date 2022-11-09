const express = require('express');
const messageController = require('../controllers/message.controller');
const router = express.Router();

router.route("/").post(messageController.addMessageController)
router.route("/:chatId").get(messageController.getMessageByIdController)
router.route("/specific/:senderId/:reciverId").get(messageController.findSpecificChatController)

module.exports = router;