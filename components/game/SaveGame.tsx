"use client"

import { useState } from "react"
import { useLang } from "@/contexts/LanguageContext"
import { PERSONAL_INFO } from "@/lib/data"
import { cn } from "@/lib/utils"

type Status = "idle" | "loading" | "success" | "error"
type Field = "name" | "email" | "subject" | "message"

const EMPTY_FORM: Record<Field, string> = { name: "", email: "", subject: "", message: "" }

export function SaveGame() {
  const { t } = useLang()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>("idle")

  const validate = () => {
    const e: Partial<Record<Field, string>> = {}
    if (!form.name.trim()) e.name = t.save.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t.save.errors.email
    if (form.message.trim().length < 20) e.message = t.save.errors.message
    return e
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus("success")
      setForm(EMPTY_FORM)
    } catch {
      setStatus("error")
    }
  }

  const update = (field: Field, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  return (
    <section id="guardar" className="mx-auto max-w-[1240px] px-6 pt-10 pb-24">
      <h2 className="m-0 mb-6 font-pixel text-[clamp(18px,2.4vw,28px)] font-normal">{t.save.heading}</h2>
      <div className="win p-8">
        {status === "success" ? (
          <div role="status" className="flex min-h-[360px] flex-col items-start justify-center gap-5">
            <span className="font-pixel text-[clamp(20px,3vw,32px)] leading-[1.4]">{t.save.successTitle}</span>
            <p className="m-0 text-[30px]">{t.save.successText}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="h-[52px] cursor-pointer border-4 border-gb-ink bg-transparent px-5 font-pixel text-xs text-gb-ink hover:bg-gb-mid"
            >
              {t.save.again}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[18px]">
            <p className="m-0 text-[28px]">{t.save.intro}</p>
            <div className="flex flex-wrap gap-[18px]">
              <FormField id="g-name" label={t.save.name} error={errors.name} className="flex-[1_1_240px]">
                <input
                  id="g-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={t.save.namePlaceholder}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "g-name-error" : undefined}
                  className="gb-field h-[52px] px-3.5"
                />
              </FormField>
              <FormField id="g-email" label={t.save.email} error={errors.email} className="flex-[1_1_240px]">
                <input
                  id="g-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={t.save.emailPlaceholder}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "g-email-error" : undefined}
                  className="gb-field h-[52px] px-3.5"
                />
              </FormField>
            </div>
            <FormField id="g-subject" label={t.save.subject}>
              <input
                id="g-subject"
                type="text"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder={t.save.subjectPlaceholder}
                className="gb-field h-[52px] px-3.5"
              />
            </FormField>
            <FormField id="g-message" label={t.save.message} error={errors.message}>
              <textarea
                id="g-message"
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={t.save.messagePlaceholder}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "g-message-error" : undefined}
                className="gb-field resize-y px-3.5 py-3 leading-[1.2]"
              />
            </FormField>
            {status === "error" && (
              <p role="alert" className="m-0 bg-gb-ink px-3 py-2 text-gb-light">
                {t.save.errorText}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-14 cursor-pointer border-4 border-gb-ink bg-gb-ink px-6 font-pixel text-sm text-gb-light hover:bg-gb-dark disabled:cursor-progress disabled:opacity-70"
              >
                {status === "loading" ? t.save.sending : t.save.submit}
              </button>
              <span className="text-[22px] text-gb-dark">{t.save.note}</span>
            </div>
          </form>
        )}
      </div>

      <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-7 gap-y-3 p-0">
        <li>
          <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        </li>
        <li>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
      </ul>
    </section>
  )
}

function FormField({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-pixel text-[11px]">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="text-[22px] text-gb-dark">
          ▲ {error}
        </span>
      )}
    </div>
  )
}
