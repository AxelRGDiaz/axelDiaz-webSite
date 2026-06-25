"use client"

import { motion } from "framer-motion"
import { X, ExternalLink, Code2, ArrowRight, Target, Cpu, Zap } from "lucide-react"
import Link from "next/link"
import { type Project } from "@/types"
import { useLang } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

interface ProjectPanelProps {
  project: Project
  onClose: () => void
}

const STATUS_CLASS: Record<string, string> = {
  live: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  wip: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  archived: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
}

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const { t } = useLang()
  const statusLabel = t.projects.status[project.status as keyof typeof t.projects.status] ?? project.status

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.07] dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">{project.title}</h2>
          <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-mono", STATUS_CLASS[project.status])}>
            {statusLabel}
          </span>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05]">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1">{t.projects.role}</div>
            <div className="text-xs text-zinc-700 dark:text-zinc-300">{project.role}</div>
          </div>
          <div className="p-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05]">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1">{t.projects.year}</div>
            <div className="text-xs text-zinc-700 dark:text-zinc-300 font-mono">{project.year}</div>
          </div>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div>
            <h3 className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-3">{t.projects.impactMetrics}</h3>
            <div className="grid grid-cols-2 gap-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                  <div className="text-base font-bold text-indigo-600 dark:text-indigo-300 font-mono">{m.value}</div>
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.problem && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-3.5 h-3.5 text-red-500" />
              <h3 className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.projects.problem}</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed pl-5">{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <h3 className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.projects.solution}</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed pl-5">{project.solution}</p>
          </div>
        )}

        {project.architecture && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <h3 className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.projects.architecture}</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed pl-5">{project.architecture}</p>
          </div>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <div>
            <h3 className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-3">{t.projects.challenges}</h3>
            <ul className="space-y-2">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                  <ArrowRight className="w-3 h-3 text-zinc-300 dark:text-zinc-600 flex-shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-3">{t.projects.techStack}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span key={tech} className="text-[11px] px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-zinc-600 dark:text-zinc-300 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              {t.projects.liveDemo}
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.07] dark:hover:bg-white/[0.07] text-zinc-700 dark:text-zinc-300 text-sm font-medium transition-all">
              <Code2 className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
          <Link href={`/projects/${project.slug}`} className="px-4 py-2 rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.07] dark:hover:bg-white/[0.07] text-zinc-700 dark:text-zinc-300 text-sm font-medium transition-all">
            {t.projects.fullCase}
          </Link>
        </div>
      </div>
    </div>
  )
}
