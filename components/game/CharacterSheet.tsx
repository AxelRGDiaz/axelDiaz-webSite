"use client"

import { useLang } from "@/contexts/LanguageContext"
import { PERSONAL_INFO } from "@/lib/data"

export function CharacterSheet() {
  const { t } = useLang()

  const stats = [
    { label: t.status.class, value: t.status.classValue },
    { label: t.status.level, value: t.status.levelValue(PERSONAL_INFO.yearsOfExperience) },
    { label: t.status.guild, value: t.status.guildValue },
    { label: t.status.origin, value: t.status.originValue },
  ]

  const skills = [
    { label: t.skills.special, value: t.skills.specialValue },
    { label: t.skills.passive, value: t.skills.passiveValue },
    { label: t.skills.origin, value: t.skills.originValue },
  ]

  return (
    <section id="personaje" className="mx-auto flex max-w-[1240px] flex-wrap gap-8 px-6 pt-6 pb-10">
      <div className="win min-w-0 flex-[1_1_420px] px-8 py-7">
        <h2 className="m-0 mb-5 font-pixel text-base font-normal">{t.status.heading}</h2>
        <dl className="m-0 flex flex-col gap-1.5">
          {stats.map((s) => (
            <div key={s.label} className="flex justify-between gap-4">
              <dt>{s.label}</dt>
              <dd className="m-0 text-right">{s.value}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4">
            <dt>{t.status.state}</dt>
            <dd className="m-0 bg-gb-ink px-2 text-gb-light">{t.status.stateValue}</dd>
          </div>
        </dl>
      </div>

      <div className="win flex min-w-0 flex-[1_1_420px] flex-col gap-4 px-8 py-7">
        <h2 className="m-0 font-pixel text-base font-normal">{t.skills.heading}</h2>
        {skills.map((s) => (
          <div key={s.label}>
            <div className="font-pixel text-[11px] text-gb-dark">{s.label}</div>
            <div>{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
