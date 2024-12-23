const mongooseProduct = require('../model/product')

async function createProduct(productParams) {
    
    const {title, price, description, category, image} = productParams;
    try {
        const existingProduct = await mongooseProduct.findOne({ title });
        console.log("Existing Product: ", existingProduct)
        if (existingProduct) {
            console.log('#ProductCreate: Product already exists with this id');
            return { success: false, responseMessage: 'Product with this id already exists', responseObject: null };
        }

        const newProduct = new mongooseProduct({
            title,
            price,
            description,
            category,
            image
        });
        await newProduct.save();
        return { success: true, responseMessage: 'Product created successfully.', responseObject: newProduct };
    } catch (error) {
        console.log('Error #ProductCreate: ', error);
        return { success: false, responseMessage: 'Service #ProductCreate ERROR: ${error}', responseObject: null };
    }
}

async function getProducts() {
    try {
        const newProduct = await mongooseProduct.find();
        return { success: true, responseMessage:"All product get operation is successfull.", responseObject: newProduct };
    } catch (error) {
        console.log('Error #getProducts: ', error);
        return { success: false, responseMessage: 'Service #getProducts ERROR: ${error}', responseObject: null };
    }
}

async function getProduct(productParams) {
    const {id} = productParams;
    try {
        const newProduct = await mongooseProduct.findById(id);
        return { success: true, responseMessage:"Get product is successfull", responseObject: newProduct };
    } catch (error) {
        console.log('Error #getProduct: ', error);
        return { success: false, responseMessage: 'Service #getProduct ERROR: ${error}', responseObject: null };
    }
}

async function deleteProduct(productParams){
    const id = productParams.id;
    try{
        const productDeleted = await mongooseProduct.findByIdAndDelete(id);
        return { success: true, responseMessage: 'Product deleted successfully.', responseObject: productDeleted };
    }catch(e){
        console.log(e);
        return { success: false, responseMessage: 'Delete operation unsuccessfull' + e, responseObject: null };
    }
}

async function updateProduct(productParams){
    const id = productParams.id;
    const title = productParams.title;
    const price = productParams.price;
    const description = productParams.description;
    const category = productParams.category;
    const image = productParams.image;;

    try{
        const product = await mongooseProduct.findById(id);
        if (!product) {
            console.error(`Product with ID ${id} not found.`);
            return { success: false, responseMessage:'Product with given ID not found.', responseObject: null};
        }
        product.title = title;
        product.price = price;
        product.description = description; 
        product.category = category;
        product.image = image;
    
        const updatedProduct = await product.save();
        console.log('SERVICE/UPDATE:', updatedProduct);
        return { success: true, responseMessage: 'Product updated successfully.', responseObject: updatedProduct };
    }catch(e){
        console.log('UPDATE PRODUCT ERROR:', e);
        return { success: false, responseMessage: 'Product with given ID not found.', responseObject: null };
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}