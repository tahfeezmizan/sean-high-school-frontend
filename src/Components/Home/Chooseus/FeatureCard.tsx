import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
  variant?: "default" | "primary" | "secondary" | "accent"
}


export function FeatureCard({ icon, title, description, className, variant = "default" }: FeatureCardProps) {
  const variantStyles = {
    default: "bg-slate-50",
    primary: "bg-blue-50",
    secondary: "bg-amber-50",
    accent: "bg-emerald-50",
  }

  return (
    <div
      className={cn(
        "rounded-lg p-6 h-full transition-all duration-200 hover:shadow-md border border-[#EBEBEB]",
        variantStyles[variant],
        className,
      )}
    >
      <div  className="mb-4 text-blue-500">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
