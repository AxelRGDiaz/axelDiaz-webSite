"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Grid3X3, List, ExternalLink, ChevronRight, Layers } from "lucide-react"
import { type Project } from "@/types"
import { cn } from "@/lib/utils"
import { ProjectPanel } from "./ProjectPanel"
import { useLang } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"

const STATUS_DOT: Record<string, string> = {
  live: "bg-emerald-400",
  wip: "bg-amber-400",
  archived: "bg-zinc-400",
}

interface ProjectExplorerProps {
  projects: Project[]
}

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("__all__")
  const [view, setView] = useState<"grid" | "list">("list")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { t } = useLang()
  const isMobile = useIsMobile()
  const router = useRouter()

  const handleProjectClick = (project: Project) => {
    if (isMobile) {
      router.push(`/projects/${project.slug}`)
    } else {
      setSelectedProject(selectedProject?.slug === project.slug ? null : project)
    }
  }

  const CATEGORIES = ["__all__", "Full Stack", "Backend", "Frontend", "DevOps"]

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchQuery =
        query === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase()))
      const matchCat = category === "__all__" || p.category === category
      return matchQuery && matchCat
    })
  }, [projects, query, category])

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-0">
      {/* Left panel */}
      <div className={cn("flex flex-col transition-all duration-300", selectedProject ? "w-full lg:w-[440px] lg:flex-shrink-0" : "w-full")}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-black/[0.07] dark:border-white/[0.06]">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.projects.filterPlaceholder}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-sm text-zinc-800 dark:text-zinc-300 placeholder:text-zinc-400 outline-none focus:border-black/[0.16] dark:focus:border-white/[0.16] transition-colors"
            />
          </div>
          <div className="flex items-center gap-1">
            {(["list", "grid"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn("p-1.5 rounded-md transition-colors", view === v ? "bg-black/[0.08] dark:bg-white/[0.08] text-zinc-800 dark:text-zinc-200" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300")}
              >
                {v === "list" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 px-6 py-3 border-b border-black/[0.07] dark:border-white/[0.06] overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-colors",
                category === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-black/[0.04] dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-black/[0.07] dark:border-white/[0.06]"
              )}
            >
              {cat === "__all__" ? t.projects.all : cat}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-zinc-400 dark:text-zinc-600 font-mono flex-shrink-0">
            {filtered.length} {t.projects.results}
          </span>
        </div>

        {/* Project List / Grid */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {view === "list" ? (
              <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                {filtered.map((project, i) => (
                  <motion.button
                    key={project.slug}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleProjectClick(project)}
                    className={cn(
                      "w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors group",
                      selectedProject?.slug === project.slug && "bg-black/[0.04] dark:bg-white/[0.04] border-l-2 border-indigo-500"
                    )}
                  >
                    <div className="flex-shrink-0">
                      <div className={cn("w-2 h-2 rounded-full", STATUS_DOT[project.status])} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate">
                          {project.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono flex-shrink-0">{project.year}</span>
                      </div>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">{project.description}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                      {project.stack.slice(0, 2).map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-zinc-500 dark:text-zinc-500 font-mono">
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 2 && <span className="text-[10px] text-zinc-400 dark:text-zinc-600">+{project.stack.length - 2}</span>}
                    </div>
                    <ChevronRight className={cn("w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 flex-shrink-0 transition-transform", selectedProject?.slug === project.slug && "rotate-90 text-indigo-500")} />
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                {filtered.map((project, i) => (
                  <motion.button
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleProjectClick(project)}
                    className={cn(
                      "text-left p-4 rounded-xl border transition-all",
                      selectedProject?.slug === project.slug
                        ? "border-indigo-500/40 bg-indigo-500/5"
                        : "border-black/[0.07] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/[0.12] dark:hover:border-white/[0.1] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", STATUS_DOT[project.status])} />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{project.title}</span>
                      </div>
                      <Layers className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600" />
                    </div>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-zinc-500 font-mono">{tech}</span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-zinc-400 dark:text-zinc-500 text-sm">{t.projects.noResults}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right panel — Detail */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block flex-1 border-l border-black/[0.07] dark:border-white/[0.06] overflow-y-auto"
          >
            <ProjectPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
