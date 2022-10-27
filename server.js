const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const app = require('./index')
const port = process.env.PORT || 4000


// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database connection is successfull`.blue.bold);
})


// server
app.listen(port, () => {
    console.log("server is running chill Bro 🤘🤘");
})