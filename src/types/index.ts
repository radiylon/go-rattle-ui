// Shared type definitions

export type DealStage =
  | 'prospecting'
  | 'qualification'
  | 'proposal'
  | 'negotiation'
  | 'closed-won'
  | 'closed-lost'

export type AlertType =
  | 'deal-update'
  | 'at-risk'
  | 'data-quality'
  | 'renewal'
  | 'closed-won'

export type AlertVariant = 'success' | 'warning' | 'error' | 'info' | 'deal-update' | 'at-risk'

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default'

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error'

