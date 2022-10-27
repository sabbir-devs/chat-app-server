const Message = require("../models/MessageModel")

exports.addMessageController = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = ({
        chatId,
        senderId,
        text
    });
    try {
        const result = await Message.create(message)
        res.status(200).json({
            status: "fail!",
            message: "message insert successful",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail!",
            message: "couldn't insert the message",
            error: error.message
        })
    }
}
exports.getMessageByIdController = async (req, res) => {
    const { chatId } = req.params;
    try {
        const message = await Message.find({$_id:chatId});
        if (!message) {
            return res.status(404).json({
                status: "fail!",
                message: "couldn't find the chat with this id"
            })
        }
        res.status(200).json({
            status: "successs!",
            message: "message found successful",
            data: message
        })
    } catch (error) {
        res.status(400).json({
            status: "fail!",
            message: "couldn't found the message",
            error: error.message
        })
    }
}