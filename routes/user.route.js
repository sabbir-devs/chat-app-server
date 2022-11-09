const express = require('express');
const userController = require('../controllers/user.controller');
const uploader = require('../middlewares/upload');
const router = express.Router();

// upload image using multer
router.post('/profile-picture', uploader.single("image"), userController.profilePictureUploadController)

// signup & login user route
router.route('/signup').post(userController.createUserController);
router.route('/login').post(userController.loginUserController)
router.route('/:id').get(userController.getUserByIdController)


module.exports = router;