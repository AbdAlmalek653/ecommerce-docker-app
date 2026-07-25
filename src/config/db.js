const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // قراءة رابط الاتصال من متغيرات البيئة
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1); // إيقاف التطبيق في حال فشل الاتصال
    }
};

module.exports = connectDB;