import type { ReactNode } from "react"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { FeatureCard } from "./FeatureCard"


interface FeatureSectionProps {
  title: string
  subtitle?: string
  badge?: string
  features: {
    icon?: ReactNode
    title: string
    description: string
    variant?: "default" | "primary" | "secondary" | "accent"
  }[]
  className?: string
  columns?: 2 | 3 | 4
}




export function FeatureSection({ title, subtitle, badge, features, className, columns = 4 }: FeatureSectionProps) {

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }



  return (
    <div className={cn("px-4", className)}>

      <div className="custom-container container mx-auto">
        {badge && (
          <div className="mb-4">
            <span className="inline-block bg-[#DAEBFA] text-gray-700 rounded-full px-4 py-2 text-sm font-[400]">
              {badge}
            </span>
          </div>
        )}

        <h2 className="text-[50px] font-bold mb-4 text-gray-700">{title}</h2>
        {subtitle && <p className="text-gray-600 text-[18px] font-normal mb-8">{subtitle}</p>}

        <div className={cn("grid grid-cols-1 gap-6", gridCols[columns])}>
          {features?.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon || <FileText className="h-8 w-8" />}
              title={feature.title}
              description={feature.description}
              variant={feature.variant}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
