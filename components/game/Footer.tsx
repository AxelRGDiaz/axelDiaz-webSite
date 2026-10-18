"use client"

import { useLang } from "@/contexts/LanguageContext"
import { PERSONAL_INFO } from "@/lib/data"

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-gb-ink text-gb-light">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-x-6 gap-y-2.5 px-6 py-5 font-pixel text-[10px] leading-relaxed">
        <span>© {new Date().getFullYear()} {PERSONAL_INFO.name.toUpperCase()}</span>
        <span>{t.footer.madeIn}</span>
      </div>
    </footer>
  )
}
