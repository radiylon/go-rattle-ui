import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'

// Toast Types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Context for toast management
interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Toast Provider
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

// Toast Container
interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

function ToastContainer({
  toasts,
  onRemove,
  position = 'bottom-right',
}: ToastContainerProps) {
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  }

  if (toasts.length === 0) return null

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 ${positions[position]}`}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

// Individual Toast
interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { id, type, title, description, duration = 5000, action } = toast

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onRemove(id), duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onRemove])

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const styles = {
    success: 'bg-white border-l-4 border-l-[#5dcb8a]',
    error: 'bg-white border-l-4 border-l-red-500',
    warning: 'bg-white border-l-4 border-l-amber-500',
    info: 'bg-white border-l-4 border-l-blue-500',
  }

  const iconColors = {
    success: 'text-[#5dcb8a]',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  }

  const Icon = icons[type]

  return (
    <div
      className={`
        ${styles[type]}
        min-w-[320px] max-w-md p-4 rounded-lg shadow-lg
        border border-gray-200
        animate-in slide-in-from-right-full fade-in-0
      `}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 flex-shrink-0 ${iconColors[type]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium text-[#5dcb8a] hover:text-[#4ba370]"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onRemove(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-500"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

// Standalone Toast component for manual usage
export interface ToastComponentProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  onDismiss?: () => void
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function ToastComponent({
  type = 'info',
  title,
  description,
  onDismiss,
  action,
  className = '',
}: ToastComponentProps) {
  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const styles = {
    success: 'bg-white border-l-4 border-l-[#5dcb8a]',
    error: 'bg-white border-l-4 border-l-red-500',
    warning: 'bg-white border-l-4 border-l-amber-500',
    info: 'bg-white border-l-4 border-l-blue-500',
  }

  const iconColors = {
    success: 'text-[#5dcb8a]',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  }

  const Icon = icons[type]

  return (
    <div
      className={`
        ${styles[type]}
        min-w-[320px] max-w-md p-4 rounded-lg shadow-lg
        border border-gray-200 ${className}
      `}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 flex-shrink-0 ${iconColors[type]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium text-[#5dcb8a] hover:text-[#4ba370]"
            >
              {action.label}
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-500"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
