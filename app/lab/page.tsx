import type { Metadata } from "next"
import { TechLab } from "@/components/lab/TechLab"

export const metadata: Metadata = {
  title: "Tech Lab",
  description: "Installed modules, frameworks, languages, and tools in my developer toolkit.",
}

export default function LabPage() {
  return <TechLab />
}
