const Product = require('../models/Product');

// 1. عرض جميع المنتجات أو تصفيتها حسب الفئة (Category)
exports.getProducts = async (req, res) => {
    try {
        let query = {};
        
        // إذا كان هناك طلب للتصنيف حسب الفئة في الـ Query
        if (req.query.category) {
            query.category = req.query.category.toLowerCase();
        }

        const products = await Product.find(query);
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. البحث عن المنتجات بالاسم أو الوصف
exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, message: "Please provide a search keyword" });
        }

        // استخدام التعبيرات المنتظمة (Regex) للبحث المرن غير الحساس لحالة الأحرف i
        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        });

        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. إضافة منتج جديد (لغرض تهيئة البيانات وتجربتها)
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};