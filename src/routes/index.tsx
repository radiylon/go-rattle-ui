import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The AI layer your CRM
            <br />
            always needed
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Rattle Agents keep your CRM updated, send real-time alerts in Slack, and surface the aggregated insights your leaders need.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center font-medium rounded-full bg-[#5dcb8a] text-black border-2 border-[#5dcb8a] hover:bg-[#6dd49a] hover:border-[#6dd49a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5dcb8a] px-7 py-3 text-lg min-w-[10.5rem] transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
