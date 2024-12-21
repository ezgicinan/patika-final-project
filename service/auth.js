const bcrypt = require('bcryptjs');
const mongooseUser = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function login(userParams) {
    const {email, password } = userParams;
    try {
        if(!email || !password){
            return {success: false, responseMessage:"Email and password required", responseObject: null};
        }

        const user = await mongooseUser.findOne({ email });
        console.log("User: ", user.id);

        if(!user || !(await bcrypt.compare(password, user.password))){
            console.log('Invalid email or password');
            return {success: false, responseMessage:'Invalid email or password', responseObject: null};
        }

        const token = jwt.sign({email:user.email}, process.env.JWT_SECRET, {
            expiresIn: '2h'
        })
        
        return {success: true, responseMessage:'Login successful', responseObject:{user:user.toJSON(), token:token}};

    } catch (error) {
        console.log('Error #service #login: ', error);
        message = "Error #login: " + error.message
        return {success: false, responseMessage:message, responseObject: null};
    }
}

module.exports = {
    login
}