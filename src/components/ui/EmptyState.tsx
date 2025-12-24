import type { ReactNode, HTMLAttributes } from 'react'
import { Inbox, Search, FileX, AlertCircle, FolderOpen } from 'lucide-react'

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'search' | 'error' | 'no-data' | 'no-results'
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const defaultIcons = {
  default: Inbox,
  search: Search,
  error: AlertCircle,
  'no-data': FolderOpen,
  'no-results': FileX,
}

export function EmptyState({
  variant = 'default',
  icon,
  title,
  description,
  action,
  size = 'md',
  className = '',
  ...props
}: EmptyStateProps) {
  const DefaultIcon = defaultIcons[variant]

  const sizes = {
    sm: {
      container: 'py-8',
      icon: 'h-10 w-10',
      title: 'text-base',
      description: 'text-sm',
    },
    md: {
      container: 'py-12',
      icon: 'h-12 w-12',
      title: 'text-lg',
      description: 'text-sm',
    },
    lg: {
      container: 'py-16',
      icon: 'h-16 w-16',
      title: 'text-xl',
      description: 'text-base',
    },
  }

  const sizeStyles = sizes[size]

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${sizeStyles.container} ${className}`}
      {...props}
    >
      <div className="mb-4 text-gray-400">
        {icon || <DefaultIcon className={sizeStyles.icon} />}
      </div>
      <h3 className={`font-medium text-gray-900 mb-1 ${sizeStyles.title}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-gray-500 max-w-sm mb-4 ${sizeStyles.description}`}>
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
