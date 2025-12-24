import { useState, useRef, useEffect, useId } from 'react'
import { ChevronDown } from 'lucide-react'

export interface SelectProps {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string }>
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  placeholder?: string
}

export function Select({
  label,
  error,
  helperText,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  className = '',
  id,
  name,
  placeholder = 'Select an option',
}: SelectProps) {
  const selectId = id || useId()
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && listboxRef.current && focusedIndex >= 0) {
      const options = listboxRef.current.querySelectorAll('li')
      if (options[focusedIndex]) {
        options[focusedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        })
      }
    }
  }, [focusedIndex, isOpen])

  const handleSelect = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue)
    }
    onChange?.(optionValue)
    setIsOpen(false)
    setFocusedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value)
        } else {
          setIsOpen(true)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        break
      case 'Tab':
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          id={`${selectId}-label`}
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative" ref={containerRef}>
        <button
          id={selectId}
          type="button"
          name={name}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5dcb8a] focus:border-transparent bg-white text-left flex items-center justify-between ${
            error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 shrink-0 ml-2 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <ul
            ref={listboxRef}
            role="listbox"
            aria-labelledby={label ? `${selectId}-label` : undefined}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer ${
                  option.value === value
                    ? 'bg-rattle-green-bg text-rattle-green-darkest font-medium'
                    : 'text-gray-900 hover:bg-gray-50'
                } ${
                  index === focusedIndex ? 'bg-gray-50' : ''
                }`}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {name && (
          <input
            type="hidden"
            name={name}
            value={value || ''}
            readOnly
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

