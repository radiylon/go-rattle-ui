import { useState, useCallback, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  Metric,
  Alert,
  Badge,
  Button,
  ProgressBar,
  Avatar,
} from '../components/ui'
import { DealDetailsModal } from '../components/DealDetailsModal'
import { mockMetrics, mockAlerts, mockDeals, pipelineStats, type Deal } from '../data/mockData'
import {
  Users,
  DollarSign,
  Clock,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import { formatCurrency, formatStageName } from '../utils/formatting'
import { getAlertVariant, getStageBadgeVariant, getProbabilityVariant } from '../utils/variant-helpers'

// Icon mapping for metrics - moved outside component for performance
const METRIC_ICONS = [
  Users,
  DollarSign,
  AlertTriangle,
  Clock,
] as const

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const [visibleAlerts, setVisibleAlerts] = useState(mockAlerts)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDismiss = useCallback((alertId: string) => {
    setVisibleAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }, [])

  const handleViewDeal = useCallback((deal: Deal) => {
    setSelectedDeal(deal)
    setIsModalOpen(true)
  }, [])

  const handleViewDealFromAlert = useCallback((dealName: string) => {
    const deal = mockDeals.find((d) => d.name === dealName)
    if (deal) {
      handleViewDeal(deal)
    }
  }, [handleViewDeal])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedDeal(null)
  }, [])

  // Memoize metrics with icons to avoid recalculation
  const metricsWithIcons = useMemo(() => {
    return mockMetrics.map((metric, index) => {
      const IconComponent = METRIC_ICONS[index]
      return {
        ...metric,
        icon: IconComponent ? <IconComponent className="h-6 w-6" /> : null,
        gradient: true, // Enable gradient styling based on trend
      }
    })
  }, [])

  // Calculate total pipeline once
  const totalPipeline = useMemo(() => {
    return Object.values(pipelineStats).reduce((a, b) => a + b, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Revenue Dashboard
          </h1>
          <p className="text-gray-600">
            Keep every deal on track with real-time alerts and insights
          </p>
        </div>

        {/* Hero Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsWithIcons.map((metric, index) => (
            <Metric
              key={index}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
              description={metric.description}
              icon={metric.icon}
              gradient={metric.gradient}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Real-time Alert Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium text-gray-900">
                Real-time Alerts
              </h2>
              <a
                href="#"
                className="inline-flex items-center text-gray-700 border-b border-transparent hover:border-gray-700"
              >
                <span>View All</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4">
              {visibleAlerts.map((alert) => {
                const alertVariant = getAlertVariant(alert.type)
                const isRiskOrError = alertVariant === 'at-risk' || alertVariant === 'error'
                
                return (
                  <Alert
                    key={alert.id}
                    variant={alertVariant}
                    title={alert.title}
                    description={alert.description}
                    onDismiss={() => handleDismiss(alert.id)}
                    actions={
                      alert.priority === 'high' ? (
                        <>
                          <Button 
                            size="sm" 
                            variant={isRiskOrError ? 'danger' : 'primary'}
                            onClick={() => alert.dealName && handleViewDealFromAlert(alert.dealName)}
                          >
                            Take Action
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => handleDismiss(alert.id)}>
                            Dismiss
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => alert.dealName && handleViewDealFromAlert(alert.dealName)}
                        >
                          View Deal
                        </Button>
                      )
                    }
                  />
                )
              })}
            </div>
          </div>

          {/* Deal Pipeline Widget */}
          <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
              Deal Pipeline
            </h2>
            <Card className="p-6">
              <div className="space-y-6">
                {Object.entries(pipelineStats).map(([stage, count]) => (
                  <div key={stage}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {formatStageName(stage)}
                      </span>
                      <Badge variant={getStageBadgeVariant(stage)}>
                        {count}
                      </Badge>
                    </div>
                    <ProgressBar
                      value={(count / totalPipeline) * 100}
                      variant={
                        stage === 'closed-won'
                          ? 'success'
                          : stage === 'closed-lost'
                            ? 'error'
                            : 'default'
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Total Pipeline
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {totalPipeline}
                  </span>
                </div>
              </div>
            </Card>

            {/* Recent Activity Timeline */}
            <div className="mt-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">
                Recent Activity
              </h2>
              <Card className="p-6">
                <div className="space-y-4">
                  {mockDeals.slice(0, 5).map((deal) => (
                    <div
                      key={deal.id}
                      className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <Avatar name={deal.owner} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 font-medium truncate">
                          {deal.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {deal.company} • {deal.lastActivity}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={getStageBadgeVariant(deal.stage)}
                            size="sm"
                          >
                            {formatStageName(deal.stage)}
                          </Badge>
                          <span className="text-xs text-gray-600">
                            {formatCurrency(deal.value)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Top Deals Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">Top Deals</h2>
          <Card>
            <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
              <table className="w-full" role="table" aria-label="Top deals table">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Deal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Probability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Owner
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockDeals.map((deal) => (
                    <tr
                      key={deal.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      role="row"
                      onClick={() => handleViewDeal(deal)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {deal.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {deal.company}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(deal.value)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStageBadgeVariant(deal.stage)}>
                          {formatStageName(deal.stage)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProgressBar
                            value={deal.probability}
                            variant={getProbabilityVariant(deal.probability)}
                            className="w-24"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {deal.probability}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar name={deal.owner} size="sm" />
                          <span className="ml-2 text-sm text-gray-600">
                            {deal.owner}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Deal Details Modal */}
      <DealDetailsModal
        deal={selectedDeal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

