const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');

// middloeware
app.use(express.json());
app.use(cors())

// router
const chatRoute = require("./routes/chat.route");
const userRoute = require("./routes/user.route");
const messageRouter = require("./routes/message.route");


// get messege send message api
app.use("/chat", chatRoute);
app.use("/user", userRoute);
app.use("/message",messageRouter);



app.get('/', (req, res) => {
    res.send("server is running so chill Bro 🤘🤘")
})
app.all("*", (req, res) => {
    res.send("Route Not Found")
})


module.exports = app;