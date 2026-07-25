# 🛒 E-Commerce Web Application (Dockerized)

تطبيق متجر إلكتروني متكامل للـ Backend والـ Frontend، يتميز بدعم بيئة التطوير والإنتاج باستخدام **Docker**، مع إدارة آمنة لسلة المشتريات والمنتجات وحماية السيرفر من هجمات الإغراق.

---

## 🚀 الميزات الرئيسية (Features)

* **RESTful API:** واجهات برمجية لإدارة المنتجات وسلة التسوق.
* **إدارة السلة (Cart Management):** إضافة المنتجات، تحديث الكميات تلقائياً، والتحقق من المتاح في المخزن.
* **حماية شبكية (Rate Limiting & CORS):** حماية السيرفر من هجمات DDoS والتخمين عبر تقييد عدد الطلبات من نفس الـ IP.
* **Multi-stage Docker Build:** حاوية دوكر احترافية مصغرة وخفيفة للإنتاج تحافظ على أمان النظام عبر مستخدم محدود الصلاحيات (`node`).
* **MongoDB & Mongoose:** ربط مرن وهيكلي مع قاعدة البيانات واستخدام ميزة `.populate()` لجلب تفاصيل المنتجات ديناميكياً.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ORM
* **Security & Utility:** `express-rate-limit`, `cors`, `dotenv`
* **DevOps & Containerization:** Docker, Dockerfile (Multi-stage build)
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)

---

## 📦 كيفية التشغيل محلياً (Local Setup)

### 1. الاستنساخ (Clone Repository)
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git)
cd YOUR_REPOSITORY

2. إعداد ملف البيئة (.env)
قم بإنشاء ملف .env في المجلد الرئيسي وضَع فيه المتغيرات التالية:

مقتطف الرمز
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27018/ecommerce
NODE_ENV=development
3. تثبيت الحزم وتشغيل بيئة التطوير
Bash
npm install
npm run dev

🐳 التشغيل باستخدام دوكر (Docker Setup)
يمكنك تشغيل المشروع بالكامل داخل حاوية دوكر عبر الخطوات التالية:

1. بناء صورة الدوكر (Build Image)
Bash
docker build -t my-shop-app .

2. تشغيل الحاوية (Run Container)
Bash
docker run -d --name my-shop-container -p 5000:5000 -e PORT=5000 -e MONGO_URI="mongod

ملاحظة: افتح المتصفح على الرابط http://localhost:5000 لمشاهدة واجهة المتجر.🔗 نقاط الاتصال الرئيسية (API Endpoints)المسار (Endpoint)نوع الطلب (Method)الوظيفة (Description)/GETعرض واجهة المتجر الرئيسي (Frontend)/api/productsGETجلب قائمة كافة المنتجات/api/cartGETجلب محتويات سلة المشتريات والإجمالي/api/cart/addPOSTإضافة منتج للسلة أو تحديث الكمية/api/cart/checkoutPOSTإتمام الشراء وتفريغ السلة📝 الترخيص (License)هذا المشروع مرخص تحت رخصة MIT.
