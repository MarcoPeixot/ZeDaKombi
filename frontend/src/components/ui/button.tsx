// components/ui/button.tsx
import { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: 'default' | 'outline'
}

export function Button({ 
  className, 
  variant = 'default',
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg transition-colors"
  
  const variantStyles = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "bg-transparent text-primary border border-primary hover:bg-primary/10"
  }

  return (
    <button
      {...props}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  )
}