"use client"

import { useLang } from "@/contexts/LanguageContext"
import { CHAPTERS } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Story() {
  const { t, lang } = useLang()

  return (
    <section id="historia" className="mx-auto max-w-[1240px] px-6 py-10">
      <h2 className="m-0 mb-6 font-pixel text-[clamp(18px,2.4vw,28px)] font-normal">{t.story.heading}</h2>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-0">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.title.es} className={cn("win flex flex-col gap-2 px-7 py-6", chapter.current && "bg-gb-mid")}>
            <span className={cn("font-pixel text-[11px]", !chapter.current && "text-gb-dark")}>
              {t.story.chapter} {i + 1} · {chapter.period[lang]}
            </span>
            <h3 className="m-0 text-[32px] font-normal">{chapter.title[lang]}</h3>
            <p className="m-0">{chapter.text[lang]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
