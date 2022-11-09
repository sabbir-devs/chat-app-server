const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUserController = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        };
        const user = await User.create(newUser);
        res.status(200).json({
            status: "success",
            message: "user creat successful!",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't create user",
            error: error.message
        })
    }
}
exports.loginUserController = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.find({ username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.JWT_TOKEN_secret, {
                    expiresIn: "1m"
                });
                res.status(200).json({
                    status: "success",
                    message: "login successful",
                    data: user,
                    access_token: token
                })
            } else {
                res.status(401).json({
                    status: "fail",
                    data: [],
                    message: "wrong password",
                })
            }
        } else {
            res.status(401).json({
                status: "fail",
                message: "user not found!",
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "user login failed!",
            error: error.message
        })
    }
}
exports.getUserByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'no user exist in database with this ID',
                data: []
            })
        }
        res.status(200).json({
            status: "success!",
            message: "user find successful!",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "fail!",
            message: "couldn't find the user",
            error: error.message
        })
    }
}

// upload profile picture
exports.profilePictureUploadController = (req, res) => {
    try {
        res.status(200).json({
            status:'success',
            message:"image upload successful",
            data: req.file
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:"couldn't upload the picture",
            error: error.message
        })
    }
}