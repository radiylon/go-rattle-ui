import type { HTMLAttributes } from 'react'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray'
  label?: string
}

export function Spinner({
  size = 'md',
  color = 'primary',
  label = 'Loading',
  className = '',
  ...props
}: SpinnerProps) {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }

  const colors = {
    primary: 'text-[#5dcb8a]',
    white: 'text-white',
    gray: 'text-gray-400',
  }

  const borderWidths = {
    xs: 'border',
    sm: 'border-2',
    md: 'border-2',
    lg: 'border-[3px]',
    xl: 'border-4',
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-label={label}
      {...props}
    >
      <div
        className={`
          ${sizes[size]} ${colors[color]} ${borderWidths[size]}
          border-current border-t-transparent
          rounded-full animate-spin
        `}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Loading Overlay
export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  label?: string
  blur?: boolean
  children?: React.ReactNode
}

export function LoadingOverlay({
  isLoading,
  label = 'Loading...',
  blur = true,
  children,
  className = '',
  ...props
}: LoadingOverlayProps) {
  if (!isLoading) {
    return <>{children}</>
  }

  return (
    <div className={`relative ${className}`} {...props}>
      {children}
      <div
        className={`
          absolute inset-0 flex flex-col items-center justify-center
          bg-white/80 z-10
          ${blur ? 'backdrop-blur-sm' : ''}
        `}
      >
        <Spinner size="lg" />
        {label && (
          <p className="mt-3 text-sm text-gray-600">{label}</p>
        )}
      </div>
    </div>
  )
}

// Full Page Loading
export interface FullPageLoaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
}

export function FullPageLoader({
  label = 'Loading...',
  className = '',
  ...props
}: FullPageLoaderProps) {
  return (
    <div
      className={`
        fixed inset-0 flex flex-col items-center justify-center
        bg-white z-50
        ${className}
      `}
      {...props}
    >
      <Spinner size="xl" />
      {label && (
        <p className="mt-4 text-gray-600">{label}</p>
      )}
    </div>
  )
}

// Inline Loading
export interface InlineLoaderProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md'
  label?: string
}

export function InlineLoader({
  size = 'sm',
  label,
  className = '',
  ...props
}: InlineLoaderProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-gray-500 ${className}`}
      {...props}
    >
      <Spinner size={size} color="gray" />
      {label && <span className="text-sm">{label}</span>}
    </span>
  )
}
