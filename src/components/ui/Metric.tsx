import type { HTMLAttributes, ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface MetricProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  description?: string
  icon?: ReactNode
  gradient?: boolean
}

export function Metric({
  label,
  value,
  trend,
  description,
  icon,
  gradient = false,
  className = '',
  ...props
}: MetricProps) {
  // Determine background color based on trend direction
  const getBackgroundColor = () => {
    if (gradient && trend) {
      return trend.direction === 'up'
        ? 'bg-rattle-green-bg border-rattle-green-lightest'
        : 'bg-red-50 border-red-200'
    }
    if (gradient) {
      return 'bg-rattle-green-bg border-rattle-green-lightest'
    }
    return 'bg-white'
  }

  return (
    <div
      className={`rounded-lg border border-gray-200 p-6 ${getBackgroundColor()} ${className}`}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div
              className={`mt-2 flex items-center text-sm font-medium ${
                trend.direction === 'up' ? 'text-[#5dcb8a]' : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4" />
              )}
              {Math.abs(trend.value).toFixed(1)}%
            </div>
          )}
          {description && (
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {icon && (
          <div className="ml-4 shrink-0 text-black">{icon}</div>
        )}
      </div>
    </div>
  )
}

