import type { Metadata } from "next"
import { ContactHub } from "@/components/contact/ContactHub"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — for project inquiries, job opportunities, or just to say hi.",
}

export default function ContactPage() {
  return <ContactHub />
}
