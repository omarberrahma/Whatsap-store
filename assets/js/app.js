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
 * Arabic: دالة لعرض المنتجات في الشبكة بناءً على الفئة المختارة مع عرض الصور الحقيقية
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
                <div class="h-64 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                    <!-- Product Image / صورة المنتج الحقيقية المضافة حديثاً -->
                    ${product.image ? `
                        <img src="${product.image}" alt="${product.name[currentLang]}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                    ` : `
                        <div class="text-gray-400 text-sm p-4 text-center border-2 border-dashed border-gray-400 m-4 rounded w-full h-full flex items-center justify-center">
                            No Image
                        </div>
                    `}
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
 * English: Adds selected product to the shopping cart and opens the cart drawer automatically
 * Arabic: دالة لإضافة منتج إلى سلة المشتريات وفتح السلة تلقائياً لتقديم تغذية بصرية فورية للمستخدم
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

    // Open cart drawer automatically for visual feedback if it is closed
    // فتح السلة تلقائياً لإشعار المشتري بالإضافة وتسهيل تجربة الاستخدام
    const modal = document.getElementById('cart-modal');
    if (modal && modal.classList.contains('hidden')) {
        toggleCart();
    }
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
                <div class="flex-1 flex items-center space-x-3 space-x-reverse">
                    ${item.image ? `
                        <img src="${item.image}" alt="${item.name[currentLang]}" class="w-12 h-12 object-cover rounded-md border border-gray-100 flex-shrink-0">
                    ` : ''}
                    <div>
                        <h4 class="font-semibold text-sm">${item.name[currentLang]}</h4>
                        <p class="text-xs text-gray-500">${t.size}: ${item.size} | ${t.color}: ${item.color}</p>
                        <p class="text-sm font-bold text-rose-500">${item.price} ${t.currency} x ${item.qty}</p>
                    </div>
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
 * English: Toggles the shopping cart sidebar display with direction-independent slide
 * Arabic: دالة لفتح أو إغلاق سلة المشتريات بسلاسة بالغة وتوافق تام دون مشاكل الاتجاهات أو الحاجة لتحديث الصفحة
 * @param {boolean} isPopstate - Identifies if call was triggered by hardware back button
 */
function toggleCart(isPopstate = false) {
    const modal = document.getElementById('cart-modal');
    const panel = document.getElementById('cart-panel');
    if (!modal || !panel) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        // Smoothly slide in from the right edge
        setTimeout(() => panel.classList.remove('translate-x-full'), 10);
        // Track history state for mobile back button compatibility
        if (!isPopstate) {
            window.history.pushState({cartOpen: true}, "");
        }
    } else {
        // Smoothly slide out to the right edge
        panel.classList.add('translate-x-full');
        setTimeout(() => modal.classList.add('hidden'), 300);
        // Correct history state if closed manually
        if (!isPopstate && window.history.state && window.history.state.cartOpen) {
            window.history.back();
        }
    }
}

// Close cart on hardware back button (Mobile) / إغلاق السلة عند الضغط على زر الرجوع في الهواتف الذكية دون إعادة تحميل الصفحة
window.addEventListener("popstate", function(e) {
    const modal = document.getElementById('cart-modal');
    if (modal && !modal.classList.contains('hidden')) {
        toggleCart(true);
    }
});

/**
 * --- 4. WHATSAPP CHECKOUT / إرسال للواتساب ---
 */

/**
 * English: Opens WhatsApp web/app with prefilled formatted cart content details
 * Arabic: دالة لتأكيد الطلب وتصدير السلة لرسالة منسقة في واتساب مع روابط صور حقيقية لإتاحة معاينة الصور داخل واتساب
 */
function checkoutWhatsApp() {
    if (cart.length === 0) return;

    let total = 0;
    let message = currentLang === 'ar' ? "مرحباً، أود طلب المنتجات التالية:\n\n" : "Hello, I would like to order:\n\n";

    // Construct real absolute URL base for image previews in WhatsApp
    const origin = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');

    cart.forEach(item => {
        total += (item.price * item.qty);
        const imageUrl = item.image ? `${origin}/${item.image}` : '';
        message += `🛍️ ${item.name[currentLang]}\n`;
        message += `   - المقاس/Size: ${item.size}\n`;
        message += `   - اللون/Color: ${item.color}\n`;
        message += `   - الكمية/Qty: ${item.qty}\n`;
        message += `   - السعر/Price: ${item.price}\n`;
        if (imageUrl) {
            message += `   - الصورة/Image: ${imageUrl}\n`; // Link to image enables WhatsApp preview
        }
        message += `\n`;
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
 * English: Changes the language of the application while preserving the current active filter selection
 * Arabic: دالة لتغيير لغة المتجر بالكامل وتحديث النصوص والاتجاهات (RTL/LTR) مع الحفاظ على الفلترة النشطة حالياً لتجنب إعادة ضبط المعطيات
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

    // Re-render using active filter / إعادة عرض المنتجات بناءً على الفلترة المفعلة حالياً دون إعادة تحميل الصفحة كاملة
    renderProducts(currentFilter);
    updateCartUI();
}

/**
 * English: Filters displayed products on screen by category and tracks it globally
 * Arabic: دالة لفلترة المنتجات حسب الفئات المختارة وتتبع حالة الفلترة المحددة لتأمين تنقل سلس بدون ريفريش
 * @param {string} category
 */
function filterProducts(category) {
    currentFilter = category; // Record category state

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
