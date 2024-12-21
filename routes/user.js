const express = require('express');
const userController  = require('../controller/user');

const router = express.Router();

router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUserById);

module.exports = router;
