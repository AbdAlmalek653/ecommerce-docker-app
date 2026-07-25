
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const productRoutes = require('./routes/productRoutes'); //
const cartRoutes = require('./routes/cartRoutes');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));
connectDB();

// إعداد جدار الحماية 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes." },
    standardHeaders: true, 
    legacyHeaders: false, 
});
app.use(limiter);

app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
    res.json({ message: "Welcome to the E-commerce API" });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});