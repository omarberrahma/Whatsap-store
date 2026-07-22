# WM Kids Boutique - Online Storefront

## 📖 حول المشروع (About the Project)
متجر إلكتروني متكامل مخصص لبيع ملابس الأطفال (من 3 أشهر إلى 16 سنة). مصمم ليكون سريعاً جداً، متجاوباً مع الهواتف الذكية، وموجهاً نحو التجارة عبر الواتساب (WhatsApp-First E-commerce).

## ✨ الميزات الحالية (Current Features)
- **واجهة مستخدم عصرية (Modern UI):** باستخدام Tailwind CSS.
- **سلة مشتريات تفاعلية (Interactive Cart):** إضافة، حذف، وتعديل المقاسات والألوان.
- **نظام اللغات (i18n):** دعم العربية (RTL)، الإنجليزية، والفرنسية (LTR).
- **تصنيف المنتجات (Filters):** (رضع، أطفال، مراهقين).
- **الخروج عبر الواتساب (WhatsApp Checkout):** تحويل السلة تلقائياً إلى رسالة منسقة مع روابط الصور ترسل إلى الرقم +213562163900.

## 🤖 توجيهات لمساعد الذكاء الاصطناعي (Jules AI Instructions)
Note to Jules: I am the developer organizing this project. Currently, the entire frontend (HTML, Tailwind CSS, JS logic, state management) is bundled into a single file `index.html` to establish the baseline functionality and UI/UX.

### 🎯 Your Tasks (المهام المطلوبة منك يا Jules):
#### Code Refactoring & Organization (ترتيب الملفات):
- Please analyze `index.html`.
- Separate the CSS, JavaScript logic, and mock data into appropriate folders (e.g., `assets/css/style.css`, `assets/js/app.js`, `assets/js/data.js`) while maintaining perfect functionality.
- Ensure the file paths are correctly updated in `index.html`.

#### Admin Panel Preparation (تجهيز لوحة الإدارة):
- Create an `admin` folder.
- Scaffold a basic `admin.html` with a secure login layout. (The user wants to separate the client storefront from the admin dashboard).
- Add detailed comments in Arabic and English inside the new files explaining where API calls to Node.js/Supabase will eventually go.

#### SEO & Meta Tags (تحسين محركات البحث):
- Add standard SEO meta tags, Open Graph tags, and a basic structured data (JSON-LD) skeleton to `index.html`.

#### Testing & Pre-commit:
- Verify that the cart logic, language switching (RTL/LTR), and WhatsApp integration still work perfectly after the files are separated.
- Commit these changes cleanly to the repository.

## 🚀 النشر على Vercel (Deployment)
لرفع هذا الموقع بعد تعديلات Jules ليكون متاحاً للجمهور (Live):
1. قم بربط هذا المستودع (GitHub Repository) بحسابك في Vercel.
2. اختر المستودع واضغط Import.
3. اترك حقل Root Directory فارغاً (أو اختر المجلد الرئيسي).
4. اضغط Deploy. سيعمل الموقع فوراً!
