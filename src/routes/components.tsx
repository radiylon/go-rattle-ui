import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  // Core Components
  Button,
  Card,
  Badge,
  Alert,
  Metric,
  Input,
  Select,
  Avatar,
  ProgressBar,
  // Data Display Components
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Skeleton,
  SkeletonCard,
  SkeletonMetric,
  EmptyState,
  TrendIndicator,
  Sparkline,
  SparkBar,
  // Navigation Components
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  DropdownButton,
  Pagination,
  PaginationInfo,
  Breadcrumb,
  // Layout & Content Components
  Divider,
  Heading,
  Text,
  Label,
  Caption,
  IconButton,
  AvatarGroup,
  Tooltip,
  // Feedback Components
  ToastComponent,
  Spinner,
  InlineLoader,
  // Revenue Dashboard Components
  DealCard,
  StageIndicator,
  QuotaProgress,
  Leaderboard,
  StatCard,
  StatGroup,
  ActivityFeed,
  DataList,
  StatsList,
} from '../components/ui'
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Settings,
  Edit,
  Trash2,
  Copy,
  Plus,
  RefreshCw,
} from 'lucide-react'

export const Route = createFileRoute('/components')({
  component: ComponentsPage,
})

function ComponentsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data for components
  const sampleChartData = [12, 19, 15, 25, 22, 30, 28, 35, 32, 40]
  const sampleLeaderboard = [
    { id: '1', name: 'Sarah Johnson', value: 245000, subtitle: 'Enterprise Sales', trend: 12 },
    { id: '2', name: 'Mike Chen', value: 198000, subtitle: 'Mid-Market', trend: 8 },
    { id: '3', name: 'Emily Rodriguez', value: 175000, subtitle: 'Enterprise Sales', trend: -3 },
    { id: '4', name: 'David Kim', value: 142000, subtitle: 'SMB', trend: 15 },
    { id: '5', name: 'Lisa Wang', value: 128000, subtitle: 'Mid-Market', trend: 5 },
  ]
  const sampleActivities = [
    { id: '1', type: 'won' as const, title: 'Deal closed - Acme Corp', description: '$125,000 enterprise deal', timestamp: '2 hours ago', user: { name: 'Sarah Johnson' } },
    { id: '2', type: 'stage-change' as const, title: 'Stage changed to Negotiation', description: 'TechStart Inc moved forward', timestamp: '4 hours ago', user: { name: 'Mike Chen' } },
    { id: '3', type: 'call' as const, title: 'Discovery call completed', description: 'Discussed requirements with stakeholders', timestamp: '6 hours ago', user: { name: 'Emily Rodriguez' } },
    { id: '4', type: 'email' as const, title: 'Proposal sent', description: 'Custom pricing proposal delivered', timestamp: '1 day ago', user: { name: 'David Kim' } },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Component Library
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive collection of UI components built with Go Rattle's design system
          </p>
        </div>

        {/* Quick Navigation */}
        <Card className="p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {['Core', 'Data Display', 'Navigation', 'Layout', 'Feedback', 'Revenue'].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase().replace(' ', '-')}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                {section}
              </a>
            ))}
          </div>
        </Card>

        {/* ===== CORE COMPONENTS ===== */}
        <div id="core" className="mb-16">
          <Heading as="h2" size="2xl" className="mb-8">Core Components</Heading>

          {/* Buttons */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Buttons</Heading>
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3">Variants</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>
                <Divider />
                <div>
                  <Label className="mb-3">States</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button isLoading>Loading</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
                <Divider />
                <div>
                  <Label className="mb-3">Icon Buttons</Label>
                  <div className="flex flex-wrap items-center gap-3">
                    <IconButton icon={<Settings />} aria-label="Settings" variant="ghost" />
                    <IconButton icon={<Plus />} aria-label="Add" variant="primary" />
                    <IconButton icon={<Edit />} aria-label="Edit" variant="secondary" />
                    <IconButton icon={<Trash2 />} aria-label="Delete" variant="danger" />
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Cards */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Cards</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Text color="muted">Simple card with content. Cards provide a flexible container for grouping related content.</Text>
              </Card>
              <Card
                header={<Heading as="h4" size="md">Card with Header</Heading>}
                footer={<Text size="sm" color="muted">Card Footer</Text>}
              >
                <Text color="muted">Card with header and footer sections.</Text>
              </Card>
              <Card hover>
                <Text color="muted">Hoverable card with shadow effect on hover.</Text>
              </Card>
              <Card className="bg-rattle-green-bg border-rattle-green-lightest">
                <Text color="muted">Custom styled card with brand colors.</Text>
              </Card>
            </div>
          </section>

          {/* Badges */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Badges</Heading>
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3">Variants</Label>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="default">Default</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Alerts */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Alerts</Heading>
            <div className="space-y-4">
              <Alert variant="success" title="Deal closed successfully" description="Acme Corp - Enterprise License ($125,000)" />
              <Alert variant="warning" title="Deal at risk" description="No activity in the last 7 days" />
              <Alert variant="error" title="Missing required field" description="Decision date is required" />
              <Alert variant="info" title="New update available" description="Pipeline sync completed" />
              <Alert
                variant="at-risk"
                title="Urgent attention required"
                description="3 deals need immediate follow-up"
                actions={
                  <>
                    <Button size="sm" variant="danger">Take Action</Button>
                    <Button size="sm" variant="secondary">Dismiss</Button>
                  </>
                }
              />
            </div>
          </section>

          {/* Form Elements */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Form Elements</Heading>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Deal Name" placeholder="Enter deal name" />
                <Input label="Company" placeholder="Enter company" error="This field is required" />
                <Select
                  label="Stage"
                  options={[
                    { value: 'prospecting', label: 'Prospecting' },
                    { value: 'qualification', label: 'Qualification' },
                    { value: 'proposal', label: 'Proposal' },
                    { value: 'negotiation', label: 'Negotiation' },
                  ]}
                />
                <Input label="Deal Value" type="number" placeholder="0" helperText="Enter value in USD" />
              </div>
            </Card>
          </section>

          {/* Avatars */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Avatars</Heading>
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3">Sizes</Label>
                  <div className="flex items-center gap-4">
                    <Avatar name="Sarah Johnson" size="sm" />
                    <Avatar name="Mike Chen" size="md" />
                    <Avatar name="Emily Rodriguez" size="lg" />
                    <Avatar name="David Kim" size="xl" />
                  </div>
                </div>
                <Divider />
                <div>
                  <Label className="mb-3">Avatar Group</Label>
                  <AvatarGroup
                    items={[
                      { name: 'Sarah Johnson' },
                      { name: 'Mike Chen' },
                      { name: 'Emily Rodriguez' },
                      { name: 'David Kim' },
                      { name: 'Lisa Wang' },
                      { name: 'James Wilson' },
                    ]}
                    max={4}
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Progress Bars */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Progress Bars</Heading>
            <Card className="p-6">
              <div className="space-y-6">
                <ProgressBar value={75} showLabel />
                <ProgressBar value={45} variant="success" showLabel />
                <ProgressBar value={60} variant="warning" showLabel />
                <ProgressBar value={30} variant="error" showLabel />
              </div>
            </Card>
          </section>
        </div>

        {/* ===== DATA DISPLAY COMPONENTS ===== */}
        <div id="data-display" className="mb-16">
          <Heading as="h2" size="2xl" className="mb-8">Data Display</Heading>

          {/* Table */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Table</Heading>
            <Card>
              <Table>
                <TableHeader sticky>
                  <TableRow>
                    <TableHead sortable sortDirection="desc">Deal</TableHead>
                    <TableHead sortable>Company</TableHead>
                    <TableHead sortable>Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Owner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow clickable>
                    <TableCell><Text weight="medium">Enterprise License</Text></TableCell>
                    <TableCell><Text color="muted">Acme Corp</Text></TableCell>
                    <TableCell><Text weight="semibold">$125,000</Text></TableCell>
                    <TableCell><Badge variant="warning">Negotiation</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar name="Sarah Johnson" size="sm" />
                        <Text size="sm" color="muted">Sarah Johnson</Text>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow clickable>
                    <TableCell><Text weight="medium">Platform Upgrade</Text></TableCell>
                    <TableCell><Text color="muted">TechStart Inc</Text></TableCell>
                    <TableCell><Text weight="semibold">$85,000</Text></TableCell>
                    <TableCell><Badge variant="info">Proposal</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar name="Mike Chen" size="sm" />
                        <Text size="sm" color="muted">Mike Chen</Text>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </section>

          {/* Metrics */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Metrics</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Metric
                label="Active Deals"
                value={24}
                trend={{ value: 12, direction: 'up' }}
                description="Across all stages"
                icon={<Users className="h-6 w-6" />}
              />
              <Metric
                label="Pipeline Value"
                value="$2.4M"
                trend={{ value: 8, direction: 'up' }}
                description="Total opportunity value"
                icon={<DollarSign className="h-6 w-6" />}
                gradient
              />
              <Metric
                label="At Risk Deals"
                value={3}
                trend={{ value: 25, direction: 'down' }}
                description="Requiring attention"
                icon={<TrendingUp className="h-6 w-6" />}
              />
              <Metric
                label="Avg Close Time"
                value="32 days"
                trend={{ value: 5, direction: 'down' }}
                description="Last 30 days"
                icon={<Clock className="h-6 w-6" />}
              />
            </div>
          </section>

          {/* Stat Cards */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Stat Cards</Heading>
            <StatGroup columns={3}>
              <StatCard
                label="Monthly Revenue"
                value="$847,500"
                trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}
                icon={<DollarSign className="h-5 w-5" />}
                chart={sampleChartData}
              />
              <StatCard
                label="Deals Closed"
                value="28"
                trend={{ value: 8, direction: 'up' }}
                variant="gradient"
              />
              <StatCard
                label="Conversion Rate"
                value="34.2%"
                trend={{ value: 2.1, direction: 'down' }}
                description="From qualified to closed"
              />
            </StatGroup>
          </section>

          {/* Trend Indicators */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Trend Indicators</Heading>
            <Card className="p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Text color="muted">Positive:</Text>
                  <TrendIndicator value={12.5} />
                </div>
                <div className="flex items-center gap-2">
                  <Text color="muted">Negative:</Text>
                  <TrendIndicator value={-8.3} />
                </div>
                <div className="flex items-center gap-2">
                  <Text color="muted">Neutral:</Text>
                  <TrendIndicator value={0} />
                </div>
                <div className="flex items-center gap-2">
                  <Text color="muted">Large:</Text>
                  <TrendIndicator value={24} size="lg" />
                </div>
                <div className="flex items-center gap-2">
                  <Text color="muted">Currency:</Text>
                  <TrendIndicator value={5000} format="currency" />
                </div>
              </div>
            </Card>
          </section>

          {/* Sparklines */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Sparklines</Heading>
            <Card className="p-6">
              <div className="flex flex-wrap items-center gap-8">
                <div>
                  <Text size="sm" color="muted" className="mb-2">Line Chart</Text>
                  <Sparkline data={sampleChartData} width={120} height={32} />
                </div>
                <div>
                  <Text size="sm" color="muted" className="mb-2">With Area</Text>
                  <Sparkline data={sampleChartData} width={120} height={32} showArea />
                </div>
                <div>
                  <Text size="sm" color="muted" className="mb-2">With Dots</Text>
                  <Sparkline data={sampleChartData} width={120} height={32} showDots />
                </div>
                <div>
                  <Text size="sm" color="muted" className="mb-2">Bar Chart</Text>
                  <SparkBar data={[5, 10, 8, 15, 12, 18]} width={80} height={24} />
                </div>
              </div>
            </Card>
          </section>

          {/* Skeletons */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Skeletons</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Label className="mb-3">Text Skeleton</Label>
                <Skeleton variant="text" lines={3} />
              </Card>
              <Card className="p-6">
                <Label className="mb-3">Shapes</Label>
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" width={48} height={48} />
                  <Skeleton variant="rectangular" width={100} height={48} />
                  <Skeleton variant="rounded" width={100} height={48} />
                </div>
              </Card>
              <SkeletonCard hasHeader hasFooter />
              <SkeletonMetric />
            </div>
          </section>

          {/* Empty State */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Empty States</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <EmptyState
                  variant="no-data"
                  title="No deals yet"
                  description="Create your first deal to get started with pipeline tracking"
                  action={<Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Deal</Button>}
                  size="sm"
                />
              </Card>
              <Card>
                <EmptyState
                  variant="search"
                  title="No results found"
                  description="Try adjusting your search or filter criteria"
                  action={<Button size="sm" variant="secondary"><RefreshCw className="h-4 w-4 mr-2" />Clear filters</Button>}
                  size="sm"
                />
              </Card>
            </div>
          </section>
        </div>

        {/* ===== NAVIGATION COMPONENTS ===== */}
        <div id="navigation" className="mb-16">
          <Heading as="h2" size="2xl" className="mb-8">Navigation</Heading>

          {/* Tabs */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Tabs</Heading>
            <Card className="p-6">
              <Tabs defaultValue="overview">
                <TabList variant="underline">
                  <TabTrigger value="overview" variant="underline">Overview</TabTrigger>
                  <TabTrigger value="analytics" variant="underline">Analytics</TabTrigger>
                  <TabTrigger value="reports" variant="underline">Reports</TabTrigger>
                  <TabTrigger value="settings" variant="underline" disabled>Settings</TabTrigger>
                </TabList>
                <TabContent value="overview">
                  <Text color="muted">Overview content goes here. This tab shows a summary of your pipeline.</Text>
                </TabContent>
                <TabContent value="analytics">
                  <Text color="muted">Analytics content goes here. Deep dive into your sales metrics.</Text>
                </TabContent>
                <TabContent value="reports">
                  <Text color="muted">Reports content goes here. Export and schedule reports.</Text>
                </TabContent>
              </Tabs>

              <Divider className="my-6" />

              <Label className="mb-3">Pills Variant</Label>
              <Tabs defaultValue="all">
                <TabList variant="pills">
                  <TabTrigger value="all" variant="pills">All Deals</TabTrigger>
                  <TabTrigger value="open" variant="pills">Open</TabTrigger>
                  <TabTrigger value="won" variant="pills">Won</TabTrigger>
                  <TabTrigger value="lost" variant="pills">Lost</TabTrigger>
                </TabList>
              </Tabs>
            </Card>
          </section>

          {/* Dropdown */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Dropdown</Heading>
            <Card className="p-6">
              <div className="flex flex-wrap gap-4">
                <DropdownButton
                  label="Actions"
                  items={[
                    { label: 'Edit', value: 'edit', icon: <Edit className="h-4 w-4" /> },
                    { label: 'Duplicate', value: 'duplicate', icon: <Copy className="h-4 w-4" /> },
                    { label: 'Delete', value: 'delete', icon: <Trash2 className="h-4 w-4" />, destructive: true },
                  ]}
                />
                <DropdownButton
                  label="Filter by Stage"
                  variant="secondary"
                  items={[
                    { label: 'All Stages', value: 'all' },
                    { label: 'Prospecting', value: 'prospecting' },
                    { label: 'Qualification', value: 'qualification' },
                    { label: 'Proposal', value: 'proposal' },
                    { label: 'Negotiation', value: 'negotiation' },
                  ]}
                />
              </div>
            </Card>
          </section>

          {/* Pagination */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Pagination</Heading>
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3">Default</Label>
                  <div className="flex items-center justify-between">
                    <PaginationInfo currentPage={currentPage} pageSize={10} totalItems={156} />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={16}
                      onChange={setCurrentPage}
                    />
                  </div>
                </div>
                <Divider />
                <div>
                  <Label className="mb-3">Compact</Label>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={16}
                    onChange={setCurrentPage}
                    showFirstLast={false}
                    size="sm"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Breadcrumb */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Breadcrumb</Heading>
            <Card className="p-6">
              <Breadcrumb
                showHome
                items={[
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Deals', href: '/deals' },
                  { label: 'Enterprise License' },
                ]}
              />
            </Card>
          </section>
        </div>

        {/* ===== LAYOUT COMPONENTS ===== */}
        <div id="layout" className="mb-16">
          <Heading as="h2" size="2xl" className="mb-8">Layout & Content</Heading>

          {/* Typography */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Typography</Heading>
            <Card className="p-6">
              <div className="space-y-4">
                <Heading as="h1">Heading 1</Heading>
                <Heading as="h2">Heading 2</Heading>
                <Heading as="h3">Heading 3</Heading>
                <Heading as="h4">Heading 4</Heading>
                <Divider className="my-4" />
                <Text>Default text paragraph</Text>
                <Text color="muted">Muted text for secondary content</Text>
                <Text color="subtle">Subtle text for tertiary content</Text>
                <Text color="success">Success text</Text>
                <Text color="warning">Warning text</Text>
                <Text color="error">Error text</Text>
                <Divider className="my-4" />
                <div className="space-y-2">
                  <Label required>Required Label</Label>
                  <Caption>Caption or helper text</Caption>
                  <Caption variant="error">Error caption</Caption>
                </div>
              </div>
            </Card>
          </section>

          {/* Dividers */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Dividers</Heading>
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3">Solid (default)</Label>
                  <Divider />
                </div>
                <div>
                  <Label className="mb-3">Dashed</Label>
                  <Divider variant="dashed" />
                </div>
                <div>
                  <Label className="mb-3">With Label</Label>
                  <Divider label="OR" />
                </div>
                <div className="flex h-12 items-center gap-4">
                  <Text>Item 1</Text>
                  <Divider orientation="vertical" />
                  <Text>Item 2</Text>
                  <Divider orientation="vertical" />
                  <Text>Item 3</Text>
                </div>
              </div>
            </Card>
          </section>

          {/* Tooltip */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Tooltips</Heading>
            <Card className="p-6">
              <div className="flex flex-wrap gap-6">
                <Tooltip content="Top tooltip" position="top">
                  <Button variant="secondary" size="sm">Hover me (top)</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" position="bottom">
                  <Button variant="secondary" size="sm">Hover me (bottom)</Button>
                </Tooltip>
                <Tooltip content="Left tooltip" position="left">
                  <Button variant="secondary" size="sm">Hover me (left)</Button>
                </Tooltip>
                <Tooltip content="Right tooltip" position="right">
                  <Button variant="secondary" size="sm">Hover me (right)</Button>
                </Tooltip>
              </div>
            </Card>
          </section>

          {/* Data List */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Data Lists</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Label className="mb-3">Default</Label>
                <DataList
                  items={[
                    { label: 'Deal Name', value: 'Enterprise License' },
                    { label: 'Company', value: 'Acme Corp' },
                    { label: 'Value', value: '$125,000' },
                    { label: 'Owner', value: 'Sarah Johnson' },
                  ]}
                />
              </Card>
              <Card className="p-6">
                <Label className="mb-3">Horizontal</Label>
                <DataList
                  variant="horizontal"
                  items={[
                    { label: 'Deal Name', value: 'Enterprise License' },
                    { label: 'Company', value: 'Acme Corp' },
                    { label: 'Value', value: '$125,000' },
                    { label: 'Owner', value: 'Sarah Johnson' },
                  ]}
                />
              </Card>
              <Card className="p-6">
                <Label className="mb-3">Striped</Label>
                <DataList
                  variant="striped"
                  items={[
                    { label: 'Deal Name', value: 'Enterprise License' },
                    { label: 'Company', value: 'Acme Corp' },
                    { label: 'Value', value: '$125,000' },
                    { label: 'Owner', value: 'Sarah Johnson' },
                  ]}
                />
              </Card>
              <Card className="p-6">
                <Label className="mb-3">Stats List</Label>
                <StatsList
                  items={[
                    { label: 'Open Deals', value: 24, change: { value: 12, direction: 'up' } },
                    { label: 'Pipeline Value', value: '$2.4M', change: { value: 8, direction: 'up' } },
                    { label: 'Win Rate', value: '34%', change: { value: 3, direction: 'down' } },
                  ]}
                />
              </Card>
            </div>
          </section>
        </div>

        {/* ===== FEEDBACK COMPONENTS ===== */}
        <div id="feedback" className="mb-16">
          <Heading as="h2" size="2xl" className="mb-8">Feedback</Heading>

          {/* Toast */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Toast Notifications</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ToastComponent type="success" title="Deal saved successfully" description="All changes have been saved" />
              <ToastComponent type="error" title="Failed to save" description="Please try again" />
              <ToastComponent type="warning" title="Unsaved changes" description="You have unsaved changes" />
              <ToastComponent type="info" title="Sync in progress" description="Data is being synchronized" />
            </div>
          </section>

          {/* Spinners */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Loading States</Heading>
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3">Spinner Sizes</Label>
                  <div className="flex items-center gap-6">
                    <Spinner size="xs" />
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                  </div>
                </div>
                <Divider />
                <div>
                  <Label className="mb-3">Inline Loader</Label>
                  <InlineLoader label="Loading data..." />
                </div>
              </div>
            </Card>
          </section>
        </div>

        {/* ===== REVENUE COMPONENTS ===== */}
        <div id="revenue" className="mb-16">
          <Heading as="h2" size="2xl" className="mb-8">Revenue Dashboard</Heading>

          {/* Deal Cards */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Deal Cards</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DealCard
                name="Enterprise License"
                company="Acme Corp"
                value={125000}
                stage="negotiation"
                probability={75}
                owner="Sarah Johnson"
                closeDate="Dec 31, 2024"
                lastActivity="2 hours ago"
                trend={12}
              />
              <DealCard
                name="Platform Upgrade"
                company="TechStart Inc"
                value={85000}
                stage="proposal"
                probability={45}
                owner="Mike Chen"
                compact
              />
              <DealCard
                name="Multi-Year Contract"
                company="Global Solutions"
                value={250000}
                stage="closed-won"
                probability={100}
                owner="Emily Rodriguez"
                compact
              />
            </div>
          </section>

          {/* Stage Indicator */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Stage Indicators</Heading>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <Label className="mb-4">Horizontal</Label>
                <StageIndicator currentStage="proposal" variant="horizontal" />
              </Card>
              <Card className="p-6">
                <Label className="mb-4">Compact</Label>
                <StageIndicator currentStage="negotiation" variant="compact" />
              </Card>
              <Card className="p-6">
                <Label className="mb-4">Vertical</Label>
                <StageIndicator currentStage="qualification" variant="vertical" size="sm" />
              </Card>
            </div>
          </section>

          {/* Quota Progress */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Quota Progress</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuotaProgress
                current={847500}
                target={1000000}
                label="Q4 Revenue Target"
                variant="detailed"
                milestones={[25, 50, 75]}
              />
              <Card className="p-6">
                <div className="space-y-4">
                  <QuotaProgress current={75000} target={100000} label="Sarah Johnson" />
                  <QuotaProgress current={92000} target={80000} label="Mike Chen" />
                  <QuotaProgress current={45000} target={100000} label="Emily Rodriguez" variant="compact" />
                </div>
              </Card>
            </div>
          </section>

          {/* Leaderboard */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Leaderboard</Heading>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Leaderboard
                title="Top Performers"
                entries={sampleLeaderboard}
                variant="default"
              />
              <Leaderboard
                title="Sales Rankings"
                entries={sampleLeaderboard}
                variant="detailed"
              />
            </div>
          </section>

          {/* Activity Feed */}
          <section className="mb-12">
            <Heading as="h3" size="xl" className="mb-6">Activity Feed</Heading>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <ActivityFeed
                  title="Recent Activity"
                  activities={sampleActivities}
                  variant="default"
                />
              </Card>
              <Card className="p-6">
                <ActivityFeed
                  title="Activity Log"
                  activities={sampleActivities}
                  variant="compact"
                />
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
