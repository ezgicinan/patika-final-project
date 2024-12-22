const mongoose = require('mongoose');

//Schema
// Define the schema for products
const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number,
        min: 0 // Ensures price is non-negative
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Product', productSchema);