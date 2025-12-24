import type { HTMLAttributes, ReactNode } from 'react'
import { TrendingUp, Target, Award } from 'lucide-react'

export interface QuotaProgressProps extends HTMLAttributes<HTMLDivElement> {
  current: number
  target: number
  label?: string
  showPercentage?: boolean
  showValues?: boolean
  variant?: 'default' | 'detailed' | 'compact'
  milestones?: number[]
  icon?: ReactNode
}

export function QuotaProgress({
  current,
  target,
  label = 'Quota Progress',
  showPercentage = true,
  showValues = true,
  variant = 'default',
  milestones = [],
  icon,
  className = '',
  ...props
}: QuotaProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const isOverTarget = current >= target

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: val >= 1000000 ? 'compact' : 'standard',
      maximumFractionDigits: val >= 1000000 ? 1 : 0,
    }).format(val)

  if (variant === 'compact') {
    return (
      <div className={`${className}`} {...props}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className={`text-sm font-semibold ${isOverTarget ? 'text-[#5dcb8a]' : 'text-gray-900'}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${isOverTarget ? 'bg-[#5dcb8a]' : 'bg-[#5dcb8a]'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 p-5 ${className}`}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">{label}</h4>
            {showValues && (
              <p className="text-sm text-gray-500 mt-0.5">
                {formatCurrency(current)} of {formatCurrency(target)}
              </p>
            )}
          </div>
          <div className={`p-2 rounded-lg ${isOverTarget ? 'bg-rattle-green-lightest' : 'bg-gray-100'}`}>
            {icon || (isOverTarget ? (
              <Award className="h-5 w-5 text-[#5dcb8a]" />
            ) : (
              <Target className="h-5 w-5 text-gray-500" />
            ))}
          </div>
        </div>

        {/* Progress Bar with Milestones */}
        <div className="relative mb-3">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`
                h-full transition-all duration-500 rounded-full
                ${isOverTarget
                  ? 'bg-gradient-to-r from-[#5dcb8a] to-[#4ba370]'
                  : 'bg-[#5dcb8a]'
                }
              `}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Milestone Markers */}
          {milestones.map((milestone) => {
            const position = (milestone / target) * 100
            if (position > 100) return null
            return (
              <div
                key={milestone}
                className="absolute top-0 h-3 w-0.5 bg-gray-400"
                style={{ left: `${position}%` }}
                title={`${milestone}%`}
              />
            )
          })}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <TrendingUp className={`h-4 w-4 ${isOverTarget ? 'text-[#5dcb8a]' : 'text-gray-400'}`} />
            <span className={`text-sm font-semibold ${isOverTarget ? 'text-[#5dcb8a]' : 'text-gray-900'}`}>
              {percentage.toFixed(1)}%
            </span>
          </div>
          {!isOverTarget && (
            <span className="text-sm text-gray-500">
              {formatCurrency(target - current)} to go
            </span>
          )}
          {isOverTarget && (
            <span className="text-sm text-[#5dcb8a] font-medium">
              Target exceeded!
            </span>
          )}
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`${className}`} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className={`text-sm font-semibold ${isOverTarget ? 'text-[#5dcb8a]' : 'text-gray-900'}`}>
            {percentage.toFixed(0)}%
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${isOverTarget ? 'bg-[#5dcb8a]' : 'bg-[#5dcb8a]'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Values */}
      {showValues && (
        <div className="flex items-center justify-between mt-1.5 text-xs text-gray-500">
          <span>{formatCurrency(current)}</span>
          <span>{formatCurrency(target)}</span>
        </div>
      )}
    </div>
  )
}
