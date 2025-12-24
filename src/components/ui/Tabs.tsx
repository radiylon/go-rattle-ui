import { useState, createContext, useContext, type ReactNode, type HTMLAttributes } from 'react'

// Context for tab state
interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

// Tabs Root
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  children: ReactNode
}

export function Tabs({
  defaultValue,
  value,
  onChange,
  children,
  className = '',
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  const activeTab = value ?? internalValue
  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// Tab List
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'underline' | 'pills' | 'enclosed'
}

export function TabList({
  children,
  variant = 'underline',
  className = '',
  ...props
}: TabListProps) {
  const variants = {
    underline: 'border-b border-gray-200',
    pills: 'bg-gray-100 p-1 rounded-lg',
    enclosed: 'border-b border-gray-200',
  }

  return (
    <div
      className={`flex gap-1 ${variants[variant]} ${className}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
}

// Tab Trigger
export interface TabTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  disabled?: boolean
  children: ReactNode
  variant?: 'underline' | 'pills' | 'enclosed'
}

export function TabTrigger({
  value,
  disabled = false,
  children,
  variant = 'underline',
  className = '',
  ...props
}: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === value

  const variants = {
    underline: `
      px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors
      ${isActive
        ? 'border-[#5dcb8a] text-[#5dcb8a]'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }
    `,
    pills: `
      px-4 py-2 text-sm font-medium rounded-md transition-colors
      ${isActive
        ? 'bg-white text-gray-900 shadow-sm'
        : 'text-gray-500 hover:text-gray-700'
      }
    `,
    enclosed: `
      px-4 py-2 text-sm font-medium border border-transparent rounded-t-lg -mb-px transition-colors
      ${isActive
        ? 'bg-white border-gray-200 border-b-white text-gray-900'
        : 'text-gray-500 hover:text-gray-700'
      }
    `,
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={`
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// Tab Content
export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  children: ReactNode
}

export function TabContent({
  value,
  children,
  className = '',
  ...props
}: TabContentProps) {
  const { activeTab } = useTabsContext()

  if (activeTab !== value) return null

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      className={`pt-4 w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
