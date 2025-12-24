import type { HTMLAttributes } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
  size?: 'sm' | 'md'
}

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  showFirstLast = true,
  siblingCount = 1,
  size = 'md',
  className = '',
  ...props
}: PaginationProps) {
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const leftSibling = Math.max(2, currentPage - siblingCount)
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount)

    // Add ellipsis after first page if needed
    if (leftSibling > 2) {
      pages.push('ellipsis-start')
    }

    // Add pages around current
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    // Add ellipsis before last page if needed
    if (rightSibling < totalPages - 1) {
      pages.push('ellipsis-end')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const sizes = {
    sm: {
      button: 'h-8 min-w-8 px-2 text-sm',
      icon: 'h-4 w-4',
    },
    md: {
      button: 'h-10 min-w-10 px-3 text-sm',
      icon: 'h-5 w-5',
    },
  }

  const sizeStyles = sizes[size]

  const baseButtonClass = `
    inline-flex items-center justify-center font-medium rounded-lg
    border border-gray-300 bg-white text-gray-700
    hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors
    ${sizeStyles.button}
  `

  const activeButtonClass = `
    inline-flex items-center justify-center font-medium rounded-lg
    bg-[#5dcb8a] text-black border-[#5dcb8a]
    ${sizeStyles.button}
  `

  if (totalPages <= 1) return null

  return (
    <nav
      className={`flex items-center gap-1 ${className}`}
      role="navigation"
      aria-label="Pagination"
      {...props}
    >
      {/* First page */}
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onChange(1)}
          disabled={currentPage === 1}
          className={baseButtonClass}
          aria-label="Go to first page"
        >
          <ChevronsLeft className={sizeStyles.icon} />
        </button>
      )}

      {/* Previous page */}
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={baseButtonClass}
        aria-label="Go to previous page"
      >
        <ChevronLeft className={sizeStyles.icon} />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <span
              key={page}
              className={`${sizeStyles.button} flex items-center justify-center text-gray-400`}
            >
              ...
            </span>
          )
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(page)}
            className={page === currentPage ? activeButtonClass : baseButtonClass}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* Next page */}
      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={baseButtonClass}
        aria-label="Go to next page"
      >
        <ChevronRight className={sizeStyles.icon} />
      </button>

      {/* Last page */}
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onChange(totalPages)}
          disabled={currentPage === totalPages}
          className={baseButtonClass}
          aria-label="Go to last page"
        >
          <ChevronsRight className={sizeStyles.icon} />
        </button>
      )}
    </nav>
  )
}

// Simple pagination info
export interface PaginationInfoProps extends HTMLAttributes<HTMLDivElement> {
  currentPage: number
  pageSize: number
  totalItems: number
}

export function PaginationInfo({
  currentPage,
  pageSize,
  totalItems,
  className = '',
  ...props
}: PaginationInfoProps) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className={`text-sm text-gray-500 ${className}`} {...props}>
      Showing <span className="font-medium text-gray-700">{start}</span> to{' '}
      <span className="font-medium text-gray-700">{end}</span> of{' '}
      <span className="font-medium text-gray-700">{totalItems}</span> results
    </div>
  )
}
