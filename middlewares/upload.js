const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "images/profile/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
});

const uploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const suportedImage = /png|jpg|jpeg/;
        const extexsion = path.extname(file.originalname);

        if (suportedImage.test(extexsion)) {
            cb(null, true)
        } else {
            cb(new Error("Must be a png/jpg/jpeg image"))
        }
    },
    limits:{
        fileSize:10000000
    }
})

module.exports = uploader;