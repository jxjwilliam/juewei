/**
 * Language Context API Contract
 * 
 * This contract defines the TypeScript interfaces and types for the language context system
 * used in the multi-language UI support feature.
 */

export type Language = "zh" | "zh-TW" | "en";

export interface LanguageInfo {
  name: string;
  flag: string;
  code: Language;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}

export interface LanguageSwitcherProps {
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export interface NavigationItem {
  key: string;
  href: string;
  label: string;
}

export interface TranslationObject {
  [key: string]: string | TranslationObject;
}

export type Translations = {
  [language in Language]: TranslationObject;
}

// Language configuration
export const LANGUAGES: Record<Language, LanguageInfo> = {
  zh: {
    name: "简体中文",
    flag: "🇨🇳",
    code: "zh"
  },
  "zh-TW": {
    name: "繁體中文", 
    flag: "🇹🇼",
    code: "zh-TW"
  },
  en: {
    name: "English",
    flag: "🇺🇸", 
    code: "en"
  }
};

// Navigation items configuration
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { key: "home", href: "/", label: "nav.home" },
  { key: "products", href: "/products", label: "nav.products" },
  { key: "about", href: "/about", label: "nav.about" },
  { key: "contact", href: "/contact", label: "nav.contact" },
  { key: "partnership", href: "/partnership", label: "nav.partnership" }
];

// Default language
export const DEFAULT_LANGUAGE: Language = "zh";

// localStorage key
export const LANGUAGE_STORAGE_KEY = "language";

// Validation function
export function isValidLanguage(value: string): value is Language {
  return value === "zh" || value === "zh-TW" || value === "en";
}

// Language detection from localStorage
export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored && isValidLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

// Language persistence to localStorage
export function setStoredLanguage(language: Language): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn("Failed to save language preference:", error);
  }
}
