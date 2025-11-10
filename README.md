# Rattle Revenue Dashboard

A modern revenue dashboard application built with React and TanStack Router. This application provides real-time insights into deal pipelines, metrics, and alerts to help sales teams track and manage their revenue operations.

## Overview

The Rattle Revenue Dashboard is a comprehensive CRM visualization tool that displays:
- **Revenue Metrics**: Active deals, pipeline value, at-risk deals, and average close time
- **Real-time Alerts**: Deal updates, risk notifications, and data quality issues
- **Deal Pipeline**: Visual representation of deals across different stages
- **Deal Management**: Detailed deal information with modal views
- **Component Library**: Reusable UI components built with Rattle's design system

## Core Functionality

### Dashboard Page (`/dashboard`)

The main dashboard provides a comprehensive view of your revenue operations:

- **Hero Metrics**: Four key performance indicators displayed at the top:
  - Active Deals count with trend indicators
  - Total Pipeline Value
  - At Risk Deals requiring attention
  - Average Close Time

- **Real-time Alerts Feed**: 
  - Dismissible alert notifications for deal updates, risks, and data quality issues
  - Priority-based alert handling with action buttons
  - Direct links to view deal details from alerts

- **Deal Pipeline Widget**:
  - Visual progress bars showing deal distribution across stages
  - Stage badges with color-coded indicators
  - Total pipeline count summary

- **Recent Activity Timeline**:
  - Latest deal updates with owner avatars
  - Deal stage and value information
  - Quick access to deal details

- **Top Deals Table**:
  - Sortable table of all deals with key information
  - Deal name, company, value, stage, probability, and owner
  - Click any row to open detailed deal modal
  - Visual probability indicators with progress bars

- **Deal Details Modal**:
  - Comprehensive deal information view
  - Contact details, notes, and next steps
  - Recent activity timeline per deal

### Landing Page (`/`)

A clean hero section introducing Rattle with a call-to-action button to navigate to the dashboard.

### Component Library (`/components`)

A showcase page displaying all available UI components:
- Buttons (variants, sizes, states)
- Cards (with headers, footers, hover effects)
- Badges (variants and sizes)
- Alerts (all alert types)
- Metrics (with trends and icons)
- Form inputs (Input, Select)
- Avatars (multiple sizes)
- Progress bars (variants and gradients)

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm** (v10.21.0+)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd go-rattle-ui
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Building for Production

To build the application for production:

```bash
pnpm build
```

The production build will be output to the `dist/` directory.

To preview the production build locally:

```bash
pnpm serve
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Design system components (Button, Card, Badge, etc.)
│   ├── Header.tsx      # Application header with navigation
│   └── DealDetailsModal.tsx  # Modal for viewing deal details
├── routes/             # File-based routing (TanStack Router)
│   ├── __root.tsx      # Root layout with header
│   ├── index.tsx       # Landing page
│   ├── dashboard.tsx   # Main dashboard page
│   └── components.tsx  # Component library showcase
├── data/               # Mock data
│   └── mockData.ts     # Deals, alerts, metrics, and pipeline stats
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types (DealStage, AlertType, etc.)
├── utils/              # Utility functions
│   ├── formatting.ts   # Currency and stage name formatters
│   ├── variant-helpers.ts  # Variant mapping helpers
│   └── design-tokens.ts    # Design system tokens
├── styles.css          # Global styles
└── main.tsx           # Application entry point
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - File-based routing with type-safe navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Biome** - Linting and formatting
- **Vitest** - Testing framework
- **Lucide React** - Icon library

## Development

### Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Check both linting and formatting
pnpm check
```

### Testing

Run tests with Vitest:

```bash
pnpm test
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are automatically generated from files in the `src/routes` directory.

### Adding a Route

To add a new route, create a new file in `src/routes/`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/your-route')({
  component: YourComponent,
})
```

### Navigation

Use the `Link` component for type-safe navigation:

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/dashboard">Dashboard</Link>
```

### Layout

The root layout is defined in `src/routes/__root.tsx`. All routes render within this layout, with route content appearing where `<Outlet />` is placed.

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. Custom design tokens are defined in `src/utils/design-tokens.ts` and can be used throughout the application.

## Data

Currently, the application uses mock data defined in `src/data/mockData.ts`. This includes:
- Deal records with full details
- Alert notifications
- Metric calculations
- Pipeline statistics

In a production environment, this would be replaced with API calls or data fetching logic.

## Learn More

- [TanStack Router Documentation](https://tanstack.com/router)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
