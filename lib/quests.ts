import { QUESTS } from "@/lib/data"
import type { Lang, Quest } from "@/types"

export function questName(quest: Quest, lang: Lang) {
  return lang === "en" && quest.nameEn ? quest.nameEn : quest.name
}

export function getQuest(slug: string) {
  return QUESTS.find((q) => q.slug === slug) ?? null
}

export function getNextQuest(slug: string) {
  const index = QUESTS.findIndex((q) => q.slug === slug)
  return QUESTS[(index + 1) % QUESTS.length]
}
