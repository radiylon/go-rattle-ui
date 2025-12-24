import { createFileRoute } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowRight,
	Clock,
	DollarSign,
	LayoutGrid,
	List,
	MoreHorizontal,
	Trophy,
	Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DealDetailsModal } from "../components/DealDetailsModal";
import {
	Alert,
	Avatar,
	AvatarGroup,
	Badge,
	Breadcrumb,
	Button,
	Caption,
	Card,
	DealCard,
	Divider,
	// NEW: Actions and layout
	Dropdown,
	DropdownButton,
	EmptyState,
	Heading,
	IconButton,
	// NEW: Form components
	Input,
	Label,
	Leaderboard,
	// NEW: Data display
	Metric,
	Pagination,
	PaginationInfo,
	ProgressBar,
	QuotaProgress,
	Select,
	SkeletonMetric,
	SkeletonTableRow,
	SparkBar,
	StageIndicator,
	StatCard,
	StatGroup,
	StatsList,
	TabContent,
	TabList,
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
	Tabs,
	TabTrigger,
	Text,
	Tooltip,
	TrendIndicator,
	// NEW: Feedback
	useToast,
} from "../components/ui";
import {
	calculateLeaderboard,
	type Deal,
	featuredDeal,
	getTableSummary,
	metricSparklines,
	mockAlerts,
	mockDeals,
	mockMetrics,
	ownerOptions,
	pipelineStats,
	quickStats,
	quotaData,
	stageDistribution,
	teamMembers,
} from "../data/mockData";
import { formatCurrency, formatStageName } from "../utils/formatting";
import {
	getAlertVariant,
	getProbabilityVariant,
	getStageBadgeVariant,
} from "../utils/variant-helpers";

// Date filter options
const DATE_FILTER_OPTIONS = [
	{ label: "This Week", value: "week" },
	{ label: "This Month", value: "month" },
	{ label: "This Quarter", value: "quarter" },
	{ label: "This Year", value: "year" },
];

// Deal filter tabs
type DealFilter = "all" | "open" | "at-risk" | "won" | "lost";

