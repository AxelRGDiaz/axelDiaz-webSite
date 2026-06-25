import type { Metadata } from "next"
import { ProjectExplorer } from "@/components/projects/ProjectExplorer"
import { getAllProjects } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my software projects — from e-commerce platforms to developer tools.",
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  return <ProjectExplorer projects={projects} />
}
