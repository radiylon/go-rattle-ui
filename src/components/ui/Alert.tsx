import type { HTMLAttributes, ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'deal-update' | 'at-risk'
  title: string
  description?: string
  onDismiss?: () => void
  actions?: ReactNode
  children?: ReactNode
}

export function Alert({
  variant = 'info',
  title,
  description,
  onDismiss,
  actions,
  className = '',
  children,
  ...props
}: AlertProps) {
  const icons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info,
    'deal-update': CheckCircle2,
    'at-risk': AlertTriangle,
  }

  const variants = {
    success:
      'bg-rattle-green-bg border-rattle-green-lightest text-rattle-green-darkest',
    warning:
      'bg-amber-50 border-amber-200 text-amber-900',
    error:
      'bg-red-50 border-red-200 text-red-900',
    info:
      'bg-blue-50 border-blue-200 text-blue-900',
    'deal-update':
      'bg-rattle-green-bg border-rattle-green-lightest text-rattle-green-darkest',
    'at-risk':
      'bg-red-50 border-red-200 text-red-900',
  }

  const iconColors = {
    success: 'text-[#5dcb8a]',
    warning: 'text-amber-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    'deal-update': 'text-[#5dcb8a]',
    'at-risk': 'text-red-600',
  }

  const Icon = icons[variant]

  return (
    <div
      className={`rounded-lg border p-4 ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${iconColors[variant]} mt-0.5 shrink-0`} />
        <div className="ml-3 flex-1">
          <h4 className="text-base font-semibold alert-title">{title}</h4>
          {description && (
            <p className="mt-1 text-sm opacity-90">{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
          {actions && <div className="mt-3 flex gap-2">{actions}</div>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`ml-4 shrink-0 ${iconColors[variant]} hover:opacity-70 cursor-pointer`}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

