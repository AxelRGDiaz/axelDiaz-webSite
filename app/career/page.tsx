import type { Metadata } from "next"
import { CareerFeed } from "@/components/career/CareerFeed"
import { getAllExperience } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Career",
  description: "My professional journey — versioned as a software changelog.",
}

export default function CareerPage() {
  const experience = getAllExperience()
  return <CareerFeed experience={experience} />
}
