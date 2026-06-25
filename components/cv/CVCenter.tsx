"use client"

import { motion } from "framer-motion"
import { Download, ExternalLink } from "lucide-react"
import { PERSONAL_INFO, TECHNOLOGIES } from "@/lib/data"
import { useLang } from "@/contexts/LanguageContext"
import { GlassCard } from "@/components/shared/GlassCard"
import { cn } from "@/lib/utils"

const SKILL_GROUPS_DATA = [
  { key: "backend", skills: ["Ruby on Rails", "Node.js", "Express.js", "Sidekiq"] },
  { key: "frontend", skills: ["Vue 3", "JavaScript", "HTML/CSS"] },
  { key: "database", skills: ["MySQL", "Redis", "MongoDB", "PostgreSQL"] },
  { key: "devops", skills: ["Docker", "Git", "Linux / SSH"] },
]

const LEVEL_CLASS: Record<string, string> = {
  expert: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300",
  advanced: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-300",
  intermediate: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-300",
  learning: "bg-black/[0.04] dark:bg-white/[0.04] border-black/[0.08] dark:border-white/[0.08] text-zinc-500",
}

export function CVCenter() {
  const { t, lang } = useLang()

  const stats = [
    { label: t.cv.stats.years, value: `${PERSONAL_INFO.yearsOfExperience}+` },
    { label: t.cv.stats.projects, value: `${PERSONAL_INFO.projectsShipped}+` },
    { label: t.cv.stats.technologies, value: `${PERSONAL_INFO.technologiesUsed}+` },
    { label: t.cv.stats.education, value: "✓" },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{PERSONAL_INFO.name}</h1>
          <p className="text-zinc-500 dark:text-zinc-400">{PERSONAL_INFO.title}</p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">{PERSONAL_INFO.location} · {PERSONAL_INFO.email}</p>
        </div>
        <div className="flex flex-col gap-2">
          <a href="/cv.pdf" download className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            {t.cv.downloadPdf}
          </a>
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/[0.1] dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.07] dark:hover:bg-white/[0.07] text-zinc-700 dark:text-zinc-300 text-sm font-medium transition-all">
            <ExternalLink className="w-4 h-4" />
            {t.cv.viewOnline}
          </a>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — main */}
        <div className="lg:col-span-3 space-y-6">
          <GlassCard className="p-5" delay={0.05}>
            <h2 className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-semibold mb-3">{t.cv.summary}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {lang === "es" ? PERSONAL_INFO.bio_es : PERSONAL_INFO.bio}
            </p>
          </GlassCard>

          <GlassCard className="p-5" delay={0.1}>
            <h2 className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-semibold mb-4">{t.cv.skills}</h2>
            <div className="space-y-4">
              {SKILL_GROUPS_DATA.map((group) => {
                const groupLabel = t.cv.skillGroups[group.key as keyof typeof t.cv.skillGroups]
                return (
                  <div key={group.key}>
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-600 mb-2">{groupLabel}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => {
                        const tech = TECHNOLOGIES.find((t) => t.name === skill)
                        return (
                          <span key={skill} className={cn("text-[11px] px-2.5 py-1 rounded-md border font-mono transition-colors", tech?.level ? LEVEL_CLASS[tech.level] : LEVEL_CLASS.learning)}>
                            {skill}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-5" delay={0.15}>
            <h2 className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-semibold mb-4">{t.cv.byNumbers}</h2>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{stat.label}</span>
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-mono">{stat.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  )
}
