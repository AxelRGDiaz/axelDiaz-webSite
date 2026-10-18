"use client"

import Link from "next/link"
import { useLang } from "@/contexts/LanguageContext"

export default function NotFound() {
  const { t } = useLang()

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-24">
      <div className="win flex flex-col items-start gap-6 px-9 py-12">
        <h1 className="m-0 font-pixel text-[clamp(28px,5vw,56px)] font-normal">{t.notFound.title}</h1>
        <p className="m-0 text-[30px]">{t.notFound.text}</p>
        <Link href="/" className="py-2 font-pixel text-sm no-underline">
          <span aria-hidden="true" className="blink">
            ▶
          </span>{" "}
          {t.notFound.back}
        </Link>
      </div>
    </section>
  )
}
