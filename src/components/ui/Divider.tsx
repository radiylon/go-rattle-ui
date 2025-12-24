import type { ReactNode, HTMLAttributes } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  label?: ReactNode
  labelPosition?: 'left' | 'center' | 'right'
}

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  labelPosition = 'center',
  className = '',
  ...props
}: DividerProps) {
  const variants = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  }

  if (orientation === 'vertical') {
    return (
      <div
        className={`inline-block h-full border-l border-gray-200 ${variants[variant]} ${className}`}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    )
  }

  if (!label) {
    return (
      <hr
        className={`border-t border-gray-200 ${variants[variant]} ${className}`}
        role="separator"
        {...props}
      />
    )
  }

  const labelPositions = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <div
      className={`flex items-center ${labelPositions[labelPosition]} ${className}`}
      role="separator"
      {...props}
    >
      {labelPosition !== 'left' && (
        <div className={`flex-1 border-t border-gray-200 ${variants[variant]}`} />
      )}
      <span className="px-3 text-sm text-gray-500">{label}</span>
      {labelPosition !== 'right' && (
        <div className={`flex-1 border-t border-gray-200 ${variants[variant]}`} />
      )}
    </div>
  )
}
