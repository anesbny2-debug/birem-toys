import { useState, useEffect } from 'react';

type Language = 'ar' | 'fr' | 'en';

const translations: Record<Language, Record<string, string>> = {
  ar: {
    'home': 'الرئيسية',
    'products': 'المنتجات',
    'categories': 'الفئات',
    'cart': 'السلة',
    'checkout': 'الدفع',
    'about': 'عن المتجر',
    'contact': 'اتصل بنا',
    'add_to_cart': 'أضف للسلة',
    'remove_from_cart': 'إزالة من السلة',
    'price': 'السعر',
    'stock': 'المخزون',
    'search': 'البحث',
    'no_results': 'لا توجد نتائج',
  },
  fr: {
    'home': 'Accueil',
    'products': 'Produits',
    'categories': 'Catégories',
    'cart': 'Panier',
    'checkout': 'Paiement',
    'about': 'À propos',
    'contact': 'Nous contacter',
    'add_to_cart': 'Ajouter au panier',
    'remove_from_cart': 'Retirer du panier',
    'price': 'Prix',
    'stock': 'Stock',
    'search': 'Rechercher',
    'no_results': 'Aucun résultat',
  },
  en: {
    'home': 'Home',
    'products': 'Products',
    'categories': 'Categories',
    'cart': 'Cart',
    'checkout': 'Checkout',
    'about': 'About',
    'contact': 'Contact',
    'add_to_cart': 'Add to Cart',
    'remove_from_cart': 'Remove from Cart',
    'price': 'Price',
    'stock': 'Stock',
    'search': 'Search',
    'no_results': 'No results',
  },
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['ar', 'fr', 'en'].includes(saved)) {
      setLanguage(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return {
    language,
    changeLanguage,
    t,
    isArabic: language === 'ar',
    isRTL: language === 'ar',
  };
}
