"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Code2, Link2, AtSign, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/data"
import { GlassCard } from "@/components/shared/GlassCard"
import { useLang } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

type Status = "idle" | "loading" | "success" | "error"

export function ContactHub() {
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const { t } = useLang()

  const SOCIAL_LINKS = [
    { label: "GitHub", icon: Code2, href: PERSONAL_INFO.github, handle: "@axeldiaz" },
    { label: "LinkedIn", icon: Link2, href: PERSONAL_INFO.linkedin, handle: "in/axeldiaz" },
    { label: "Twitter / X", icon: AtSign, href: PERSONAL_INFO.twitter ?? "#", handle: "@axeldiaz" },
    { label: "Email", icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, handle: PERSONAL_INFO.email },
  ]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = t.contact.errors.nameRequired
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.contact.errors.emailRequired
    if (!form.message.trim() || form.message.length < 20) e.message = t.contact.errors.messageTooShort
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }) }
      else setStatus("error")
    } catch { setStatus("error") }
  }

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }))
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t.contact.availableBadge}
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{t.contact.title}</h1>
        <p className="text-zinc-500 text-sm max-w-xl">{t.contact.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3">
          <GlassCard className="p-6">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mb-2">{t.contact.successTitle}</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">{t.contact.successDesc}</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-xs text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label={t.contact.name} placeholder={t.contact.namePlaceholder} value={form.name} error={errors.name} onChange={(v) => updateField("name", v)} />
                    <FormField label={t.contact.email} type="email" placeholder={t.contact.emailPlaceholder} value={form.email} error={errors.email} onChange={(v) => updateField("email", v)} />
                  </div>
                  <FormField label={t.contact.subject} placeholder={t.contact.subjectPlaceholder} value={form.subject} onChange={(v) => updateField("subject", v)} />
                  <div className="space-y-1.5">
                    <label className="block text-xs text-zinc-500 font-medium">{t.contact.message}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder={t.contact.messagePlaceholder}
                      rows={5}
                      className={cn(
                        "w-full px-3.5 py-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none resize-none transition-colors",
                        errors.message ? "border-red-500/50 focus:border-red-500/80" : "border-black/[0.08] dark:border-white/[0.08] focus:border-black/[0.2] dark:focus:border-white/[0.2]"
                      )}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                  </div>
                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {t.contact.errorMsg}
                    </div>
                  )}
                  <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors">
                    {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" />{t.contact.sending}</> : <><Send className="w-4 h-4" />{t.contact.send}</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-5" delay={0.1}>
            <h3 className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-semibold mb-4">{t.contact.findOnline}</h3>
            <div className="space-y-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.07] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/[0.14] dark:hover:border-white/[0.12] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-black/[0.05] dark:bg-white/[0.06] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{link.label}</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">{link.handle}</div>
                    </div>
                  </a>
                )
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-4" delay={0.15}>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">{t.contact.responseTime}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{t.contact.responseTimeValue}</div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-1">{t.contact.responseNote}</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, type = "text", placeholder, value, error, onChange }: {
  label: string; type?: string; placeholder: string; value: string; error?: string; onChange: (v: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs text-zinc-500 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none transition-colors",
          error ? "border-red-500/50 focus:border-red-500/80" : "border-black/[0.08] dark:border-white/[0.08] focus:border-black/[0.2] dark:focus:border-white/[0.2]"
        )}
      />
      {error && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  )
}
