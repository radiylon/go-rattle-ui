import type { HTMLAttributes } from 'react'
import { Badge } from './Badge'
import { Avatar } from './Avatar'
import { ProgressBar } from './ProgressBar'
import { TrendIndicator } from './TrendIndicator'
import { Calendar, DollarSign, User, Building2, Clock } from 'lucide-react'
import type { DealStage } from '../../types'

export interface DealCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  company: string
  value: number
  stage: DealStage
  probability: number
  owner: string
  closeDate?: string
  lastActivity?: string
  trend?: number
  compact?: boolean
  onClick?: () => void
}

const stageVariants: Record<DealStage, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  'prospecting': 'default',
  'qualification': 'info',
  'proposal': 'warning',
  'negotiation': 'warning',
  'closed-won': 'success',
  'closed-lost': 'error',
}

const stageLabels: Record<DealStage, string> = {
  'prospecting': 'Prospecting',
  'qualification': 'Qualification',
  'proposal': 'Proposal',
  'negotiation': 'Negotiation',
  'closed-won': 'Closed Won',
  'closed-lost': 'Closed Lost',
}

const probabilityVariant = (prob: number): 'success' | 'warning' | 'error' | 'default' => {
  if (prob >= 70) return 'success'
  if (prob >= 40) return 'warning'
  if (prob >= 20) return 'error'
  return 'default'
}

export function DealCard({
  name,
  company,
  value,
  stage,
  probability,
  owner,
  closeDate,
  lastActivity,
  trend,
  compact = false,
  onClick,
  className = '',
  ...props
}: DealCardProps) {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

  if (compact) {
    return (
      <div
        className={`
          bg-white rounded-lg border border-gray-200 p-4
          ${onClick ? 'cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all' : ''}
          ${className}
        `}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-gray-900 truncate">{name}</h4>
            <p className="text-sm text-gray-500 truncate">{company}</p>
          </div>
          <Badge variant={stageVariants[stage]} size="sm">
            {stageLabels[stage]}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(value)}
          </span>
          <div className="flex items-center gap-2">
            <ProgressBar
              value={probability}
              variant={probabilityVariant(probability)}
              className="w-16"
            />
            <span className="text-sm text-gray-600">{probability}%</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      {...props}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 truncate">{name}</h3>
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <Building2 className="h-3.5 w-3.5" />
              <span className="truncate">{company}</span>
            </div>
          </div>
          <Badge variant={stageVariants[stage]}>
            {stageLabels[stage]}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* Value Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(value)}
            </span>
          </div>
          {trend !== undefined && (
            <TrendIndicator value={trend} size="md" />
          )}
        </div>

        {/* Probability */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-gray-600">Win Probability</span>
            <span className="text-sm font-medium text-gray-900">{probability}%</span>
          </div>
          <ProgressBar value={probability} variant={probabilityVariant(probability)} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <User className="h-4 w-4" />
            <span className="truncate">{owner}</span>
          </div>
          {closeDate && (
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{closeDate}</span>
            </div>
          )}
          {lastActivity && (
            <div className="flex items-center gap-2 text-gray-500 col-span-2">
              <Clock className="h-4 w-4" />
              <span>{lastActivity}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Owner Avatar */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Avatar name={owner} size="sm" />
          <span className="text-sm text-gray-600">{owner}</span>
        </div>
      </div>
    </div>
  )
}
