"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { PERSONAL_INFO } from "@/lib/data"
import { useLang } from "@/contexts/LanguageContext"

export function DashboardHero() {
  const { t, lang } = useLang()
  const bio = lang === "es" ? PERSONAL_INFO.bio_es : PERSONAL_INFO.bio

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.03] p-8 shadow-sm dark:shadow-none">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t.dashboard.statusBadge}
        </motion.div>

        {/* Name + Title */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
            {PERSONAL_INFO.name}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-lg text-zinc-500 dark:text-zinc-400 font-light">{PERSONAL_INFO.title}</span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-mono">
              {PERSONAL_INFO.currentVersion}
            </span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mt-4 max-w-xl"
        >
          {bio}
        </motion.p>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-4 mt-5 text-xs text-zinc-400 dark:text-zinc-500 flex-wrap"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {PERSONAL_INFO.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {PERSONAL_INFO.yearsOfExperience}+ {lang === "es" ? "años" : "years"}
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {PERSONAL_INFO.technologiesUsed}+ {lang === "es" ? "tecnologías" : "technologies"}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mt-7"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            {t.dashboard.viewProjects}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/[0.1] dark:border-white/10 hover:border-black/[0.18] dark:hover:border-white/20 bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.07] text-zinc-700 dark:text-zinc-300 text-sm font-medium transition-all"
          >
            {t.dashboard.getInTouch}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
