import { Link, useLocation } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, X, LayoutGrid } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
              <Link to="/" className="ml-2 lg:ml-0">
                <div className="flex items-center">
                  <img
                    src="/rattle-logo.svg"
                    alt="Rattle"
                    className="h-6"
                  />
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg font-medium ${
                  location.pathname === '/dashboard'
                    ? 'bg-rattle-green-bg text-rattle-green-darkest'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/components"
                className={`px-4 py-2 rounded-lg font-medium ${
                  location.pathname === '/components'
                    ? 'bg-rattle-green-bg text-rattle-green-darkest'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Components
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 shadow-2xl z-50 transform flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
            <img
              src="/rattle-logo.svg"
              alt="Rattle"
              className="h-6"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-lg mb-2 ${
              location.pathname === '/dashboard'
                ? 'bg-rattle-green-bg text-rattle-green-darkest'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/components"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === '/components'
                ? 'bg-rattle-green-bg text-rattle-green-darkest'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid size={20} />
            <span className="font-medium">Components</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
