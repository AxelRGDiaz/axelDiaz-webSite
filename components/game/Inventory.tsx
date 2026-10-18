"use client"

import { useLang } from "@/contexts/LanguageContext"
import { INVENTORY } from "@/lib/data"

export function Inventory() {
  const { t } = useLang()

  return (
    <section id="inventario" className="mx-auto max-w-[1240px] px-6 py-10">
      <h2 className="m-0 mb-6 font-pixel text-[clamp(18px,2.4vw,28px)] font-normal">{t.inventory.heading}</h2>
      <div className="win p-6">
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 p-0">
          {INVENTORY.map((item) => (
            <li key={item.name} className="flex flex-col gap-0.5 border-4 border-gb-ink bg-gb-light px-3.5 py-3">
              <span className="text-[26px]">{item.name}</span>
              <span className="text-xl text-gb-dark">{t.inventory.use[item.use]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