const PAGE_SIZE = 8;

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	const [visibleAlerts, setVisibleAlerts] = useState(mockAlerts);
	const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [dateFilter, setDateFilter] = useState("quarter");
	const [dealFilter, setDealFilter] = useState<DealFilter>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [sortConfig, setSortConfig] = useState<{
		key: string;
		direction: "asc" | "desc";
	} | null>(null);

	// NEW: Loading state for skeleton demo
	const [isLoading, setIsLoading] = useState(true);
	// NEW: View mode toggle (table vs cards)
	const [viewMode, setViewMode] = useState<"table" | "cards">("table");
	// NEW: Filter states
	const [searchQuery, setSearchQuery] = useState("");
	const [filterOwner, setFilterOwner] = useState("");

	// NEW: Toast notifications
	const { addToast } = useToast();

	// NEW: Simulate 1.5s initial load to demonstrate skeleton components
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	const handleDismiss = useCallback(
		(alertId: string) => {
			setVisibleAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
			addToast({
				type: "info",
				title: "Alert dismissed",
				description: "You can view dismissed alerts in history",
				duration: 3000,
			});
		},
		[addToast],
	);

	const handleViewDeal = useCallback((deal: Deal) => {
		setSelectedDeal(deal);
		setIsModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
		setSelectedDeal(null);
	}, []);

	// Filter deals based on selected tab, search, and owner
	const filteredDeals = useMemo(() => {
		let deals = [...mockDeals];

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			deals = deals.filter(
				(d) =>
					d.name.toLowerCase().includes(query) ||
					d.company.toLowerCase().includes(query),
			);
		}

		// Apply owner filter
		if (filterOwner) {
			deals = deals.filter((d) => d.owner === filterOwner);
		}

		// Apply tab filter
		switch (dealFilter) {
			case "open":
				deals = deals.filter(
					(d) => !["closed-won", "closed-lost"].includes(d.stage),
				);
				break;
			case "at-risk":
				deals = deals.filter(
					(d) =>
						d.probability < 40 &&
						!["closed-won", "closed-lost"].includes(d.stage),
				);
				break;
			case "won":
				deals = deals.filter((d) => d.stage === "closed-won");
				break;
			case "lost":
				deals = deals.filter((d) => d.stage === "closed-lost");
				break;
		}

		// Sort deals
		if (sortConfig) {
			deals.sort((a, b) => {
				let aValue: number | string = 0;
				let bValue: number | string = 0;

				switch (sortConfig.key) {
					case "value":
						aValue = a.value;
						bValue = b.value;
						break;
					case "probability":
						aValue = a.probability;
						bValue = b.probability;
						break;
					case "stage":
						aValue = a.stage;
						bValue = b.stage;
						break;
					default:
						return 0;
				}

				if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
				if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
				return 0;
			});
		}

		return deals;
	}, [dealFilter, sortConfig, searchQuery, filterOwner]);

	// Calculate table summary
	const tableSummary = useMemo(
		() => getTableSummary(filteredDeals),
		[filteredDeals],
	);

	// Paginate deals
	const paginatedDeals = useMemo(() => {
		const startIndex = (currentPage - 1) * PAGE_SIZE;
		return filteredDeals.slice(startIndex, startIndex + PAGE_SIZE);
	}, [filteredDeals, currentPage]);

	const totalPages = Math.ceil(filteredDeals.length / PAGE_SIZE);

	// Reset page when filter changes
	const handleFilterChange = useCallback(
		(filter: string) => {
			setDealFilter(filter as DealFilter);
			setCurrentPage(1);
			addToast({
				type: "info",
				title: `Showing ${filter === "all" ? "all" : filter} deals`,
				duration: 2000,
			});
		},
		[addToast],
	);

	// Handle sort
	const handleSort = useCallback((key: string) => {
		setSortConfig((prev) => {
			if (prev?.key === key) {
				return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
			}
			return { key, direction: "desc" };
		});
	}, []);

	// Get deal counts for tabs
	const dealCounts = useMemo(
		() => ({
			all: mockDeals.length,
			open: mockDeals.filter(
				(d) => !["closed-won", "closed-lost"].includes(d.stage),
			).length,
			"at-risk": mockDeals.filter(
				(d) =>
					d.probability < 40 &&
					!["closed-won", "closed-lost"].includes(d.stage),
			).length,
			won: mockDeals.filter((d) => d.stage === "closed-won").length,
			lost: mockDeals.filter((d) => d.stage === "closed-lost").length,
		}),
		[],
	);

	// Calculate total pipeline
	const totalPipeline = useMemo(() => {
		return Object.values(pipelineStats).reduce((a, b) => a + b, 0);
	}, []);

	// Get leaderboard data
	const leaderboardData = useMemo(() => calculateLeaderboard(), []);


	// Sparkline data for each metric
	const sparklineData = [
		metricSparklines.activeDeals,
		metricSparklines.pipelineValue,
		metricSparklines.atRiskDeals,
		metricSparklines.avgCloseTime,
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<Breadcrumb
					items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
					className="mb-6"
				/>

				{/* Header Section */}
				<div className="flex items-start justify-between mb-8">
					<div>
						<Heading as="h1" size="3xl" weight="medium" className="mb-2">
							Revenue Dashboard
						</Heading>
						<Text color="muted" size="lg">
							Keep every deal on track with real-time alerts and insights
						</Text>
					</div>
					<div className="flex items-center gap-4">
						{/* View Toggle */}
						<div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
							<IconButton
								icon={<List className="h-4 w-4" />}
								variant={viewMode === "table" ? "primary" : "ghost"}
								size="sm"
								onClick={() => setViewMode("table")}
								aria-label="Table view"
							/>
							<IconButton
								icon={<LayoutGrid className="h-4 w-4" />}
								variant={viewMode === "cards" ? "primary" : "ghost"}
								size="sm"
								onClick={() => setViewMode("cards")}
								aria-label="Card view"
							/>
						</div>
						<DropdownButton
							label={
								DATE_FILTER_OPTIONS.find((o) => o.value === dateFilter)
									?.label || "This Quarter"
							}
							items={DATE_FILTER_OPTIONS}
							value={dateFilter}
							onChange={setDateFilter}
						/>
					</div>
				</div>

				{/* Stats Row with Sparklines */}
				{isLoading ? (
					<StatGroup columns={4} className="mb-8">
						{[1, 2, 3, 4].map((i) => (
							<SkeletonMetric key={i} />
						))}
					</StatGroup>
				) : (
					<StatGroup columns={4} className="mb-8">
						{mockMetrics.map((metric, index) => {
							const Icon = [Users, DollarSign, AlertTriangle, Clock][index];

							return (
								<Tooltip
									key={metric.label}
									content={metric.description || ""}
									position="bottom"
								>
									<StatCard
										label={metric.label}
										value={metric.value}
										trend={
											metric.trend
												? {
														value: metric.trend.value,
														direction: metric.trend.direction,
													}
												: undefined
										}
										icon={<Icon className="h-5 w-5" />}
										chart={sparklineData[index]}
									/>
								</Tooltip>
							);
						})}
					</StatGroup>
				)}

				{/* Quota & Leaderboard Row */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					<QuotaProgress
						current={quotaData.current}
						target={quotaData.target}
						label={`${quotaData.period} Revenue Target`}
						variant="detailed"
						milestones={[250000, 500000, 750000, 1000000]}
					/>
					<Leaderboard
						title="Top Performers"
						entries={leaderboardData.slice(0, 5)}
						formatValue={(val: number) => formatCurrency(val)}
						showTrend
					/>
				</div>

				{/* Featured Deal & Pipeline Distribution */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					<Metric
						label="Deal of the Week"
						value={formatCurrency(featuredDeal.value)}
						trend={{ value: 15.2, direction: "up" }}
						description={`${featuredDeal.name} - ${featuredDeal.company}`}
						icon={<Trophy className="h-6 w-6" />}
						gradient
					/>
					<div className="lg:col-span-2">
						<Card className="p-6 h-full">
							<Heading as="h3" size="lg" className="mb-4">
								Pipeline Distribution
							</Heading>
							<div className="flex items-end gap-8">
								<SparkBar data={stageDistribution} width={200} height={60} />
								<StatsList items={quickStats} variant="inline" />
							</div>
						</Card>
					</div>
				</div>

				{/* Filters Panel */}
				<Card className="mb-6 p-4">
					<div className="flex items-start gap-6 flex-wrap">
						<div className="flex-1 min-w-[200px]">
							<Label htmlFor="search">Search Deals</Label>
							{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use form field */}
							<Input
								id="search"
								placeholder="Search by name or company..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Caption>Filter deals by name or company</Caption>
						</div>
						<div className="w-48">
							<Label htmlFor="owner">Owner</Label>
							{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use form field */}
							<Select
								id="owner"
								options={[{ value: "", label: "All Owners" }, ...ownerOptions]}
								value={filterOwner}
								onChange={setFilterOwner}
							/>
						</div>
					</div>
				</Card>

				{/* Tabbed Deals Section */}
				<Tabs
					defaultValue="all"
					value={dealFilter}
					onChange={handleFilterChange}
				>
					<div className="flex items-center justify-between mb-4">
						<TabList>
							<TabTrigger value="all">
								All Deals
								<Badge variant="default" size="sm" className="ml-2">
									{dealCounts.all}
								</Badge>
							</TabTrigger>
							<TabTrigger value="open">
								Open
								<Badge variant="info" size="sm" className="ml-2">
									{dealCounts.open}
								</Badge>
							</TabTrigger>
							<TabTrigger value="at-risk">
								At Risk
								<Badge variant="error" size="sm" className="ml-2">
									{dealCounts["at-risk"]}
								</Badge>
							</TabTrigger>
							<TabTrigger value="won">
								Won
								<Badge variant="success" size="sm" className="ml-2">
									{dealCounts.won}
								</Badge>
							</TabTrigger>
							<TabTrigger value="lost">
								Lost
								<Badge variant="default" size="sm" className="ml-2">
									{dealCounts.lost}
								</Badge>
							</TabTrigger>
						</TabList>
					</div>
				</Tabs>

				{/* Deal Tabs and Content */}
				<Tabs
					defaultValue="all"
					value={dealFilter}
					onChange={handleFilterChange}
					className="mb-8"
				>
					<div>
						{/* Deals Table */}
						<TabContent value={dealFilter}>
							{paginatedDeals.length > 0 ? (
								viewMode === "cards" ? (
									/* Card Grid View */
									<div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
											{paginatedDeals.map((deal) => (
												<DealCard
													key={deal.id}
													name={deal.name}
													company={deal.company}
													value={deal.value}
													stage={deal.stage}
													probability={deal.probability}
													owner={deal.owner}
													closeDate={deal.expectedCloseDate}
													lastActivity={deal.lastActivity}
													onClick={() => handleViewDeal(deal)}
												/>
											))}
										</div>
										{/* Pagination for cards */}
										<div className="flex items-center justify-between py-4">
											<PaginationInfo
												currentPage={currentPage}
												pageSize={PAGE_SIZE}
												totalItems={filteredDeals.length}
											/>
											<Pagination
												currentPage={currentPage}
												totalPages={totalPages}
												onChange={setCurrentPage}
											/>
										</div>
									</div>
								) : (
									/* Table View */
									<Card>
										<Table>
											<TableHeader sticky>
												<TableRow>
													<TableHead>Deal</TableHead>
													<TableHead
														sortable
														sortDirection={
															sortConfig?.key === "value"
																? sortConfig.direction
																: null
														}
														onSort={() => handleSort("value")}
													>
														Value
													</TableHead>
													<TableHead>Progress</TableHead>
													<TableHead>Status</TableHead>
													<TableHead
														sortable
														sortDirection={
															sortConfig?.key === "probability"
																? sortConfig.direction
																: null
														}
														onSort={() => handleSort("probability")}
													>
														Probability
													</TableHead>
													<TableHead>Owner</TableHead>
													<TableHead className="w-12"> </TableHead>
												</TableRow>
											</TableHeader>
											{isLoading ? (
												<TableBody>
													{[1, 2, 3, 4, 5].map((i) => (
														<SkeletonTableRow key={i} columns={7} />
													))}
												</TableBody>
											) : (
												<TableBody>
													{paginatedDeals.map((deal) => (
														<TableRow
															key={deal.id}
															clickable
															onClick={() => handleViewDeal(deal)}
														>
															<TableCell>
																<div>
																	<Text
																		weight="medium"
																		className="text-gray-900"
																	>
																		{deal.name}
																	</Text>
																	<Text size="sm" color="muted">
																		{deal.company}
																	</Text>
																</div>
															</TableCell>
															<TableCell>
																<Text weight="semibold">
																	{formatCurrency(deal.value)}
																</Text>
															</TableCell>
															<TableCell>
																<StageIndicator
																	currentStage={deal.stage}
																	variant="compact"
																	showLabels={false}
																/>
															</TableCell>
															<TableCell>
																<Badge
																	variant={getStageBadgeVariant(deal.stage)}
																	size="sm"
																>
																	{formatStageName(deal.stage)}
																</Badge>
															</TableCell>
															<TableCell>
																<div className="flex items-center gap-2">
																	<ProgressBar
																		value={deal.probability}
																		variant={getProbabilityVariant(
																			deal.probability,
																		)}
																		className="w-16"
																	/>
																	<Text size="sm" color="muted">
																		{deal.probability}%
																	</Text>
																</div>
															</TableCell>
															<TableCell>
																<div className="flex items-center gap-2">
																	<Avatar name={deal.owner} size="sm" />
																	<Text size="sm" color="muted">
																		{deal.owner}
																	</Text>
																</div>
															</TableCell>
															<TableCell onClick={(e) => e.stopPropagation()}>
																<Dropdown
																	trigger={
																		<IconButton
																			icon={
																				<MoreHorizontal className="h-4 w-4" />
																			}
																			variant="ghost"
																			size="sm"
																			aria-label="Deal actions"
																		/>
																	}
																	items={[
																		{ label: "View Details", value: "view" },
																		{ label: "Edit Deal", value: "edit" },
																		{ label: "Mark as Won", value: "won" },
																		{
																			label: "Archive",
																			value: "archive",
																			destructive: true,
																		},
																	]}
																	onChange={(action) => {
																		if (action === "view") handleViewDeal(deal);
																		addToast({
																			type:
																				action === "archive"
																					? "warning"
																					: "success",
																			title:
																				action === "view"
																					? "Opening deal..."
																					: `Deal action: ${action}`,
																			description: deal.name,
																		});
																	}}
																	align="right"
																/>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											)}
											<TableFooter>
												<TableRow>
													<TableCell>
														<Text weight="semibold">
															Total: {filteredDeals.length} deals
														</Text>
													</TableCell>
													<TableCell>
														<Text weight="semibold">
															{formatCurrency(tableSummary.totalValue)}
														</Text>
													</TableCell>
													<TableCell> </TableCell>
													<TableCell> </TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															<Text size="sm" color="muted">
																Avg:
															</Text>
															<TrendIndicator
																value={tableSummary.avgProbability}
																format="percent"
																showIcon={false}
															/>
														</div>
													</TableCell>
													<TableCell> </TableCell>
													<TableCell> </TableCell>
												</TableRow>
											</TableFooter>
										</Table>

										{/* Pagination */}
										<div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
											<PaginationInfo
												currentPage={currentPage}
												pageSize={PAGE_SIZE}
												totalItems={filteredDeals.length}
											/>
											<Pagination
												currentPage={currentPage}
												totalPages={totalPages}
												onChange={setCurrentPage}
											/>
										</div>
									</Card>
								)
							) : (
								<EmptyState
									variant="no-results"
									title="No deals found"
									description={`No ${dealFilter === "all" ? "" : dealFilter} deals to display.`}
									action={
										dealFilter !== "all" ? (
											<Button
												variant="secondary"
												onClick={() => handleFilterChange("all")}
											>
												View All Deals
											</Button>
										) : undefined
									}
								/>
							)}
						</TabContent>

						{/* Real-time Alerts */}
						<Card className="p-6 mt-8">
							<div className="flex items-center justify-between mb-4">
								<Heading as="h3" size="lg">
									Real-time Alerts
								</Heading>
								<button
									type="button"
									className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
								>
									View All
									<ArrowRight className="ml-1 h-3 w-3" />
								</button>
							</div>
							<div className="space-y-3">
								{visibleAlerts.slice(0, 4).map((alert) => {
									const alertVariant = getAlertVariant(alert.type);
									return (
										<Alert
											key={alert.id}
											variant={alertVariant}
											title={alert.title}
											description={alert.description}
											onDismiss={() => handleDismiss(alert.id)}
											className="!p-3"
										/>
									);
								})}
							</div>
						</Card>
					</div>
				</Tabs>

				{/* Pipeline Summary & Active Team - Full Width */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					{/* Pipeline Summary */}
					<Card className="p-6">
						<div className="flex items-center justify-between mb-4">
							<Heading as="h3" size="lg">
								Pipeline Summary
							</Heading>
							<TrendIndicator value={18} size="sm" />
						</div>
						<Divider className="mb-4" />
						<div className="space-y-4">
							{Object.entries(pipelineStats).map(([stage, count]) => (
								<div key={stage}>
									<div className="flex items-center justify-between mb-1.5">
										<Text size="sm" weight="medium" color="muted">
											{formatStageName(stage)}
										</Text>
										<Badge variant={getStageBadgeVariant(stage)} size="sm">
											{count}
										</Badge>
									</div>
									<ProgressBar
										value={(count / totalPipeline) * 100}
										variant={
											stage === "closed-won"
												? "success"
												: stage === "closed-lost"
													? "error"
													: "default"
										}
									/>
								</div>
							))}
						</div>
						<div className="mt-4 pt-4 border-t border-gray-200">
							<div className="flex items-center justify-between">
								<Text size="sm" weight="medium" color="muted">
									Total Pipeline
								</Text>
								<Text size="lg" weight="bold">
									{totalPipeline}
								</Text>
							</div>
						</div>
					</Card>

					{/* Team Section */}
					<Card className="p-6">
						<Heading as="h3" size="lg" className="mb-4">
							Active Team
						</Heading>
						<AvatarGroup items={teamMembers} max={5} size="md" />
						<Divider className="my-4" variant="dashed" />
						<StatsList items={quickStats.slice(0, 3)} />
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
	);
}
