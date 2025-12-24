import type { HTMLAttributes } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface TrendIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  value: number
  direction?: 'up' | 'down' | 'neutral'
  showIcon?: boolean
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  format?: 'percent' | 'number' | 'currency'
  positiveIsGood?: boolean
}

export function TrendIndicator({
  value,
  direction,
  showIcon = true,
  showValue = true,
  size = 'md',
  format = 'percent',
  positiveIsGood = true,
  className = '',
  ...props
}: TrendIndicatorProps) {
  // Auto-detect direction from value if not provided
  const effectiveDirection = direction ?? (value > 0 ? 'up' : value < 0 ? 'down' : 'neutral')

  const isPositive = effectiveDirection === 'up'
  const isNegative = effectiveDirection === 'down'
  const isNeutral = effectiveDirection === 'neutral'

  // Determine color based on direction and whether positive is good
  const getColor = () => {
    if (isNeutral) return 'text-gray-500'
    if (positiveIsGood) {
      return isPositive ? 'text-[#5dcb8a]' : 'text-red-500'
    }
    return isPositive ? 'text-red-500' : 'text-[#5dcb8a]'
  }

  const sizes = {
    sm: {
      text: 'text-xs',
      icon: 'h-3 w-3',
    },
    md: {
      text: 'text-sm',
      icon: 'h-4 w-4',
    },
    lg: {
      text: 'text-base',
      icon: 'h-5 w-5',
    },
  }

  const formatValue = () => {
    const absValue = Math.abs(value)
    switch (format) {
      case 'percent':
        return `${absValue}%`
      case 'currency':
        return `$${absValue.toLocaleString()}`
      default:
        return absValue.toLocaleString()
    }
  }

  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium ${getColor()} ${sizes[size].text} ${className}`}
      {...props}
    >
      {showIcon && <Icon className={sizes[size].icon} />}
      {showValue && (
        <span>
          {isPositive && '+'}
          {isNegative && '-'}
          {formatValue()}
        </span>
      )}
    </span>
  )
}
