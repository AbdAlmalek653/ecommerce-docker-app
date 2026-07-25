const express = require('express');
const router = express.Router();
// استدعاء المتحكم الخاص بالمنتجات
const { getProducts, searchProducts, createProduct } = require('../controllers/productController');

// مسار البحث (يجب وضعه قبل مسارات المعرفات الثابتة لضمان عدم حدوث تضارب)
router.get('/search', searchProducts);

// مسار عرض المنتجات (مع دعم التصنيف) وإضافة منتج جديد
router.get('/', getProducts);
router.post('/', createProduct);

module.exports = router;