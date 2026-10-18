"use client"

import Link from "next/link"
import { useLang } from "@/contexts/LanguageContext"
import { getNextQuest, getQuest, questName } from "@/lib/quests"
import { QuestShot } from "./QuestShot"

export function QuestDetail({ slug }: { slug: string }) {
  const { t, lang } = useLang()
  const quest = getQuest(slug)
  if (!quest) return null

  const name = questName(quest, lang)
  const next = getNextQuest(slug)

  return (
    <article className="mx-auto flex max-w-[1240px] flex-col gap-8 px-6 pt-10 pb-24">
      <Link href="/#misiones" className="self-start py-2 font-pixel text-xs">
        {t.quest.back}
      </Link>

      <header className="win flex flex-col gap-5 px-5 py-9 sm:px-9">
        <div className="flex flex-wrap gap-3">
          <span className="bg-gb-ink px-2.5 text-gb-light">{t.quests.kind[quest.kind]}</span>
          <span className="border-2 border-gb-ink px-2.5">
            {t.quests.status[quest.status]} · {quest.year}
          </span>
        </div>
        <h1 className="m-0 font-pixel text-[clamp(20px,4.4vw,56px)] leading-[1.3] font-normal break-words">{name}</h1>
        <p className="m-0 max-w-[30em] text-[30px] leading-[1.2]">{quest.summary[lang]}</p>
        {quest.links.demo && (
          <a
            href={quest.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start bg-gb-ink px-5 py-4 font-pixel text-xs break-all text-gb-light no-underline hover:bg-gb-dark hover:text-gb-light"
          >
            {t.quest.demo} {new URL(quest.links.demo).host}
          </a>
        )}
      </header>

      <QuestShot quest={quest} />

      <div className="flex flex-wrap gap-8">
        <section className="win min-w-0 flex-[1_1_420px] px-8 py-7">
          <h2 className="m-0 mb-4 font-pixel text-sm font-normal">{t.quest.problem}</h2>
          <p className="m-0">{quest.problem[lang]}</p>
        </section>
        <section className="win min-w-0 flex-[1_1_420px] px-8 py-7">
          <h2 className="m-0 mb-4 font-pixel text-sm font-normal">{t.quest.reward}</h2>
          <p className="m-0">{quest.reward[lang]}</p>
          <h2 className="m-0 mt-6 mb-2 font-pixel text-sm font-normal">{t.quest.gear}</h2>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {quest.stack.map((tool) => (
              <li key={tool} className="border-4 border-gb-ink px-2.5">
                {tool}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="win px-8 py-7">
        <h2 className="m-0 mb-4 font-pixel text-sm font-normal">{t.quest.built}</h2>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {quest.built[lang].map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0">
                ▶
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={`/projects/${next.slug}`}
        className="flex flex-wrap items-center justify-between gap-4 bg-gb-ink px-8 py-7 text-gb-light no-underline hover:bg-gb-dark hover:text-gb-light"
      >
        <span className="font-pixel text-[11px]">{t.quest.next}</span>
        <span className="font-pixel text-[clamp(16px,2.4vw,26px)]">{questName(next, lang)} ▶</span>
      </Link>
    </article>
  )
}
