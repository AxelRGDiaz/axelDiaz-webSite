"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Lang } from "@/lib/i18n"

type TranslationsType = typeof translations.en

interface LanguageContextValue {
  lang: Lang
  t: TranslationsType
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  t: translations.en as TranslationsType,
  toggleLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    const stored = localStorage.getItem("diaz-os-lang") as Lang | null
    if (stored === "en" || stored === "es") {
      setLang(stored)
    }
  }, [])

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "es" : "en"
    setLang(next)
    localStorage.setItem("diaz-os-lang", next)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as TranslationsType, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
