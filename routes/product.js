const express = require('express');
const productController = require('../controller/product');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/korumali', authMiddleware, function test(req, res) {
    console.log('middleware-test')
    res.status(200).send({ message: 'success' })
})

router.delete('/:id', authMiddleware, productController.deleteProduct);
router.put('/', authMiddleware, productController.updateProduct);
router.get('/:id', authMiddleware, productController.getProduct);
router.get('/', authMiddleware, productController.getProducts);
router.post('/', authMiddleware, productController.createProduct);

module.exports = router;