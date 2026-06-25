export interface Project {
  slug: string
  title: string
  description: string
  longDescription?: string
  stack: string[]
  category: string
  status: "live" | "archived" | "wip"
  featured: boolean
  year: number
  role: string
  problem?: string
  solution?: string
  architecture?: string
  challenges?: string[]
  metrics?: { label: string; value: string }[]
  links: {
    github?: string
    demo?: string
    case_study?: string
  }
  images?: string[]
  thumbnail?: string
}

export interface Experience {
  slug: string
  company: string
  role: string
  role_es?: string
  version: string
  startDate: string
  endDate?: string
  current: boolean
  type: "full-time" | "contract" | "freelance" | "part-time"
  location: string
  remote: boolean
  description: string
  description_es?: string
  achievements: string[]
  achievements_es?: string[]
  stack: string[]
  logo?: string
}

export interface Certification {
  slug: string
  name: string
  issuer: string
  date: string
  expires?: string
  credentialId?: string
  credentialUrl?: string
  logo?: string
  category: string
}

export interface Technology {
  name: string
  category: "language" | "framework" | "database" | "cloud" | "tool" | "other"
  icon?: string
  level: "expert" | "advanced" | "intermediate" | "learning"
  yearsOfExperience: number
  description: string
  useCases: string[]
  projects?: string[]
}

export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
  badge?: string | number
}

export type Theme = "light" | "dark"
