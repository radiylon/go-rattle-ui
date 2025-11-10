import { createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Card,
  Badge,
  Alert,
  Metric,
  Input,
  Select,
  Avatar,
  ProgressBar,
} from '../components/ui'
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react'

export const Route = createFileRoute('/components')({
  component: ComponentsPage,
})

function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            Component Library
          </h1>
          <p className="text-lg text-gray-600">
            A collection of reusable UI components built with Rattle's design
            system
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">Buttons</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="danger">Danger Button</Button>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Sizes
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Primary</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Secondary</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm" variant="secondary">Small</Button>
                      <Button size="md" variant="secondary">Medium</Button>
                      <Button size="lg" variant="secondary">Large</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Danger</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm" variant="danger">Small</Button>
                      <Button size="md" variant="danger">Medium</Button>
                      <Button size="lg" variant="danger">Large</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  States
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>Loading</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <p className="text-gray-700">Simple card with content</p>
            </Card>
            <Card
              header={<h3 className="font-semibold">Card Header</h3>}
              footer={<p className="text-sm text-gray-600">Card Footer</p>}
            >
              <p className="text-gray-700">Card with header and footer</p>
            </Card>
            <Card hover>
              <p className="text-gray-700">Hoverable card</p>
            </Card>
            <Card className="bg-rattle-green-bg border-rattle-green-lightest">
              <p className="text-gray-700">Gradient card</p>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">Badges</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="default">Default</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="sm">Small Badge</Badge>
                  <Badge size="md">Medium Badge</Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Alerts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">Alerts</h2>
          <div className="space-y-4">
            <Alert
              variant="success"
              title="Deal moved to Closed-Won"
              description="Global Solutions - Multi-Year Contract ($250,000)"
            />
            <Alert
              variant="at-risk"
              title="Deal at risk - No activity in 7 days"
              description="StartupXYZ - Starter Package ($15,000) has had no updates"
              actions={
                <>
                  <Button size="sm" variant="danger">
                    Take Action
                  </Button>
                  <Button size="sm" variant="secondary">
                    Dismiss
                  </Button>
                </>
              }
            />
            <Alert
              variant="deal-update"
              title="Deal probability updated"
              description="MegaCorp - Enterprise Plus probability increased to 85%"
            />
            <Alert
              variant="error"
              title="Missing required field"
              description="Acme Corp - Enterprise License is missing 'Decision Date'"
              actions={
                <Button size="sm" variant="danger">
                  Fix Now
                </Button>
              }
            />
          </div>
        </section>

        {/* Metrics Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">Metrics</h2>
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

        {/* Forms Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">Forms</h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Deal Name" placeholder="Enter deal name" />
              <Input
                label="Company"
                placeholder="Enter company name"
                error="This field is required"
              />
              <Select
                label="Deal Stage"
                options={[
                  { value: 'prospecting', label: 'Prospecting' },
                  { value: 'qualification', label: 'Qualification' },
                  { value: 'proposal', label: 'Proposal' },
                  { value: 'negotiation', label: 'Negotiation' },
                ]}
              />
              <Input
                label="Deal Value"
                type="number"
                placeholder="0"
                helperText="Enter the deal value in USD"
              />
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="primary" size="sm">Save Deal</Button>
              <Button variant="secondary" size="sm">Cancel</Button>
            </div>
          </Card>
        </section>

        {/* Avatars Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">Avatars</h2>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Avatar name="Sarah Johnson" size="sm" />
              <Avatar name="Mike Chen" size="md" />
              <Avatar name="Emily Rodriguez" size="lg" />
              <Avatar name="David Kim" />
            </div>
          </Card>
        </section>

        {/* Progress Bars Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">
            Progress Bars
          </h2>
          <Card className="p-6">
            <div className="space-y-6">
              <ProgressBar value={75} showLabel />
              <ProgressBar value={45} variant="success" showLabel />
              <ProgressBar value={60} variant="warning" showLabel />
              <ProgressBar value={30} variant="error" showLabel />
              <ProgressBar value={85} gradient showLabel />
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

