import type { Metadata } from "next"
import { CVCenter } from "@/components/cv/CVCenter"

export const metadata: Metadata = {
  title: "CV Center",
  description: "Download my CV, view my skills, and check my professional profile.",
}

export default function CVPage() {
  return <CVCenter />
}
