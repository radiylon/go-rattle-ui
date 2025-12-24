import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  rounded?: boolean
  'aria-label': string
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  rounded = true,
  disabled,
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors
  `

  const variants = {
    primary: `
      bg-[#5dcb8a] text-black hover:bg-[#6dd49a]
      focus:ring-[#5dcb8a]
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50 focus:ring-gray-500
    `,
    ghost: `
      text-gray-500 hover:text-gray-700 hover:bg-gray-100
      focus:ring-gray-500
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700
      focus:ring-red-500
    `,
  }

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${rounded ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <span className={`${iconSizes[size]} flex items-center justify-center`}>{icon}</span>
      )}
    </button>
  )
}
