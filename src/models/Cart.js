const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // ربط مباشر مع موديل المنتجات
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.'],
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    // في هذا المشروع، سنفترض وجود سلة واحدة مؤقتاً لتسهيل الفكرة قبل ربط الحسابات
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);