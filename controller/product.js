const productService = require('../service/product')
const kafka = require('../utils/kafka')

const productController = {
    updateProduct:async(req,res) => {
        try {
            const response = await productService.updateProduct(req.body);
            console.log('Update product response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #product/update: ', e);
            res.status(400).send({response:{httpStatus:"BAD_REQUEST_UPDATE_PRODUCT_OPERATION", error:e.message}})   
        }
    },
    deleteProduct:async(req,res) => {
            try {
                const response = await productService.deleteProduct(req.params);
                console.log('Delete product response: ', response);
                res.status(200).send({response:response})
            } catch (e) {
                console.log('Error #product/delete: ', e);
                res.status(400).send({response:{httpStatus:"BAD_REQUEST_DELETE_PRODUCT_OPERATION", error:e.message}})   
            }
    },
    getProduct:async(req,res) => {
        try {
            const response = await productService.getProduct(req.params);
            console.log('Get product response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #productController/getById: ', e);
            res.status(400).send({response:{httpStatus:"BAD_REQUEST_GET_PRODUCT_OPERATION", error:e.message}})
        }
    },
    getProducts:async(req,res) => {
        try {
            const response = await productService.getProducts(req.params);
            console.log('Get all products: $(response) ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #productController/getAll: ', e);
            res.status(400).send({response:{httpStatus:"BAD_REQUEST_GET_ALL_PRODUCTS_OPERATION", error:e.message}})
        }
    },
    createProduct:async(req,res) => {
        try {
            const response = await productService.createProduct(req.body);
            console.log('Create product response: ', response);
            res.status(200).send({response:response})
        } catch(e) {
            console.log('Error #productController/create: ', e);
            res.status(400).send({response:{httpStatus:"BAD_REQUEST_CREATE_PRODUCT_OPERATION", error:e.message}})
        }
    }

}
module.exports = productController