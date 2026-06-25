"use client"

import { motion } from "framer-motion"
import { TrendingUp, Package, Cpu, GraduationCap } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/data"
import { useLang } from "@/contexts/LanguageContext"

export function MetricsGrid() {
  const { t } = useLang()

  const METRICS = [
    {
      label: t.dashboard.yearsExp,
      value: `${PERSONAL_INFO.yearsOfExperience}+`,
      icon: TrendingUp,
      color: "text-indigo-500 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      description: t.dashboard.yearsExpDesc,
    },
    {
      label: t.dashboard.technologies,
      value: `${PERSONAL_INFO.technologiesUsed}+`,
      icon: Cpu,
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      description: t.dashboard.technologiesDesc,
    },
    {
      label: t.dashboard.projects,
      value: `${PERSONAL_INFO.projectsShipped}+`,
      icon: Package,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/10",
      description: t.dashboard.projectsDesc,
    },
    {
      label: t.dashboard.education,
      value: "B.Eng",
      icon: GraduationCap,
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/10",
      description: t.dashboard.educationDesc,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {METRICS.map((metric, i) => {
        const Icon = metric.icon
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-black/[0.07] dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] shadow-sm dark:shadow-none p-4"
          >
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${metric.bg} mb-3`}>
              <Icon className={`w-4 h-4 ${metric.color}`} />
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">{metric.value}</div>
            <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">{metric.description}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
