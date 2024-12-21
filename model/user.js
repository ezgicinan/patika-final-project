const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    username : {
        type:String
    },
    email : {
        type:String
    },
    password : {
        type:String
    },
    createdAt : {
        type:Date,
        default:Date.now
    },   
});


// Add a toJSON transformation to hide the password field
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});


module.exports = mongoose.model('User', userSchema);