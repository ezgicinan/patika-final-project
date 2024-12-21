const userService = require('../service/user')

const userController = {
    updateUser:async(req,res) => {
        try {
            const response = await userService.updateUser(req.body);
            console.log('Update user response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #userController/update: ', e);
            res.status(400).send({httpStatus:"BAD_REQUEST_UPDATE_OPERATION", error:e.message, response: response})
        }
    },
    deleteUser:async(req,res) => {
        try {
            const response = await userService.deleteUser(req.params);
            console.log('Delete user response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #userController/delete: ', e);
            res.status(400).send({httpStatus:"BAD_REQUEST_DELETE_OPERATION", error:e.message, response: response})   
        }
    },
}

module.exports = userController;