// Mock data for Rattle demo dashboard

export interface Deal {
  id: string
  name: string
  company: string
  value: number
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  probability: number
  owner: string
  lastActivity: string
  expectedCloseDate?: string
  contactPerson?: string
  contactEmail?: string
  notes?: string
  nextSteps?: string[]
  recentActivity?: Array<{
    action: string
    timestamp: string
    user: string
  }>
}

export interface Alert {
  id: string
  type: 'deal-update' | 'at-risk' | 'data-quality' | 'renewal' | 'closed-won'
  title: string
  description: string
  dealName?: string
  timestamp: string
  priority: 'high' | 'medium' | 'low'
}

export interface Metric {
  label: string
  value: string | number
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  description?: string
}

export const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise License',
    company: 'Acme Corp',
    value: 125000,
    stage: 'negotiation',
    probability: 75,
    owner: 'Sarah Johnson',
    lastActivity: '2 hours ago',
    expectedCloseDate: '2024-02-15',
    contactPerson: 'John Smith',
    contactEmail: 'john.smith@acmecorp.com',
    notes: 'Client is interested in enterprise features and has budget approved. Currently reviewing pricing options and contract terms. Decision maker is the CTO who is very engaged.',
    nextSteps: [
      'Schedule follow-up call to discuss contract terms',
      'Send updated pricing proposal',
      'Arrange technical demo for their engineering team',
    ],
    recentActivity: [
      {
        action: 'Deal moved to Negotiation stage',
        timestamp: '2 hours ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Contract terms discussed in call',
        timestamp: '1 day ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Initial proposal sent',
        timestamp: '3 days ago',
        user: 'Sarah Johnson',
      },
    ],
  },
  {
    id: '2',
    name: 'Annual Subscription',
    company: 'TechStart Inc',
    value: 45000,
    stage: 'proposal',
    probability: 60,
    owner: 'Mike Chen',
    lastActivity: '5 hours ago',
    expectedCloseDate: '2024-02-20',
    contactPerson: 'Lisa Wang',
    contactEmail: 'lisa.wang@techstart.com',
    notes: 'Fast-growing startup looking to scale. They need a solution that can grow with them. Currently evaluating multiple vendors.',
    nextSteps: [
      'Follow up on proposal questions',
      'Provide customer references',
      'Schedule product walkthrough',
    ],
    recentActivity: [
      {
        action: 'Proposal sent to client',
        timestamp: '5 hours ago',
        user: 'Mike Chen',
      },
      {
        action: 'Discovery call completed',
        timestamp: '2 days ago',
        user: 'Mike Chen',
      },
      {
        action: 'Deal created',
        timestamp: '1 week ago',
        user: 'Mike Chen',
      },
    ],
  },
  {
    id: '3',
    name: 'Multi-Year Contract',
    company: 'Global Solutions',
    value: 250000,
    stage: 'closed-won',
    probability: 100,
    owner: 'Emily Rodriguez',
    lastActivity: '1 day ago',
    expectedCloseDate: '2024-01-30',
    contactPerson: 'Robert Martinez',
    contactEmail: 'robert.martinez@globalsolutions.com',
    notes: 'Successfully closed! Multi-year enterprise contract signed. Client is very happy with the solution and implementation timeline.',
    nextSteps: [
      'Schedule kickoff meeting',
      'Assign customer success manager',
      'Begin onboarding process',
    ],
    recentActivity: [
      {
        action: 'Deal closed - Contract signed',
        timestamp: '1 day ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Final contract review completed',
        timestamp: '3 days ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Legal approval received',
        timestamp: '5 days ago',
        user: 'Emily Rodriguez',
      },
    ],
  },
  {
    id: '4',
    name: 'Starter Package',
    company: 'StartupXYZ',
    value: 15000,
    stage: 'qualification',
    probability: 40,
    owner: 'David Kim',
    lastActivity: '3 hours ago',
    expectedCloseDate: '2024-02-25',
    contactPerson: 'Alex Johnson',
    contactEmail: 'alex@startupxyz.io',
    notes: 'Early-stage startup with limited budget. They are evaluating if our solution fits their needs. Need to demonstrate clear ROI.',
    nextSteps: [
      'Send ROI calculator',
      'Provide case studies from similar startups',
      'Schedule demo focused on their use case',
    ],
    recentActivity: [
      {
        action: 'Qualification call completed',
        timestamp: '3 hours ago',
        user: 'David Kim',
      },
      {
        action: 'Initial discovery questions answered',
        timestamp: '2 days ago',
        user: 'David Kim',
      },
      {
        action: 'Lead qualified and deal created',
        timestamp: '1 week ago',
        user: 'David Kim',
      },
    ],
  },
  {
    id: '5',
    name: 'Enterprise Plus',
    company: 'MegaCorp',
    value: 300000,
    stage: 'negotiation',
    probability: 85,
    owner: 'Sarah Johnson',
    lastActivity: '30 minutes ago',
    expectedCloseDate: '2024-02-10',
    contactPerson: 'Jennifer Davis',
    contactEmail: 'jennifer.davis@megacorp.com',
    notes: 'Large enterprise deal with multiple stakeholders. Procurement process is underway. High probability of closing. All technical requirements met.',
    nextSteps: [
      'Finalize contract terms with legal',
      'Complete security review documentation',
      'Schedule executive alignment call',
    ],
    recentActivity: [
      {
        action: 'Contract terms updated',
        timestamp: '30 minutes ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Security review passed',
        timestamp: '1 day ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Technical requirements approved',
        timestamp: '3 days ago',
        user: 'Sarah Johnson',
      },
    ],
  },
  {
    id: '6',
    name: 'Basic Plan',
    company: 'SmallBiz Co',
    value: 8000,
    stage: 'prospecting',
    probability: 25,
    owner: 'Mike Chen',
    lastActivity: '1 day ago',
    expectedCloseDate: '2024-03-01',
    contactPerson: 'Tom Wilson',
    contactEmail: 'tom@smallbizco.com',
    notes: 'Small business owner exploring options. Still in early stages of evaluation. Need to nurture and provide value before they are ready to commit.',
    nextSteps: [
      'Send educational resources',
      'Schedule follow-up in 2 weeks',
      'Add to nurture email sequence',
    ],
    recentActivity: [
      {
        action: 'Initial contact made',
        timestamp: '1 day ago',
        user: 'Mike Chen',
      },
      {
        action: 'Lead added to CRM',
        timestamp: '3 days ago',
        user: 'Mike Chen',
      },
    ],
  },
  {
    id: '7',
    name: 'Professional Suite',
    company: 'DataFlow Systems',
    value: 95000,
    stage: 'proposal',
    probability: 70,
    owner: 'Emily Rodriguez',
    lastActivity: '4 hours ago',
    expectedCloseDate: '2024-02-18',
    contactPerson: 'Michael Brown',
    contactEmail: 'michael.brown@dataflow.com',
    notes: 'Mid-market company looking to modernize their data infrastructure. Strong technical fit and budget confirmed. Decision timeline is aggressive.',
    nextSteps: [
      'Send technical architecture proposal',
      'Schedule security review meeting',
      'Provide implementation timeline',
    ],
    recentActivity: [
      {
        action: 'Proposal submitted',
        timestamp: '4 hours ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Technical requirements confirmed',
        timestamp: '2 days ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Budget approved by CFO',
        timestamp: '5 days ago',
        user: 'Emily Rodriguez',
      },
    ],
  },
  {
    id: '8',
    name: 'Enterprise Expansion',
    company: 'CloudVantage',
    value: 180000,
    stage: 'negotiation',
    probability: 80,
    owner: 'Sarah Johnson',
    lastActivity: '1 hour ago',
    expectedCloseDate: '2024-02-12',
    contactPerson: 'Patricia Lee',
    contactEmail: 'patricia.lee@cloudvantage.io',
    notes: 'Existing customer looking to expand their usage. High renewal probability. Upsell opportunity for additional modules.',
    nextSteps: [
      'Finalize expansion contract terms',
      'Schedule onboarding for new modules',
      'Coordinate with customer success team',
    ],
    recentActivity: [
      {
        action: 'Contract terms discussed',
        timestamp: '1 hour ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Expansion proposal sent',
        timestamp: '1 day ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Usage analysis completed',
        timestamp: '3 days ago',
        user: 'Sarah Johnson',
      },
    ],
  },
  {
    id: '9',
    name: 'Starter Plus',
    company: 'InnovateLabs',
    value: 22000,
    stage: 'qualification',
    probability: 50,
    owner: 'David Kim',
    lastActivity: '6 hours ago',
    expectedCloseDate: '2024-02-28',
    contactPerson: 'Rachel Green',
    contactEmail: 'rachel@innovatelabs.com',
    notes: 'Tech startup in growth phase. They need a solution that scales with their team. Currently evaluating pricing options.',
    nextSteps: [
      'Schedule product demo',
      'Provide pricing comparison',
      'Connect with similar customer references',
    ],
    recentActivity: [
      {
        action: 'Qualification questionnaire completed',
        timestamp: '6 hours ago',
        user: 'David Kim',
      },
      {
        action: 'Initial discovery call',
        timestamp: '2 days ago',
        user: 'David Kim',
      },
      {
        action: 'Lead qualified',
        timestamp: '1 week ago',
        user: 'David Kim',
      },
    ],
  },
  {
    id: '10',
    name: 'Premium Package',
    company: 'FinanceHub',
    value: 65000,
    stage: 'proposal',
    probability: 65,
    owner: 'Mike Chen',
    lastActivity: '3 hours ago',
    expectedCloseDate: '2024-02-22',
    contactPerson: 'James Taylor',
    contactEmail: 'james.taylor@financehub.com',
    notes: 'Financial services company requiring compliance features. They have specific regulatory requirements that need to be addressed.',
    nextSteps: [
      'Provide compliance documentation',
      'Schedule security assessment',
      'Address regulatory questions',
    ],
    recentActivity: [
      {
        action: 'Proposal sent with compliance details',
        timestamp: '3 hours ago',
        user: 'Mike Chen',
      },
      {
        action: 'Compliance requirements documented',
        timestamp: '1 day ago',
        user: 'Mike Chen',
      },
      {
        action: 'Initial meeting completed',
        timestamp: '4 days ago',
        user: 'Mike Chen',
      },
    ],
  },
  {
    id: '11',
    name: 'Multi-Site License',
    company: 'RetailMax',
    value: 145000,
    stage: 'negotiation',
    probability: 78,
    owner: 'Emily Rodriguez',
    lastActivity: '45 minutes ago',
    expectedCloseDate: '2024-02-14',
    contactPerson: 'Susan Martinez',
    contactEmail: 'susan.martinez@retailmax.com',
    notes: 'Large retail chain with multiple locations. They need a solution that works across all stores. Procurement process is standard.',
    nextSteps: [
      'Finalize multi-site pricing',
      'Complete vendor registration',
      'Schedule pilot program kickoff',
    ],
    recentActivity: [
      {
        action: 'Multi-site pricing discussed',
        timestamp: '45 minutes ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Vendor registration submitted',
        timestamp: '2 days ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Pilot program approved',
        timestamp: '5 days ago',
        user: 'Emily Rodriguez',
      },
    ],
  },
  {
    id: '12',
    name: 'Growth Plan',
    company: 'ScaleUp Ventures',
    value: 35000,
    stage: 'qualification',
    probability: 45,
    owner: 'David Kim',
    lastActivity: '8 hours ago',
    expectedCloseDate: '2024-03-05',
    contactPerson: 'Kevin Park',
    contactEmail: 'kevin@scaleupventures.com',
    notes: 'Venture-backed startup with aggressive growth plans. They are evaluating multiple solutions and price is a factor.',
    nextSteps: [
      'Provide competitive analysis',
      'Schedule executive demo',
      'Discuss growth pricing model',
    ],
    recentActivity: [
      {
        action: 'BANT qualification completed',
        timestamp: '8 hours ago',
        user: 'David Kim',
      },
      {
        action: 'Budget discussion',
        timestamp: '3 days ago',
        user: 'David Kim',
      },
      {
        action: 'Initial contact',
        timestamp: '1 week ago',
        user: 'David Kim',
      },
    ],
  },
  {
    id: '13',
    name: 'Enterprise Standard',
    company: 'ManufacturingPro',
    value: 110000,
    stage: 'proposal',
    probability: 68,
    owner: 'Sarah Johnson',
    lastActivity: '2 hours ago',
    expectedCloseDate: '2024-02-19',
    contactPerson: 'Robert Chen',
    contactEmail: 'robert.chen@manufacturingpro.com',
    notes: 'Manufacturing company looking to digitize operations. They have specific integration requirements with their ERP system.',
    nextSteps: [
      'Provide integration documentation',
      'Schedule technical integration call',
      'Send proposal with custom integration scope',
    ],
    recentActivity: [
      {
        action: 'Integration requirements gathered',
        timestamp: '2 hours ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'ERP integration discussed',
        timestamp: '1 day ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Discovery call completed',
        timestamp: '4 days ago',
        user: 'Sarah Johnson',
      },
    ],
  },
  {
    id: '14',
    name: 'Team License',
    company: 'DesignStudio',
    value: 28000,
    stage: 'prospecting',
    probability: 30,
    owner: 'Mike Chen',
    lastActivity: '2 days ago',
    expectedCloseDate: '2024-03-10',
    contactPerson: 'Amanda White',
    contactEmail: 'amanda@designstudio.com',
    notes: 'Creative agency exploring collaboration tools. Early stage conversation. Need to demonstrate value before budget approval.',
    nextSteps: [
      'Send case studies from creative agencies',
      'Schedule product walkthrough',
      'Follow up in 2 weeks',
    ],
    recentActivity: [
      {
        action: 'Initial outreach',
        timestamp: '2 days ago',
        user: 'Mike Chen',
      },
      {
        action: 'Lead added to CRM',
        timestamp: '5 days ago',
        user: 'Mike Chen',
      },
    ],
  },
  {
    id: '15',
    name: 'Corporate License',
    company: 'HealthTech Solutions',
    value: 165000,
    stage: 'negotiation',
    probability: 82,
    owner: 'Emily Rodriguez',
    lastActivity: '30 minutes ago',
    expectedCloseDate: '2024-02-11',
    contactPerson: 'Dr. Maria Garcia',
    contactEmail: 'maria.garcia@healthtech.com',
    notes: 'Healthcare technology company with HIPAA compliance requirements. Security review completed successfully. Contract terms being finalized.',
    nextSteps: [
      'Finalize HIPAA compliance documentation',
      'Complete contract review',
      'Schedule implementation planning',
    ],
    recentActivity: [
      {
        action: 'Contract terms reviewed',
        timestamp: '30 minutes ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'HIPAA compliance verified',
        timestamp: '1 day ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Security audit passed',
        timestamp: '4 days ago',
        user: 'Emily Rodriguez',
      },
    ],
  },
  {
    id: '16',
    name: 'Business Plan',
    company: 'LogisticsCo',
    value: 52000,
    stage: 'proposal',
    probability: 58,
    owner: 'David Kim',
    lastActivity: '5 hours ago',
    expectedCloseDate: '2024-02-24',
    contactPerson: 'Thomas Anderson',
    contactEmail: 'thomas@logisticsco.com',
    notes: 'Logistics company looking to optimize operations. They have specific workflow requirements and need custom configuration.',
    nextSteps: [
      'Provide workflow configuration guide',
      'Schedule configuration workshop',
      'Send proposal with implementation timeline',
    ],
    recentActivity: [
      {
        action: 'Workflow requirements documented',
        timestamp: '5 hours ago',
        user: 'David Kim',
      },
      {
        action: 'Proposal sent',
        timestamp: '1 day ago',
        user: 'David Kim',
      },
      {
        action: 'Discovery session completed',
        timestamp: '3 days ago',
        user: 'David Kim',
      },
    ],
  },
  {
    id: '17',
    name: 'Enterprise Elite',
    company: 'FinTech Global',
    value: 275000,
    stage: 'negotiation',
    probability: 88,
    owner: 'Sarah Johnson',
    lastActivity: '15 minutes ago',
    expectedCloseDate: '2024-02-08',
    contactPerson: 'Christopher Moore',
    contactEmail: 'christopher.moore@fintechglobal.com',
    notes: 'Major financial technology company. Large enterprise deal with executive sponsorship. All approvals in place, finalizing terms.',
    nextSteps: [
      'Complete final contract review',
      'Schedule executive signing ceremony',
      'Begin enterprise onboarding process',
    ],
    recentActivity: [
      {
        action: 'Executive approval received',
        timestamp: '15 minutes ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Legal review completed',
        timestamp: '2 hours ago',
        user: 'Sarah Johnson',
      },
      {
        action: 'Technical requirements met',
        timestamp: '1 day ago',
        user: 'Sarah Johnson',
      },
    ],
  },
  {
    id: '18',
    name: 'Standard Subscription',
    company: 'EduTech Innovations',
    value: 38000,
    stage: 'qualification',
    probability: 42,
    owner: 'Mike Chen',
    lastActivity: '7 hours ago',
    expectedCloseDate: '2024-03-01',
    contactPerson: 'Jennifer Liu',
    contactEmail: 'jennifer.liu@edutech.com',
    notes: 'Education technology company. They are evaluating solutions for the upcoming school year. Budget cycle is important.',
    nextSteps: [
      'Provide education sector case studies',
      'Schedule demo for their team',
      'Discuss budget timeline',
    ],
    recentActivity: [
      {
        action: 'Qualification call completed',
        timestamp: '7 hours ago',
        user: 'Mike Chen',
      },
      {
        action: 'Budget timeline discussed',
        timestamp: '2 days ago',
        user: 'Mike Chen',
      },
      {
        action: 'Initial contact',
        timestamp: '1 week ago',
        user: 'Mike Chen',
      },
    ],
  },
  {
    id: '19',
    name: 'Professional License',
    company: 'MediaWorks',
    value: 72000,
    stage: 'proposal',
    probability: 62,
    owner: 'Emily Rodriguez',
    lastActivity: '4 hours ago',
    expectedCloseDate: '2024-02-21',
    contactPerson: 'Nicole Thompson',
    contactEmail: 'nicole@mediaworks.com',
    notes: 'Media production company with distributed teams. They need collaboration features and content management capabilities.',
    nextSteps: [
      'Schedule collaboration features demo',
      'Provide content management overview',
      'Follow up on proposal questions',
    ],
    recentActivity: [
      {
        action: 'Proposal sent',
        timestamp: '4 hours ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Feature requirements confirmed',
        timestamp: '1 day ago',
        user: 'Emily Rodriguez',
      },
      {
        action: 'Discovery call',
        timestamp: '5 days ago',
        user: 'Emily Rodriguez',
      },
    ],
  },
  {
    id: '20',
    name: 'Starter License',
    company: 'Local Services Inc',
    value: 12000,
    stage: 'prospecting',
    probability: 22,
    owner: 'David Kim',
    lastActivity: '3 days ago',
    expectedCloseDate: '2024-03-15',
    contactPerson: 'Mark Davis',
    contactEmail: 'mark@localservices.com',
    notes: 'Local service business exploring digital transformation. Early stage, needs education on value proposition.',
    nextSteps: [
      'Send ROI calculator',
      'Provide small business resources',
      'Schedule follow-up call',
    ],
    recentActivity: [
      {
        action: 'Initial contact made',
        timestamp: '3 days ago',
        user: 'David Kim',
      },
      {
        action: 'Lead added to CRM',
        timestamp: '1 week ago',
        user: 'David Kim',
      },
    ],
  },
]

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'closed-won',
    title: 'Deal moved to Closed-Won',
    description: 'Global Solutions - Multi-Year Contract ($250,000)',
    dealName: 'Multi-Year Contract',
    timestamp: '5 minutes ago',
    priority: 'high',
  },
  {
    id: '2',
    type: 'at-risk',
    title: 'Deal at risk - No activity in 7 days',
    description: 'StartupXYZ - Starter Package ($15,000) has had no updates',
    dealName: 'Starter Package',
    timestamp: '1 hour ago',
    priority: 'high',
  },
  {
    id: '3',
    type: 'data-quality',
    title: 'Missing required field',
    description: 'Acme Corp - Enterprise License is missing "Decision Date"',
    dealName: 'Enterprise License',
    timestamp: '2 hours ago',
    priority: 'medium',
  },
  {
    id: '4',
    type: 'renewal',
    title: 'Annual renewal reminder',
    description: 'TechStart Inc - Annual Subscription renews in 30 days',
    dealName: 'Annual Subscription',
    timestamp: '3 hours ago',
    priority: 'medium',
  },
  {
    id: '5',
    type: 'deal-update',
    title: 'Deal probability updated',
    description: 'MegaCorp - Enterprise Plus probability increased to 85%',
    dealName: 'Enterprise Plus',
    timestamp: '4 hours ago',
    priority: 'low',
  },
  {
    id: '6',
    type: 'at-risk',
    title: 'Deal stalled in negotiation',
    description: 'Acme Corp - Enterprise License has been in negotiation for 14 days',
    dealName: 'Enterprise License',
    timestamp: '6 hours ago',
    priority: 'high',
  },
]

export const mockMetrics: Metric[] = [
  {
    label: 'Active Deals',
    value: 24,
    trend: {
      value: 12.4,
      direction: 'up',
    },
    description: 'Across all stages',
  },
  {
    label: 'Pipeline Value',
    value: '$2.4M',
    trend: {
      value: 8.3,
      direction: 'up',
    },
    description: 'Total opportunity value',
  },
  {
    label: 'At Risk Deals',
    value: 3,
    trend: {
      value: 25.7,
      direction: 'down',
    },
    description: 'Requiring attention',
  },
  {
    label: 'Avg Close Time',
    value: '32 days',
    trend: {
      value: 5.9,
      direction: 'down',
    },
    description: 'Last 30 days',
  },
]

export const dealStages = [
  { value: 'prospecting', label: 'Prospecting' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'closed-won', label: 'Closed Won' },
  { value: 'closed-lost', label: 'Closed Lost' },
]

export const pipelineStats = {
  prospecting: 4,
  qualification: 6,
  proposal: 5,
  negotiation: 7,
  'closed-won': 2,
  'closed-lost': 0,
}

