const mongoose = require('mongoose')
require('dotenv').config();

async function connectionDB() {
    try {
        console.log("before mongoose");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Bağlandık.");
    } catch (e) {
        console.log('Error #db-mongo:', e);
    }
}

module.exports = {connectionDB}