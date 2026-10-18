import { MetadataRoute } from "next"
import { QUESTS, SITE_URL } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ]

  const quests: MetadataRoute.Sitemap = QUESTS.map((q) => ({
    url: `${SITE_URL}/projects/${q.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...home, ...quests]
}
