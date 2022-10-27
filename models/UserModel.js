const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true, // for remove extra space
    },
    username: {
        type: String,
        required:true,
        trim:true,
        unique:[true,"username alrady in use"],
        message:"{VALUE}"
    },
    password: {
        type: String,
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive"]
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;