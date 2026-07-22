/**
 * ==========================================================================
 * WM Kids Boutique - App Logic
 * ==========================================================================
 */

// Initialize Icons on load / تهيئة الأيقونات عند تحميل الصفحة
lucide.createIcons();

/**
 * --- 2. RENDER FUNCTIONS / دوال العرض ---
 */

/**
 * English: Renders the product grid based on category selection
 * Arabic: دالة لعرض المنتجات في الشبكة بناءً على الفئة المختارة
 * @param {string} filter - Category filter ('all', 'baby', 'kids', 'teens')
 */
function renderProducts(filter = 'all') {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    const t = translations[currentLang];

    filtered.forEach(product => {
        // Building Size Options / خيارات المقاسات
        const sizeOptions = product.sizes.map(s => `<option value="${s}">${s}</option>`).join('');
        // Building Color Options / خيارات الألوان
        const colorOptions = product.colors.map(c => `<option value="${c}">${c}</option>`).join('');

        const card = `
            <div class="product-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="h-64 bg-gray-200 flex items-center justify-center relative">
                    <!-- Placeholder for Image / مكان مخصص لصورة المنتج -->
                    <div class="text-gray-400 text-sm p-4 text-center border-2 border-dashed border-gray-400 m-4 rounded w-full h-full flex items-center justify-center">
                        ${product.image}
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">${product.name[currentLang]}</h3>
                    <p class="text-rose-500 font-bold text-xl mb-4">${product.price} ${t.currency}</p>

                    <div class="grid grid-cols-2 gap-2 mb-4">
                        <div>
                            <label class="text-xs text-gray-500 mb-1 block">${t.size}</label>
                            <select id="size-${product.id}" class="w-full bg-gray-50 border border-gray-200 rounded text-sm p-1">
                                ${sizeOptions}
                            </select>
                        </div>
                        <div>
                            <label class="text-xs text-gray-500 mb-1 block">${t.color}</label>
                            <select id="color-${product.id}" class="w-full bg-gray-50 border border-gray-200 rounded text-sm p-1">
                                ${colorOptions}
                            </select>
                        </div>
                    </div>

                    <button onclick="addToCart(${product.id})" class="w-full bg-slate-900 hover:bg-rose-500 text-white transition font-semibold py-2 rounded-lg text-sm">
                        ${t.addToCart}
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

/**
 * --- 3. CART LOGIC / منطق السلة ---
 */

/**
 * English: Adds selected product to the shopping cart
 * Arabic: دالة لإضافة منتج إلى سلة المشتريات بالمقاس واللون المحددين
 * @param {number} productId
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const size = document.getElementById(`size-${productId}`).value;
    const color = document.getElementById(`color-${productId}`).value;

    // Check if exact item exists / التحقق مما إذا كان نفس المنتج بنفس الخيارات موجوداً بالفعل في السلة
    const existingItem = cart.find(item => item.id === productId && item.size === size && item.color === color);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, size, color, qty: 1 });
    }

    updateCartUI();
}

/**
 * English: Removes an item from the cart
 * Arabic: دالة لحذف منتج من سلة المشتريات بناءً على فهرسه
 * @param {number} index
 */
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/**
 * English: Updates the shopping cart user interface and recalculates totals
 * Arabic: دالة لتحديث واجهة مستخدم سلة المشتريات وإعادة حساب المجموع
 */
function updateCartUI() {
    const t = translations[currentLang];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }

    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-msg');

    if (!cartItemsContainer || !emptyMsg) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyMsg);
        emptyMsg.style.display = 'block';
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            cartTotalElement.innerText = `0 ${t.currency}`;
        }
        return;
    }

    emptyMsg.style.display = 'none';
    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="flex items-center justify-between border-b pb-2">
                <div class="flex-1">
                    <h4 class="font-semibold text-sm">${item.name[currentLang]}</h4>
                    <p class="text-xs text-gray-500">${t.size}: ${item.size} | ${t.color}: ${item.color}</p>
                    <p class="text-sm font-bold text-rose-500">${item.price} ${t.currency} x ${item.qty}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600 p-2">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.innerText = `${total} ${t.currency}`;
    }
    lucide.createIcons();
}

/**
 * English: Toggles the shopping cart sidebar display
 * Arabic: دالة لفتح أو إغلاق سلة المشتريات مع دعم تحويل الاتجاهات للهواتف الذكية
 */
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const panel = document.getElementById('cart-panel');
    if (!modal || !panel) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => panel.classList.remove('translate-x-full', 'translate-x-[-100%]'), 10);
        // Handle mobile back button / تسيير زر الرجوع في الهواتف الذكية
        window.history.pushState({cartOpen: true}, "");
    } else {
        panel.classList.add(document.dir === 'rtl' ? 'translate-x-full' : 'translate-x-[-100%]');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

// Close cart on hardware back button (Mobile) / إغلاق السلة عند الضغط على زر الرجوع في الهواتف
window.addEventListener("popstate", function(e) {
    const modal = document.getElementById('cart-modal');
    if (modal && !modal.classList.contains('hidden')) {
        toggleCart();
    }
});

/**
 * --- 4. WHATSAPP CHECKOUT / إرسال للواتساب ---
 */

/**
 * English: Opens WhatsApp web/app with prefilled formatted cart content details
 * Arabic: دالة لتأكيد الطلب وتصدير السلة لرسالة منسقة في واتساب
 */
function checkoutWhatsApp() {
    if (cart.length === 0) return;

    let total = 0;
    let message = currentLang === 'ar' ? "مرحباً، أود طلب المنتجات التالية:\n\n" : "Hello, I would like to order:\n\n";

    cart.forEach(item => {
        total += (item.price * item.qty);
        message += `🛍️ ${item.name[currentLang]}\n`;
        message += `   - المقاس/Size: ${item.size}\n`;
        message += `   - اللون/Color: ${item.color}\n`;
        message += `   - الكمية/Qty: ${item.qty}\n`;
        message += `   - السعر/Price: ${item.price}\n`;
        message += `   - الصورة/Image: ${item.image}\n\n`; // Link to image enables WhatsApp preview
    });

    message += `=================\n`;
    message += `${translations[currentLang].total} ${total} ${translations[currentLang].currency}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * --- 5. LANGUAGE & FILTERS / اللغات والفلاتر ---
 */

/**
 * English: Changes the language of the application (RTL for Arabic, LTR for English/French)
 * Arabic: دالة لتغيير لغة المتجر بالكامل وتحديث النصوص والاتجاهات (RTL/LTR)
 * @param {string} lang
 */
function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Direction (RTL for Arabic, LTR for others) / تغيير اتجاه الصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update Texts / تحديث نصوص العناصر
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const filterAll = document.getElementById('filter-all');
    const filterBaby = document.getElementById('filter-baby');
    const filterKids = document.getElementById('filter-kids');
    const filterTeens = document.getElementById('filter-teens');
    const cartTitle = document.getElementById('cart-title');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const totalText = document.getElementById('total-text');
    const checkoutBtnText = document.getElementById('checkout-btn-text');

    if (heroTitle) heroTitle.innerText = t.heroTitle;
    if (heroSubtitle) heroSubtitle.innerText = t.heroSub;
    if (filterAll) filterAll.innerText = t.filterAll;
    if (filterBaby) filterBaby.innerText = t.filterBaby;
    if (filterKids) filterKids.innerText = t.filterKids;
    if (filterTeens) filterTeens.innerText = t.filterTeens;
    if (cartTitle) cartTitle.innerText = t.cartTitle;
    if (emptyCartMsg) emptyCartMsg.innerText = t.emptyCart;
    if (totalText) totalText.innerText = t.total;
    if (checkoutBtnText) checkoutBtnText.innerText = t.checkout;

    // Re-render / إعادة عرض المنتجات وتحديث السلة
    renderProducts('all');
    updateCartUI();
}

/**
 * English: Filters displayed products on screen by category
 * Arabic: دالة لفلترة المنتجات حسب الفئات المختارة
 * @param {string} category
 */
function filterProducts(category) {
    // Update UI buttons / تحديث مظهر أزرار الفلترة النشطة
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-rose-500', 'text-white');
        btn.classList.add('bg-white', 'text-slate-700');
    });
    const activeBtn = document.getElementById(`filter-${category}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-slate-700');
        activeBtn.classList.add('bg-rose-500', 'text-white');
    }

    renderProducts(category);
}

// Initial render of products on load / العرض البدئي للمنتجات عند تشغيل الصفحة
renderProducts();
