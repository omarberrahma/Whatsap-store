/**
 * ==========================================================================
 * WM Kids Boutique - Mock Data & State
 * ==========================================================================
 */

/**
 * English: WhatsApp configuration number
 * Arabic: رقم الهاتف الخاص بالواتساب لإرسال الطلبات
 */
const WHATSAPP_NUMBER = "213562163900";

/**
 * English: Products database
 * Arabic: قاعدة بيانات المنتجات التجريبية (يمكن ربطها مستقبلاً بقاعدة بيانات Supabase/Node.js)
 */
const products = [
    {
        id: 1,
        name: {
            ar: "طقم ولادي صيفي",
            en: "Boys Summer Set",
            fr: "Ensemble Été Garçon"
        },
        category: "kids",
        price: 3500,
        image: "assets/images/milano_set.jpg",
        colors: ["أزرق", "أخضر"],
        sizes: ["2Y", "4Y", "6Y"]
    },
    {
        id: 2,
        name: {
            ar: "فستان بناتي زهور",
            en: "Girls Floral Dress",
            fr: "Robe Florale Fille"
        },
        category: "teens",
        price: 4200,
        image: "assets/images/floral_dress.jpg",
        colors: ["وردي", "أبيض"],
        sizes: ["8Y", "10Y", "12Y", "14Y"]
    },
    {
        id: 3,
        name: {
            ar: "رومبر أطفال رضع",
            en: "Baby Romper",
            fr: "Barboteuse Bébé"
        },
        category: "baby",
        price: 2800,
        image: "assets/images/baby_romper.jpg",
        colors: ["أصفر", "رمادي"],
        sizes: ["3M", "6M", "12M", "24M"]
    },
    {
        id: 4,
        name: {
            ar: "تيشيرت كاجوال ولادي",
            en: "Casual Boys T-Shirt",
            fr: "T-Shirt Décontracté"
        },
        category: "teens",
        price: 1500,
        image: "assets/images/tiger_tshirt.jpg",
        colors: ["أسود", "أبيض"],
        sizes: ["10Y", "12Y", "16Y"]
    }
];

/**
 * English: Multi-language translations dictionary
 * Arabic: قاموس الترجمات للغات المختلفة (العربية، الإنجليزية، الفرنسية)
 */
const translations = {
    ar: {
        heroTitle: "تشكيلة الصيف الجديدة للأطفال",
        heroSub: "أحدث صيحات الموضة من 3 أشهر إلى 16 سنة - جودة وأناقة",
        filterAll: "الكل",
        filterBaby: "3 - 24 شهر",
        filterKids: "2 - 6 سنوات",
        filterTeens: "8 - 16 سنة",
        addToCart: "أضف للسلة",
        size: "المقاس",
        color: "اللون",
        cartTitle: "سلة المشتريات",
        emptyCart: "السلة فارغة حالياً",
        total: "المجموع:",
        checkout: "تأكيد الطلب عبر واتساب",
        currency: "د.ج"
    },
    en: {
        heroTitle: "New Summer Kids Collection",
        heroSub: "Latest fashion from 3 months to 16 years - Quality & Style",
        filterAll: "All",
        filterBaby: "3 - 24 Months",
        filterKids: "2 - 6 Years",
        filterTeens: "8 - 16 Years",
        addToCart: "Add to Cart",
        size: "Size",
        color: "Color",
        cartTitle: "Shopping Cart",
        emptyCart: "Cart is empty",
        total: "Total:",
        checkout: "Order via WhatsApp",
        currency: "DZD"
    },
    fr: {
        heroTitle: "Nouvelle Collection Été Enfants",
        heroSub: "Dernière mode de 3 mois à 16 ans - Qualité & Style",
        filterAll: "Tout",
        filterBaby: "3 - 24 Mois",
        filterKids: "2 - 6 Ans",
        filterTeens: "8 - 16 Ans",
        addToCart: "Ajouter au Panier",
        size: "Taille",
        color: "Couleur",
        cartTitle: "Panier",
        emptyCart: "Le panier est vide",
        total: "Total:",
        checkout: "Commander via WhatsApp",
        currency: "DZD"
    }
};

/**
 * English: Initial app state
 * Arabic: حالة التطبيق البدئية (اللغة الحالية وسلة المشتريات)
 */
let currentLang = 'ar';
let cart = [];
let currentFilter = 'all'; // Keep track of current category filter
