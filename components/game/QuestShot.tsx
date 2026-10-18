"use client"

import { useState } from "react"
import Image from "next/image"
import { useLang } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"
import type { Quest } from "@/types"

// Pantalla de la misión: captura en 4 tonos con opción de verla a color
export function QuestShot({ quest, className }: { quest: Quest; className?: string }) {
  const { t, lang } = useLang()
  const [color, setColor] = useState(false)

  if (!quest.shot) {
    const archived = quest.status === "archived"
    return (
      <div
        className={cn(
          "flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 border-4 border-gb-ink bg-gb-ink p-6 text-center text-gb-light",
          className
        )}
      >
        <span className="blink font-pixel text-[clamp(14px,2vw,20px)]">{archived ? t.quests.noSignal : t.quests.noShot}</span>
        {archived && <span>{t.quests.noSignalText}</span>}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border-4 border-gb-ink bg-gb-ink">
        {color ? (
          <Image
            key="color"
            src={`/quests/${quest.slug}.webp`}
            alt={quest.shot.alt[lang]}
            fill
            sizes="(max-width: 1240px) 100vw, 800px"
            className="object-cover object-top"
          />
        ) : (
          <Image
            key="gb"
            src={`/quests/${quest.slug}-gb.png`}
            alt={quest.shot.alt[lang]}
            fill
            unoptimized
            className="object-cover object-top [image-rendering:pixelated]"
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => setColor((c) => !c)}
        aria-pressed={color}
        className="min-h-11 cursor-pointer self-end border-4 border-gb-ink bg-transparent px-3 font-pixel text-[10px] text-gb-ink hover:bg-gb-mid"
      >
        {color ? t.quests.showGb : t.quests.showColor}
      </button>
    </div>
  )
}
