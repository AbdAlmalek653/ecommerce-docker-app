const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a product price']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        lowercase: true,
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock count'],
        default: 10
    }
}, {
    timestamps: true // لإنشاء حقول createdAt و updatedAt تلقائياً
});

module.exports = mongoose.model('Product', productSchema);