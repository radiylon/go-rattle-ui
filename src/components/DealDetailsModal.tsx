import { Modal } from './ui/Modal'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Avatar } from './ui/Avatar'
import { ProgressBar } from './ui/ProgressBar'
import type { Deal } from '../data/mockData'
import {
  DollarSign,
  Calendar,
  User,
  Mail,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { formatCurrency, formatDate, formatStageName } from '../utils/formatting'
import { getStageBadgeVariant, getProbabilityVariant } from '../utils/variant-helpers'

interface DealDetailsModalProps {
  deal: Deal | null
  isOpen: boolean
  onClose: () => void
}

export function DealDetailsModal({
  deal,
  isOpen,
  onClose,
}: DealDetailsModalProps) {
  if (!deal) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={deal.name}>
      <div className="bg-gray-50 min-h-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#f5faf7] via-white to-white border-b border-gray-200 px-8 py-6 relative">
          {/* Green accent border */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#5dcb8a]"></div>
          <div className="max-w-7xl mx-auto">
            <div>
              <h1 className="text-3xl font-medium text-gray-900 mb-2">
                {deal.name}
              </h1>
              <p className="text-xl text-gray-600 mb-2">{deal.company}</p>
              <Badge variant={getStageBadgeVariant(deal.stage)}>
                {formatStageName(deal.stage)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Key Metrics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Metrics Card */}
              <Card className="p-6">
                <h1 className="text-2xl font-medium text-gray-900 mb-6">
                  Key Metrics
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-base font-semibold text-gray-700">
                        Deal Value
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(deal.value)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                      <span className="text-base font-semibold text-gray-700">
                        Win Probability
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ProgressBar
                        value={deal.probability}
                        variant={getProbabilityVariant(deal.probability)}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900">
                        {deal.probability}%
                      </span>
                    </div>
                  </div>

                  {deal.expectedCloseDate && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-base font-semibold text-gray-700">
                          Expected Close Date
                        </span>
                      </div>
                      <p className="text-lg font-medium text-gray-900">
                        {formatDate(deal.expectedCloseDate)}
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-base font-semibold text-gray-700">
                        Owner
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar name={deal.owner} size="sm" />
                      <span className="text-lg font-medium text-gray-900">
                        {deal.owner}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              {(deal.contactPerson || deal.contactEmail) && (
                <Card className="p-6">
                  <h1 className="text-2xl font-medium text-gray-900 mb-6">
                    Contact Information
                  </h1>
                  <div className="space-y-4">
                    {deal.contactPerson && (
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-base font-semibold text-gray-700">Contact Person</p>
                          <p className="text-base font-medium text-gray-900">
                            {deal.contactPerson}
                          </p>
                        </div>
                      </div>
                    )}
                    {deal.contactEmail && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-base font-semibold text-gray-700">Email</p>
                          <a
                            href={`mailto:${deal.contactEmail}`}
                            className="text-base font-medium text-[#5dcb8a] hover:underline"
                          >
                            {deal.contactEmail}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Notes */}
              {deal.notes && (
                <Card className="p-6">
                  <h1 className="text-2xl font-medium text-gray-900 mb-4">
                    Notes
                  </h1>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {deal.notes}
                  </p>
                </Card>
              )}

              {/* Next Steps */}
              {deal.nextSteps && deal.nextSteps.length > 0 && (
                <Card className="p-6">
                  <h1 className="text-2xl font-medium text-gray-900 mb-6">
                    Next Steps
                  </h1>
                  <ul className="space-y-3">
                    {deal.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                            {index + 1}
                          </div>
                        </div>
                        <p className="text-base text-gray-700 flex-1">{step}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Recent Activity Timeline */}
              {deal.recentActivity && deal.recentActivity.length > 0 && (
                <Card className="p-6">
                  <h1 className="text-2xl font-medium text-gray-900 mb-6">
                    Recent Activity
                  </h1>
                  <div className="space-y-4">
                    {deal.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            <Clock className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar name={activity.user} size="sm" />
                            <span className="text-sm text-gray-500">
                              {activity.user} • {activity.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Quick Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <h1 className="text-2xl font-medium text-gray-900 mb-4">
                  Quick Info
                </h1>
                <div className="space-y-4">
                  <div>
                    <p className="text-base font-semibold text-gray-700 mb-1">Last Activity</p>
                    <p className="text-base font-medium text-gray-900">
                      {deal.lastActivity}
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-700 mb-1">Deal ID</p>
                    <p className="text-base font-medium text-gray-900 font-mono">
                      {deal.id}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

