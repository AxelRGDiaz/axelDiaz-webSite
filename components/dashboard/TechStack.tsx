"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { TECHNOLOGIES } from "@/lib/data"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { ArrowRight } from "lucide-react"
import { useLang } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

const LEVEL_COLOR: Record<string, string> = {
  expert: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  advanced: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  intermediate: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  learning: "bg-zinc-500/15 text-zinc-500 border-zinc-500/20",
}

const MAIN_TECH = ["Ruby on Rails", "Vue 3", "MySQL", "Node.js", "Sidekiq", "Docker"]

export function TechStack() {
  const { t } = useLang()
  const featured = TECHNOLOGIES.filter((t) => MAIN_TECH.includes(t.name))

  return (
    <div>
      <SectionHeader
        title={t.dashboard.coreStack}
        description={t.dashboard.primaryTech}
        action={
          <Link
            href="/lab"
            className="flex items-center gap-1 text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
          >
            {t.dashboard.fullLab} <ArrowRight className="w-3 h-3" />
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-2">
        {featured.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-black/[0.07] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors group"
          >
            <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              {tech.name}
            </span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-mono uppercase tracking-wide", LEVEL_COLOR[tech.level])}>
              {t.lab.levels[tech.level]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
