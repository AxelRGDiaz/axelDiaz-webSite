import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { QUESTS } from "@/lib/data"
import { getQuest } from "@/lib/quests"
import { QuestDetail } from "@/components/game/QuestDetail"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const quest = getQuest(slug)
  if (!quest) return {}
  return {
    title: quest.name,
    description: quest.summary.es,
  }
}

export function generateStaticParams() {
  return QUESTS.map((q) => ({ slug: q.slug }))
}

export default async function QuestPage({ params }: Props) {
  const { slug } = await params
  if (!getQuest(slug)) notFound()
  return <QuestDetail slug={slug} />
}
