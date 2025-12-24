import type { ReactNode, HTMLAttributes } from 'react'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import {
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  FileText,
  TrendingUp,
  DollarSign,
  UserPlus,
} from 'lucide-react'

export type ActivityType =
  | 'deal-update'
  | 'stage-change'
  | 'note'
  | 'call'
  | 'email'
  | 'meeting'
  | 'task'
  | 'won'
  | 'lost'
  | 'created'

export interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description?: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
  metadata?: Record<string, ReactNode>
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLDivElement> {
  activities: ActivityItem[]
  title?: string
  showTimeline?: boolean
  variant?: 'default' | 'compact' | 'detailed'
  maxItems?: number
  emptyMessage?: string
}

const activityIcons: Record<ActivityType, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  'deal-update': { icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
  'stage-change': { icon: TrendingUp, color: 'text-[#5dcb8a]', bg: 'bg-rattle-green-lightest' },
  'note': { icon: MessageSquare, color: 'text-gray-500', bg: 'bg-gray-100' },
  'call': { icon: Phone, color: 'text-purple-500', bg: 'bg-purple-50' },
  'email': { icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50' },
  'meeting': { icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-50' },
  'task': { icon: FileText, color: 'text-gray-500', bg: 'bg-gray-100' },
  'won': { icon: DollarSign, color: 'text-[#5dcb8a]', bg: 'bg-rattle-green-lightest' },
  'lost': { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  'created': { icon: UserPlus, color: 'text-[#5dcb8a]', bg: 'bg-rattle-green-lightest' },
}

export function ActivityFeed({
  activities,
  title,
  showTimeline = true,
  variant = 'default',
  maxItems,
  emptyMessage = 'No recent activity',
  className = '',
  ...props
}: ActivityFeedProps) {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities

  if (displayActivities.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`} {...props}>
        {emptyMessage}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={className} {...props}>
        {title && (
          <h4 className="font-medium text-gray-900 mb-3">{title}</h4>
        )}
        <div className="space-y-2">
          {displayActivities.map((activity) => {
            const { icon: Icon, color } = activityIcons[activity.type]
            return (
              <div key={activity.id} className="flex items-center gap-3 py-2">
                <Icon className={`h-4 w-4 flex-shrink-0 ${color}`} />
                <span className="flex-1 text-sm text-gray-600 truncate">
                  {activity.title}
                </span>
                <span className="text-xs text-gray-400">{activity.timestamp}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={className} {...props}>
        {title && (
          <h4 className="font-medium text-gray-900 mb-4">{title}</h4>
        )}
        <div className="space-y-4">
          {displayActivities.map((activity) => {
            const { icon: Icon, color, bg } = activityIcons[activity.type]
            return (
              <div
                key={activity.id}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${bg}`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium text-gray-900">{activity.title}</div>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {activity.timestamp}
                      </span>
                    </div>
                    {activity.description && (
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    )}
                    {activity.user && (
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar name={activity.user.name} src={activity.user.avatar} size="sm" />
                        <span className="text-sm text-gray-500">{activity.user.name}</span>
                      </div>
                    )}
                    {activity.metadata && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(activity.metadata).map(([key, value]) => (
                          <Badge key={key} variant="default" size="sm">
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Default variant with timeline
  return (
    <div className={className} {...props}>
      {title && (
        <h4 className="font-medium text-gray-900 mb-4">{title}</h4>
      )}
      <div className="relative">
        {/* Timeline line */}
        {showTimeline && (
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        )}

        <div className="space-y-4">
          {displayActivities.map((activity, index) => {
            const { icon: Icon, color, bg } = activityIcons[activity.type]
            const isLast = index === displayActivities.length - 1

            return (
              <div key={activity.id} className="relative flex gap-4">
                {/* Icon */}
                <div className={`relative z-10 p-2 rounded-full ${bg} ring-4 ring-white`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>

                {/* Content */}
                <div className={`flex-1 min-w-0 ${!isLast ? 'pb-4' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-gray-900">{activity.title}</div>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {activity.timestamp}
                    </span>
                  </div>
                  {activity.user && (
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar name={activity.user.name} src={activity.user.avatar} size="sm" />
                      <span className="text-sm text-gray-500">{activity.user.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
