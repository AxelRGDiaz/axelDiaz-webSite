import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
  action?: React.ReactNode
}

export function SectionHeader({ title, description, className, action }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-6", className)}>
      <div>
        <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">{title}</h2>
        {description && <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  )
}
