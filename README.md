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
