"use client"

import { useLang } from "@/contexts/LanguageContext"
import { PERSONAL_INFO } from "@/lib/data"
import { Sprite } from "./Sprite"

export function TitleScreen() {
  const { t } = useLang()
  const [first, ...rest] = PERSONAL_INFO.name.toUpperCase().split(" ")

  return (
    <section id="inicio" className="mx-auto max-w-[1240px] px-6 pt-14 pb-10">
      <div className="win flex flex-wrap items-center gap-10 px-5 py-10 sm:px-9">
        <Sprite label={t.title.sprite} />
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-5">
          <span className="font-pixel text-xs text-gb-dark">{t.title.players}</span>
          <h1 className="m-0 font-pixel text-[clamp(18px,4vw,52px)] leading-[1.35] font-normal break-words">
            {first}
            <br />
            {rest.join(" ")}
          </h1>
          <p className="m-0 max-w-[26em] text-[30px] leading-[1.2]">{t.title.intro}</p>
          <a href="#personaje" className="blink self-start py-3 font-pixel text-sm no-underline">
            {t.title.start}
          </a>
        </div>
      </div>
    </section>
  )
}
