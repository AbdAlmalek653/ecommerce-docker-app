const express = require('express');
const router = express.Router();
const { getCart, addToCart, checkout } = require('../controllers/cartController');

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/checkout', checkout); 

module.exports = router;