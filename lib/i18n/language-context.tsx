"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations } from "./translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("language") as Language
      if (saved && (saved === "zh" || saved === "zh-TW" || saved === "en")) {
        setLanguageState(saved)
      }
    } catch (error) {
      console.warn("localStorage not available, using default language:", error)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("language", lang)
    } catch (error) {
      console.warn("Failed to save language preference:", error)
    }
  }

  const t = (key: string): string => {
    try {
      const keys = key.split('.')
      let value: unknown = translations[language]
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          console.warn(`Translation key "${key}" not found for language "${language}"`)
          return key // Return key as fallback
        }
      }
      
      return typeof value === 'string' ? value : key
    } catch (error) {
      console.error('Translation error:', error)
      return key
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
