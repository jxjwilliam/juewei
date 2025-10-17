/**
 * Translation Data Contract
 * 
 * This contract defines the translation data structure and content for the multi-language UI support.
 */

import { Translations, Language } from "./language-context";

export const translations: Translations = {
  zh: {
    nav: {
      home: "首页",
      products: "产品", 
      about: "关于我们",
      contact: "联系我们",
      partnership: "合作下单"
    }
  },
  "zh-TW": {
    nav: {
      home: "首頁",
      products: "產品",
      about: "關於我們", 
      contact: "聯繫我們",
      partnership: "合作下單"
    }
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About Us",
      contact: "Contact", 
      partnership: "Partnership"
    }
  }
};

// Translation key paths for type safety
export type TranslationKey = 
  | "nav.home"
  | "nav.products" 
  | "nav.about"
  | "nav.contact"
  | "nav.partnership";

// Translation function type
export type TranslationFunction = (key: TranslationKey) => string;

// Helper function to get nested translation value
export function getTranslationValue(
  translations: Translations[Language], 
  key: string
): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key as fallback
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Translation validation
export function validateTranslations(): { isValid: boolean; missing: string[] } {
  const missing: string[] = [];
  const requiredKeys: TranslationKey[] = [
    "nav.home",
    "nav.products", 
    "nav.about",
    "nav.contact",
    "nav.partnership"
  ];
  
  for (const language of Object.keys(translations) as Language[]) {
    for (const key of requiredKeys) {
      const value = getTranslationValue(translations[language], key);
      if (value === key) {
        missing.push(`${language}:${key}`);
      }
    }
  }
  
  return {
    isValid: missing.length === 0,
    missing
  };
}
