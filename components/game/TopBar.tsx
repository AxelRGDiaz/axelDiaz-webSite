"use client"

import Link from "next/link"
import { useLang } from "@/contexts/LanguageContext"
import { PERSONAL_INFO } from "@/lib/data"
import { cn } from "@/lib/utils"
import type { Lang } from "@/types"

const LANGS: Lang[] = ["es", "en"]

export function TopBar() {
  const { t, lang, setLang } = useLang()

  const links = [
    { href: "/#misiones", label: t.nav.quests },
    { href: "/#inventario", label: t.nav.inventory },
    { href: "/#historia", label: t.nav.story },
    { href: "/#guardar", label: t.nav.save },
  ]

  return (
    <header className="sticky top-0 z-20 bg-gb-ink text-gb-light">
      <div className="mx-auto flex min-h-16 max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6">
        <Link href="/" className="font-pixel text-sm text-gb-light no-underline hover:text-gb-mid">
          AXEL.GB
        </Link>

        <nav aria-label={t.nav.sections} className="hidden gap-1 font-pixel text-[11px] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2.5 py-3.5 text-gb-light no-underline hover:bg-gb-light hover:text-gb-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div role="group" aria-label={t.nav.language} className="flex border-2 border-gb-light font-pixel text-[10px]">
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cn(
                  "min-h-10 min-w-11 cursor-pointer uppercase",
                  lang === code ? "bg-gb-light text-gb-ink" : "bg-transparent text-gb-light hover:bg-gb-dark"
                )}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href={PERSONAL_INFO.cv}
            download
            className="bg-gb-mid px-3 py-3.5 font-pixel text-[11px] text-gb-ink no-underline hover:bg-gb-light hover:text-gb-ink"
          >
            CV.PDF
          </a>
        </div>
      </div>
    </header>
  )
}
