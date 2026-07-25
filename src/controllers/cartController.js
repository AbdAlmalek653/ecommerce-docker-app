const Cart = require('../models/Cart');
const Product = require('../models/Product');

// دالة مساعدة لحساب السعر الإجمالي للسلة
const calculateTotal = async (cart) => {
    let total = 0;
    for (let item of cart.items) {
        const product = await Product.findById(item.product);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    cart.totalPrice = total;
};

// 1. عرض محتويات السلة
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne().populate('items.product');
        if (!cart) {
            cart = await Cart.create({ items: [], totalPrice: 0 });
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. إضافة منتج إلى السلة أو تحديث كميته
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // التحقق من وجود المنتج والكمية في المخزن
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ success: false, message: 'Not enough stock available' });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        // التحقق إذا كان المنتج موجود مسبقاً في السلة
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await calculateTotal(cart);
        await cart.save();
        
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. إتمام الطلب (Checkout) وتصفير السلة وتحديث المخزن
exports.checkout = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // تحديث كميات المنتجات في المخزن وسحبها
        for (let item of cart.items) {
            const product = await Product.findById(item.product._id);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        // تفريغ السلة بعد نجاح العملية
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ success: true, message: 'Order placed successfully! Cart has been cleared.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};