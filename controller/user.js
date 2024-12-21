const userService = require('../service/user')

const userController = {
    updateUser:async(req,res) => {
        try {
            const response = await userService.updateUser(req.body);
            console.log('Update user response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #userController/update: ', e);
            res.status(400).send({response:{httpStatus:"BAD_REQUEST_UPDATE_OPERATION", error:e.message}})
        }
    },
    deleteUser:async(req,res) => {
        try {
            const response = await userService.deleteUser(req.params);
            console.log('Delete user response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #userController/delete: ', e);
            res.status(400).send({response:{httpStatus:"BAD_REQUEST_DELETE_OPERATION", error:e.message}})   
        }
    },
    getUserById:async(req,res) => {
        try {
            const response = await userService.getUserById(req.params);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #userController/getUserById: ', e);
            res.status(400).send({response:{httpStatus:"BAD_REQUEST_GET_USER_OPERATION", error:e.message}})   
        }
    }
}

module.exports = userController;