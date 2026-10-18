export type Lang = "es" | "en"

export type Localized = Record<Lang, string>

export type QuestKind = "main" | "side" | "secret"

export type QuestStatus = "active" | "done" | "archived"

export interface Quest {
  slug: string
  name: string
  nameEn?: string
  kind: QuestKind
  status: QuestStatus
  year: number
  stack: string[]
  links: {
    demo?: string
    github?: string
  }
  // Captura en public/quests/<slug>.webp (color) y <slug>-gb.png (4 tonos)
  shot?: { alt: Localized }
  summary: Localized
  reward: Localized
  problem: Localized
  built: Record<Lang, string[]>
}

export type ItemUse = "daily" | "often" | "sometimes" | "since2021"

export interface InventoryItem {
  name: string
  use: ItemUse
}

export interface Chapter {
  period: Localized
  title: Localized
  text: Localized
  current?: boolean
}
