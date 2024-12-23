const express = require('express');
const userController  = require('../controller/user');
const authMiddleware = require('../middleware/auth')

const router = express.Router();

router.post('/korumali',authMiddleware,function test(req,res){
    console.log('middleware-test')
    res.status(200).send({message:'success'})
})

router.put('/', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/', authMiddleware, userController.getUsers);

router.post('/order',userController.createOrder);

module.exports = router;
