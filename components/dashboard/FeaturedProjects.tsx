"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { type Project } from "@/types"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { useLang } from "@/contexts/LanguageContext"

interface FeaturedProjectsProps {
  projects: Project[]
}

const STATUS_COLOR: Record<string, string> = {
  live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  wip: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  archived: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { t } = useLang()

  return (
    <div>
      <SectionHeader
        title={t.dashboard.featuredProjects}
        action={
          <Link
            href="/projects"
            className="flex items-center gap-1 text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
          >
            {t.dashboard.allProjects} <ArrowRight className="w-3 h-3" />
          </Link>
        }
      />
      <div className="space-y-3">
        {projects.map((project, i) => {
          const statusLabel = t.projects.status[project.status as keyof typeof t.projects.status] ?? project.status
          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="group p-4 rounded-xl border border-black/[0.07] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:border-black/[0.12] dark:hover:border-white/[0.1] transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${STATUS_COLOR[project.status]}`}>
                        {statusLabel}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 dark:group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-zinc-500 dark:text-zinc-400 font-mono">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-zinc-400 dark:text-zinc-600 font-mono">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
