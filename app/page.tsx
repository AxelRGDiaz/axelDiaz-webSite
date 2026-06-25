import type { Metadata } from "next"
import { DashboardHero } from "@/components/dashboard/DashboardHero"
import { MetricsGrid } from "@/components/dashboard/MetricsGrid"
import { TechStack } from "@/components/dashboard/TechStack"
import { FeaturedProjects } from "@/components/dashboard/FeaturedProjects"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { getFeaturedProjects } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  const featuredProjects = getFeaturedProjects()

  return (
    <div className="px-6 py-8 space-y-6 max-w-6xl mx-auto">
      <DashboardHero />
      <MetricsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-black/[0.07] dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.02] shadow-sm dark:shadow-none p-5">
          <FeaturedProjects projects={featuredProjects} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-black/[0.07] dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.02] shadow-sm dark:shadow-none p-5">
            <TechStack />
          </div>
          <div className="rounded-xl border border-black/[0.07] dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.02] shadow-sm dark:shadow-none p-5">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
