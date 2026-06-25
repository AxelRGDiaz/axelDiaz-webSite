"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, Calendar, Briefcase, CheckCircle2, Tag } from "lucide-react"
import { type Experience } from "@/types"
import { useLang } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es as esLocale, enUS } from "date-fns/locale"

interface CareerFeedProps {
  experience: Experience[]
}

export function CareerFeed({ experience }: CareerFeedProps) {
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.slug ?? null)
  const { t, lang } = useLang()
  const dateLocale = lang === "es" ? esLocale : enUS

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs mb-4">
          <span className="font-mono">{t.career.logLabel}</span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{t.career.title}</h1>
        <p className="text-zinc-500 text-sm">{t.career.subtitle}</p>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/50 via-black/[0.06] dark:via-white/[0.06] to-transparent" />

        <div className="space-y-3">
          {experience.map((exp, i) => {
            const isOpen = expanded === exp.slug
            const typeLabel = t.career.types[exp.type as keyof typeof t.career.types] ?? exp.type
            const role = lang === "es" ? (exp.role_es ?? exp.role) : exp.role
            const description = lang === "es" ? (exp.description_es ?? exp.description) : exp.description
            const achievements = lang === "es" ? (exp.achievements_es ?? exp.achievements) : exp.achievements

            return (
              <motion.div
                key={exp.slug}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative pl-12 group">
                  {/* Node */}
                  <div className={cn(
                    "absolute left-0 top-4 w-10 h-10 rounded-xl flex items-center justify-center border transition-colors",
                    isOpen
                      ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
                      : "bg-black/[0.04] dark:bg-white/[0.04] border-black/[0.08] dark:border-white/[0.08] text-zinc-500 group-hover:border-black/[0.16] dark:group-hover:border-white/[0.16]"
                  )}>
                    <Briefcase className="w-4 h-4" />
                  </div>

                  <div className={cn(
                    "rounded-xl border transition-all",
                    isOpen
                      ? "border-indigo-500/25 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.04]"
                      : "border-black/[0.07] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] hover:border-black/[0.12] dark:hover:border-white/[0.1] hover:bg-white/80 dark:hover:bg-white/[0.03]"
                  )}>
                    <button onClick={() => setExpanded(isOpen ? null : exp.slug)} className="w-full text-left px-5 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2.5 mb-1">
                            <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{exp.version}</span>
                            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{role}</span>
                            {exp.current && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                                {t.career.current}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">@ {exp.company}</div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="hidden sm:flex flex-col items-end gap-0.5 text-[11px] text-zinc-400 dark:text-zinc-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(exp.startDate), "MMM yyyy", { locale: dateLocale })} —{" "}
                              {exp.current ? t.career.present : exp.endDate ? format(new Date(exp.endDate), "MMM yyyy", { locale: dateLocale }) : "?"}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {exp.remote ? t.career.remote : exp.location}
                            </span>
                          </div>
                          <ChevronDown className={cn("w-4 h-4 text-zinc-400 transition-transform", isOpen && "rotate-180 text-indigo-500")} />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-5 border-t border-black/[0.06] dark:border-white/[0.06]">
                            <div className="pt-4">
                              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
                            </div>
                            <div>
                              <h4 className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-3">{t.career.achievements}</h4>
                              <ul className="space-y-2">
                                {achievements.map((ach, j) => (
                                  <li key={j} className="flex items-start gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    {ach}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-3">{t.career.stack}</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.stack.map((tech) => (
                                  <span key={tech} className="text-[11px] px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-mono">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-600">
                              <Tag className="w-3 h-3" />
                              {typeLabel} · {exp.remote ? t.career.remote : exp.location}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
