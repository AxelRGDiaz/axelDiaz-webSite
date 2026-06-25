import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project, Experience, Certification } from "@/types"

const CONTENT_DIR = path.join(process.cwd(), "content")

function getFiles(dir: string): string[] {
  const fullPath = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(fullPath)) return []
  return fs.readdirSync(fullPath).filter((f) => f.endsWith(".mdx"))
}

function readFile(dir: string, file: string) {
  const fullPath = path.join(CONTENT_DIR, dir, file)
  const raw = fs.readFileSync(fullPath, "utf-8")
  const { data, content } = matter(raw)
  const slug = file.replace(".mdx", "")
  return { slug, data, content }
}

export function getAllProjects(): Project[] {
  return getFiles("projects")
    .map((file) => {
      const { slug, data } = readFile("projects", file)
      return { slug, ...(data as Omit<Project, "slug">) }
    })
    .sort((a, b) => b.year - a.year)
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): (Project & { content: string }) | null {
  const file = `${slug}.mdx`
  const fullPath = path.join(CONTENT_DIR, "projects", file)
  if (!fs.existsSync(fullPath)) return null
  const { data, content } = readFile("projects", file)
  return { slug, ...(data as Omit<Project, "slug">), content }
}

export function getAllExperience(): Experience[] {
  return getFiles("experience")
    .map((file) => {
      const { slug, data } = readFile("experience", file)
      return { slug, ...(data as Omit<Experience, "slug">) }
    })
    .sort((a, b) => {
      const dateA = new Date(b.startDate).getTime()
      const dateB = new Date(a.startDate).getTime()
      return dateA - dateB
    })
}

export function getAllCertifications(): Certification[] {
  return getFiles("certifications")
    .map((file) => {
      const { slug, data } = readFile("certifications", file)
      return { slug, ...(data as Omit<Certification, "slug">) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
