"use client"

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react"
import { translations, type Translations } from "@/lib/i18n"
import type { Lang } from "@/types"

const STORAGE_KEY = "axel-gb-lang"
const CHANGE_EVENT = "axel-gb-lang-change"

// El idioma vive en localStorage (o en memoria si está bloqueado); el servidor siempre renderiza en español
let memoryLang: Lang = "es"

function readLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "es" || stored === "en") return stored
  } catch {}
  return memoryLang
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

interface LanguageContextValue {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  t: translations.es,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => "es" as Lang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
    memoryLang = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as Translations, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
