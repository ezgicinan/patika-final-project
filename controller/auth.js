const { response } = require('express');
const authService = require('../service/auth')
const userService = require('../service/user')

const authController = {
    login: async(req, res) => {
        console.log("## authController #Login");
        try{
            const response = await authService.login(req.body);
            res.status(200).send({response:response})
        }catch(error){
            console.log('Error #auth/login: ', error);
            res.status(400).send({httpStatus:"BAD_REQUEST_LOGIN_OPERATION", error:error.message, response: response})

        }
    },
    register: async(req, res) => {
        try{
            console.log("##auth controller #Register");
            const response = await userService.createUser(req.body);
            res.status(200).send({response:response})           
        }catch(error){
            console.log('Error #auth/register: ', error);
            res.status(400).send({httpStatus:"BAD_REQUEST_REGISTER_OPERATION", error:error.message, response: response})   
        }
    },
}

module.exports = authController;