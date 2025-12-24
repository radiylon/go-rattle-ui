import type { HTMLAttributes } from 'react'
import { Check } from 'lucide-react'
import type { DealStage } from '../../types'

export interface StageIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  currentStage: DealStage
  variant?: 'horizontal' | 'vertical' | 'compact'
  showLabels?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const stages: DealStage[] = [
  'prospecting',
  'qualification',
  'proposal',
  'negotiation',
  'closed-won',
]

const stageLabels: Record<DealStage, string> = {
  'prospecting': 'Prospecting',
  'qualification': 'Qualification',
  'proposal': 'Proposal',
  'negotiation': 'Negotiation',
  'closed-won': 'Closed Won',
  'closed-lost': 'Closed Lost',
}

export function StageIndicator({
  currentStage,
  variant = 'horizontal',
  showLabels = true,
  size = 'md',
  className = '',
  ...props
}: StageIndicatorProps) {
  const currentIndex = stages.indexOf(currentStage)
  const isLost = currentStage === 'closed-lost'

  const sizes = {
    sm: {
      dot: 'h-4 w-4',
      check: 'h-2.5 w-2.5',
      connector: variant === 'horizontal' ? 'h-0.5' : 'w-0.5 h-4',
      text: 'text-xs',
    },
    md: {
      dot: 'h-6 w-6',
      check: 'h-3.5 w-3.5',
      connector: variant === 'horizontal' ? 'h-0.5' : 'w-0.5 h-6',
      text: 'text-sm',
    },
    lg: {
      dot: 'h-8 w-8',
      check: 'h-4 w-4',
      connector: variant === 'horizontal' ? 'h-1' : 'w-1 h-8',
      text: 'text-base',
    },
  }

  const sizeStyles = sizes[size]

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 ${className}`} {...props}>
        {stages.map((stage, index) => {
          const isPast = index < currentIndex
          const isCurrent = index === currentIndex
          const isActive = isPast || isCurrent

          return (
            <div
              key={stage}
              className={`
                h-1.5 flex-1 rounded-full
                ${isLost && isCurrent
                  ? 'bg-red-500'
                  : isActive
                    ? 'bg-[#5dcb8a]'
                    : 'bg-gray-200'
                }
              `}
              title={stageLabels[stage]}
            />
          )
        })}
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col ${className}`} {...props}>
        {stages.map((stage, index) => {
          const isPast = index < currentIndex
          const isCurrent = index === currentIndex
          const isLast = index === stages.length - 1

          return (
            <div key={stage} className="flex items-start gap-3">
              {/* Dot and Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    ${sizeStyles.dot} rounded-full flex items-center justify-center
                    ${isLost && isCurrent
                      ? 'bg-red-500'
                      : isPast
                        ? 'bg-[#5dcb8a]'
                        : isCurrent
                          ? 'bg-[#5dcb8a] ring-4 ring-rattle-green-lightest'
                          : 'bg-gray-200'
                    }
                  `}
                >
                  {isPast && <Check className={`${sizeStyles.check} text-white`} />}
                  {isCurrent && !isLost && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`
                      ${sizeStyles.connector} my-1
                      ${isPast ? 'bg-[#5dcb8a]' : 'bg-gray-200'}
                    `}
                  />
                )}
              </div>

              {/* Label */}
              {showLabels && (
                <div className={`pb-4 ${sizeStyles.text}`}>
                  <span
                    className={`
                      font-medium
                      ${isCurrent ? 'text-gray-900' : isPast ? 'text-gray-600' : 'text-gray-400'}
                    `}
                  >
                    {stageLabels[stage]}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal (default)
  return (
    <div className={`flex items-center ${className}`} {...props}>
      {stages.map((stage, index) => {
        const isPast = index < currentIndex
        const isCurrent = index === currentIndex
        const isLast = index === stages.length - 1

        return (
          <div key={stage} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div
                className={`
                  ${sizeStyles.dot} rounded-full flex items-center justify-center
                  ${isLost && isCurrent
                    ? 'bg-red-500'
                    : isPast
                      ? 'bg-[#5dcb8a]'
                      : isCurrent
                        ? 'bg-[#5dcb8a] ring-4 ring-rattle-green-lightest'
                        : 'bg-gray-200'
                  }
                `}
              >
                {isPast && <Check className={`${sizeStyles.check} text-white`} />}
                {isCurrent && !isLost && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>

              {/* Label */}
              {showLabels && (
                <span
                  className={`
                    mt-2 ${sizeStyles.text} text-center
                    ${isCurrent ? 'font-medium text-gray-900' : isPast ? 'text-gray-600' : 'text-gray-400'}
                  `}
                >
                  {stageLabels[stage]}
                </span>
              )}
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className={`
                  flex-1 mx-2 ${sizeStyles.connector}
                  ${isPast ? 'bg-[#5dcb8a]' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
