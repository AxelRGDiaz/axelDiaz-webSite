"use client"

import { useState } from "react"
import Link from "next/link"
import { useLang } from "@/contexts/LanguageContext"
import { QUESTS } from "@/lib/data"
import { questName } from "@/lib/quests"
import { cn } from "@/lib/utils"
import { QuestShot } from "./QuestShot"

export function QuestLog() {
  const { t, lang } = useLang()
  const [selected, setSelected] = useState(QUESTS[0].slug)
  const quest = QUESTS.find((q) => q.slug === selected) ?? QUESTS[0]
  const name = questName(quest, lang)

  return (
    <section id="misiones" className="mx-auto max-w-[1240px] px-6 py-10">
      <h2 className="m-0 mb-6 font-pixel text-[clamp(18px,2.4vw,28px)] font-normal">{t.quests.heading}</h2>
      <div className="flex flex-wrap items-stretch gap-8">
        <div role="group" aria-label={t.quests.pick} className="win flex min-w-0 flex-[1_1_320px] flex-col gap-1 self-start p-5">
          {QUESTS.map((q) => {
            const active = q.slug === quest.slug
            return (
              <button
                key={q.slug}
                type="button"
                onClick={() => setSelected(q.slug)}
                aria-pressed={active}
                className={cn(
                  "flex min-h-12 w-full cursor-pointer items-center gap-2 border-0 px-2.5 py-1.5 font-screen text-[26px]",
                  active ? "bg-gb-ink text-gb-light" : "bg-transparent text-gb-ink hover:bg-gb-mid"
                )}
              >
                <span className="w-[22px] shrink-0">{active ? "▶" : ""}</span>
                <span className="grow text-left">{questName(q, lang)}</span>
                <span className="text-xl">{t.quests.kind[q.kind]}</span>
              </button>
            )
          })}
        </div>

        <div className="win flex min-w-0 flex-[999_1_520px] flex-col gap-4 px-8 py-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h3 className="m-0 font-pixel text-[clamp(16px,2vw,22px)] leading-[1.4] font-normal">{name}</h3>
            <span className="bg-gb-ink px-2.5 text-gb-light">
              {t.quests.status[quest.status]} · {quest.year}
            </span>
          </div>
          <QuestShot key={quest.slug} quest={quest} />
          <p className="m-0">{quest.summary[lang]}</p>
          <div>
            <span className="font-pixel text-[11px] text-gb-dark">{t.quests.reward}</span>
            <div>{quest.reward[lang]}</div>
          </div>
          <div>
            <span className="font-pixel text-[11px] text-gb-dark">{t.quests.gear}</span>
            <div>{quest.stack.join(" · ")}</div>
          </div>
          <Link href={`/projects/${quest.slug}`} className="self-start py-2 font-pixel text-xs">
            {t.quests.open}
          </Link>
        </div>
      </div>
    </section>
  )
}
