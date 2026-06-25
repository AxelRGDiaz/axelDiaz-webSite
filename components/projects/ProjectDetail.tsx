"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Code2, Target, Zap, Cpu, ChevronRight } from "lucide-react"
import { type Project } from "@/types"
import { GlassCard } from "@/components/shared/GlassCard"
import { useLang } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

const STATUS_CLASS: Record<string, string> = {
  live: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  wip: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  archived: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
}

interface ProjectDetailProps {
  project: Project & { content: string }
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { t } = useLang()
  const statusLabel = t.projects.status[project.status as keyof typeof t.projects.status] ?? project.status
  const statusClass = STATUS_CLASS[project.status]

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Back nav */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t.projects.backToProjects}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-zinc-100">{project.title}</h1>
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-mono", statusClass)}>
                {statusLabel}
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-xl">{project.description}</p>
            <div className="text-[11px] text-zinc-600 mt-2 font-mono">
              {project.role} · {project.year}
            </div>
          </div>

          <div className="flex gap-2">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07] text-zinc-300 text-sm font-medium transition-all"
              >
                <Code2 className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {project.metrics.map((m) => (
            <GlassCard key={m.label} className="p-4 text-center">
              <div className="text-xl font-bold text-indigo-300 font-mono mb-1">{m.value}</div>
              <div className="text-[10px] text-zinc-500">{m.label}</div>
            </GlassCard>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {project.problem && (
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-red-400" />
                <h2 className="text-sm font-semibold text-zinc-200">{t.projects.problem}</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{project.problem}</p>
            </GlassCard>
          )}

          {project.solution && (
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-zinc-200">{t.projects.solution}</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{project.solution}</p>
            </GlassCard>
          )}

          {project.architecture && (
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-zinc-200">{t.projects.architecture}</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{project.architecture}</p>
            </GlassCard>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold text-zinc-200 mb-3">{t.projects.challenges}</h2>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </GlassCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <GlassCard className="p-5">
            <h3 className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-3">{t.projects.techStack}</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-3">{t.projects.details}</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.projects.category}</span>
                <span className="text-zinc-300">{project.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.projects.year}</span>
                <span className="text-zinc-300 font-mono">{project.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">{t.projects.role}</span>
                <span className="text-zinc-300 text-right text-xs">{project.role}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
