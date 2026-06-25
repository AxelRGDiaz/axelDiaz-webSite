"use client"

import { motion } from "framer-motion"
import { GitCommit, Package, Award, GraduationCap } from "lucide-react"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { useLang } from "@/contexts/LanguageContext"

export function ActivityFeed() {
  const { t } = useLang()

  const ACTIVITY = [
    {
      id: 1,
      icon: GitCommit,
      color: "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10",
      title: t.dashboard.activity.joinedMobysuite,
      description: t.dashboard.activity.joinedMobysuiteDesc,
      time: "Feb 2024",
    },
    {
      id: 2,
      icon: Package,
      color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10",
      title: t.dashboard.activity.fullstackApp,
      description: t.dashboard.activity.fullstackAppDesc,
      time: "2024",
    },
    {
      id: 3,
      icon: Package,
      color: "text-amber-500 dark:text-amber-400 bg-amber-500/10",
      title: t.dashboard.activity.envMonitor,
      description: t.dashboard.activity.envMonitorDesc,
      time: "2023",
    },
    {
      id: 4,
      icon: GraduationCap,
      color: "text-purple-500 dark:text-purple-400 bg-purple-500/10",
      title: t.dashboard.activity.graduated,
      description: t.dashboard.activity.graduatedDesc,
      time: "2023",
    },
  ]

  return (
    <div>
      <SectionHeader title={t.dashboard.recentActivity} description={t.dashboard.careerChangelog} />
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-black/[0.06] dark:bg-white/[0.06]" />
        <div className="space-y-4">
          {ACTIVITY.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className="relative flex items-start gap-4 pl-9"
              >
                <div className={`absolute left-0 w-8 h-8 rounded-full ${item.color} flex items-center justify-center z-10`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-zinc-700 dark:text-zinc-200 font-medium">{item.title}</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono flex-shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
