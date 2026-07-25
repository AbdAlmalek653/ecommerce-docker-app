const API_URL = window.location.origin + '/api';

// ==========================================
// 1. دوال إدارة المنتجات (تعمل في صفحة المنتجات فقط)
// ==========================================
if (document.getElementById('products-grid')) {
    window.onload = () => loadProducts();
}

async function loadProducts(query = '', category = '') {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '<h3 style="text-align: center; color: var(--text-muted); width: 100%;">⏳ جاري التحميل...</h3>';
    
    try {
        let url = `${API_URL}/products`;
        if (query) url = `${API_URL}/products/search?q=${query}`;
        else if (category) url = `${API_URL}/products?category=${category}`;

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success) renderProducts(data.data);
    } catch (error) {
        grid.innerHTML = '<h3 style="color: var(--danger); text-align: center; width: 100%;">❌ فشل الاتصال بالخادم.</h3>';
    }
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    if (products.length === 0) {
        grid.innerHTML = '<h3 style="text-align: center; width: 100%;">لم يتم العثور على منتجات!</h3>';
        return;
    }

    products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <span class="category-tag">${p.category}</span>
                <h3 class="product-title">${p.name}</h3>
                <p class="product-desc">${p.description}</p>
                <div class="product-price">$${p.price}</div>
                <button class="btn" style="width: 100%;" onclick="addToCart('${p._id}', ${p.stock})" ${p.stock < 1 ? 'disabled' : ''}>
                    ${p.stock > 0 ? '➕ أضف للسلة' : '❌ نفدت الكمية'}
                </button>
            </div>
        `;
    });
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.trim();
    loadProducts(query, '');
}

function filterProducts() {
    const cat = document.getElementById('categorySelect').value;
    loadProducts('', cat);
}

// ==========================================
// 2. دوال إدارة سلة المشتريات
// ==========================================
async function addToCart(productId, stock) {
    if (stock < 1) return;
    try {
        const res = await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        const data = await res.json();
        if (data.success) alert('✅ تمت الإضافة للسلة بنجاح!');
    } catch (error) {
        alert('❌ خطأ في الاتصال بالخادم.');
    }
}

async function openCart() {
    document.getElementById('cartModal').style.display = 'flex';
    const container = document.getElementById('cartItems');
    container.innerHTML = '<p>جاري التحميل...</p>';
    
    try {
        const res = await fetch(`${API_URL}/cart`);
        const data = await res.json();
        
        if (data.success && data.data && data.data.items.length > 0) {
            container.innerHTML = '';
            data.data.items.forEach(item => {
                if(item.product) {
                    container.innerHTML += `
                        <div class="cart-item">
                            <div>
                                <h4>${item.product.name}</h4>
                                <small style="color: var(--text-muted)">الكمية: ${item.quantity}</small>
                            </div>
                            <div style="color: var(--success); font-weight: bold;">$${item.product.price * item.quantity}</div>
                        </div>
                    `;
                }
            });
            document.getElementById('cartTotal').innerText = `الإجمالي: $${data.data.totalPrice}`;
        } else {
            container.innerHTML = '<p style="text-align: center;">سلتك فارغة حالياً 🛒</p>';
            document.getElementById('cartTotal').innerText = 'الإجمالي: $0';
        }
    } catch (error) {
        container.innerHTML = '<p style="color: var(--danger);">فشل جلب السلة.</p>';
    }
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

async function checkout() {
    try {
        const res = await fetch(`${API_URL}/cart/checkout`, { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            alert('🎉 ' + data.message);
            closeCart();
            if(document.getElementById('products-grid')) loadProducts(); // تحديث المخزون
        } else {
            alert('⚠️ ' + data.message);
        }
    } catch (error) {
        alert('❌ حدث خطأ أثناء إتمام الطلب.');
    }
}
// ==========================================
// 3. دوال لوحة الإدارة (إضافة وحذف المنتجات)
// ==========================================

// التحقق مما إذا كنا في صفحة لوحة الإدارة
if (document.getElementById('admin-products-grid')) {
    window.onload = () => loadAdminProducts();
}

// دالة إضافة منتج
async function submitProduct(event) {
    event.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = '⏳ جاري الإضافة...';
    btn.disabled = true;

    const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value),
        category: document.getElementById('category').value
    };

    try {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        const data = await res.json();

        if (data.success !== false) {
            alert('✅ تم إضافة المنتج بنجاح!');
            document.getElementById('addProductForm').reset();
            loadAdminProducts(); // تحديث قائمة المنتجات في الأسفل فوراً
        } else {
            alert('⚠️ حدث خطأ: ' + (data.message || 'فشلت الإضافة'));
        }
    } catch (error) {
        alert('❌ فشل الاتصال بالخادم.');
    } finally {
        btn.innerText = 'إضافة للمتجر';
        btn.disabled = false;
    }
}

// دالة جلب المنتجات لعرضها في لوحة الإدارة
async function loadAdminProducts() {
    const grid = document.getElementById('admin-products-grid');
    grid.innerHTML = '<p style="text-align:center; width:100%;">⏳ جاري التحميل...</p>';
    
    try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        
        if (data.success && data.data.length > 0) {
            grid.innerHTML = '';
            data.data.forEach(p => {
                grid.innerHTML += `
                    <div class="product-card" style="text-align: center;">
                        <h4 style="margin-bottom: 10px;">${p.name}</h4>
                        <p style="color: var(--success); font-weight: bold; margin-bottom: 15px;">$${p.price} | المتوفر: ${p.stock}</p>
                        <button class="btn" style="background: var(--danger); width: 100%;" onclick="deleteProduct('${p._id}')">
                            🗑️ حذف المنتج
                        </button>
                    </div>
                `;
            });
        } else {
            grid.innerHTML = '<p style="text-align:center; width:100%;">لا توجد منتجات حالياً.</p>';
        }
    } catch (error) {
        grid.innerHTML = '<p style="color:var(--danger); text-align:center; width:100%;">❌ فشل جلب المنتجات.</p>';
    }
}

// دالة حذف المنتج
async function deleteProduct(id) {
    // رسالة تأكيد قبل الحذف النهائي
    if (!confirm('هل أنت متأكد من حذف هذا المنتج نهائياً من قاعدة البيانات؟')) return;

    try {
        const res = await fetch(`${API_URL}/products/${id}`, { 
            method: 'DELETE' 
        });
        const data = await res.json();

        if (data.success !== false) {
            alert('🗑️ تم حذف المنتج بنجاح!');
            loadAdminProducts(); // تحديث القائمة بعد الحذف
        } else {
            alert('⚠️ خطأ أثناء الحذف: ' + data.message);
        }
    } catch (error) {
        alert('❌ فشل الاتصال بالخادم أثناء محاولة الحذف.');
    }
}