import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function CustomButton({ variant = "default", size = "md", children, className = "", ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"

  const variantStyles = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  }

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3 text-lg",
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
