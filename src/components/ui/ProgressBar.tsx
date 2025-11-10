import type { HTMLAttributes } from 'react'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showLabel?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
  gradient?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  variant = 'default',
  gradient = false,
  className = '',
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const variants = {
    default: gradient
      ? 'bg-[#5dcb8a]'
      : 'bg-[#5dcb8a]',
    success: 'bg-[#5dcb8a]',
    warning: 'bg-amber-600',
    error: 'bg-red-600',
  }

  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full ${variants[variant]}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

