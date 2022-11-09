const ChatModel = require("../models/ChatModel")

exports.createChatController = async (req, res, next) => {
    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const chat = await newChat.save();
        res.status(200).json({
            status: "success!",
            message: "chat insert successful!",
            data: chat
        })
    } catch (error) {
        res.status(500).json({
            status: "fail!",
            message: "couldn't insert chat",
            error: error.message
        })
    }
}
exports.getUserByIdController = async (req, res, next) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] },
          });
        // const chat = await ChatModel.findById(req.params.userId);
        res.status(200).json({
            status: "success!",
            message: "chat find successful!",
            data: chat
        })
    } catch (error) {
        res.status(500).json({
            status: "fail!",
            message: "couldn't find the chat",
            error: error.message
        })
    }
}

exports.findChatController = async (req, res, next) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        })
        res.status(200).json({
            status: "success",
            message: "chat find successful!",
            data: chat
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "couldn't find the chat",
            error: error.message
        })
    }
}
