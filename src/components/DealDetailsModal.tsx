import { Mail } from "lucide-react";
import type { Deal } from "../data/mockData";
import type { DealStage } from "../types";
import {
	formatCurrency,
	formatDate,
	formatStageName,
} from "../utils/formatting";
import {
	getProbabilityVariant,
	getStageBadgeVariant,
} from "../utils/variant-helpers";
import {
	ActivityFeed,
	Avatar,
	Badge,
	Card,
	DataList,
	Divider,
	Heading,
	Modal,
	ProgressBar,
	StageIndicator,
	Text,
} from "./ui";
import type { ActivityItem } from "./ui/ActivityFeed";

interface DealDetailsModalProps {
	deal: Deal | null;
	isOpen: boolean;
	onClose: () => void;
}

// Pipeline stages in order
const PIPELINE_STAGES: DealStage[] = [
	"prospecting",
	"qualification",
	"proposal",
	"negotiation",
	"closed-won",
];

export function DealDetailsModal({
	deal,
	isOpen,
	onClose,
}: DealDetailsModalProps) {
	if (!deal) return null;

	// Get current stage index for stage indicator
	const currentStageIndex = PIPELINE_STAGES.indexOf(deal.stage as DealStage);
	const stageForIndicator =
		deal.stage === "closed-lost" ? "closed-won" : deal.stage;

	// Prepare key metrics for DataList
	const keyMetrics = [
		{
			label: "Deal Value",
			value: formatCurrency(deal.value),
		},
		{
			label: "Win Probability",
			value: (
				<div className="flex items-center gap-2">
					<ProgressBar
						value={deal.probability}
						variant={getProbabilityVariant(deal.probability)}
						className="w-20"
					/>
					<span className="font-semibold">{deal.probability}%</span>
				</div>
			),
		},
		...(deal.expectedCloseDate
			? [
					{
						label: "Expected Close",
						value: formatDate(deal.expectedCloseDate),
					},
				]
			: []),
		{
			label: "Owner",
			value: (
				<div className="flex items-center gap-2">
					<Avatar name={deal.owner} size="sm" />
					<span>{deal.owner}</span>
				</div>
			),
		},
	];

	// Convert deal activity to ActivityFeed format
	const activityItems: ActivityItem[] =
		deal.recentActivity?.map((activity, index) => ({
			id: `activity-${index}`,
			type: "deal-update" as const,
			title: activity.action,
			description: "",
			timestamp: activity.timestamp,
			user: { name: activity.user },
		})) || [];

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={deal.name}>
			<div className="bg-gray-50 min-h-full">
				{/* Header Section */}
				<div className="bg-gradient-to-r from-[#f5faf7] via-white to-white border-b border-gray-200 px-8 py-6 relative">
					{/* Green accent border */}
					<div className="absolute left-0 top-0 bottom-0 w-2 bg-[#5dcb8a]"></div>
					<div className="max-w-7xl mx-auto">
						<div className="mb-4">
							<Heading as="h1" size="3xl" weight="medium" className="mb-2">
								{deal.name}
							</Heading>
							<Text size="lg" color="muted" className="mb-3">
								{deal.company}
							</Text>
							<Badge variant={getStageBadgeVariant(deal.stage)}>
								{formatStageName(deal.stage)}
							</Badge>
						</div>

						{/* Stage Indicator */}
						{deal.stage !== "closed-lost" && (
							<StageIndicator
								currentStage={stageForIndicator as DealStage}
								variant="horizontal"
								className="mt-6"
							/>
						)}
						{deal.stage === "closed-lost" && (
							<div className="mt-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
								<Text size="sm" color="error" weight="medium">
									This deal was marked as Closed Lost
								</Text>
							</div>
						)}
					</div>
				</div>

				{/* Main Content */}
				<div className="max-w-7xl mx-auto px-8 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Left Column - Key Metrics */}
						<div className="lg:col-span-2 space-y-6">
							{/* Key Metrics Card */}
							<Card className="p-6">
								<Heading as="h2" size="xl" weight="medium" className="mb-6">
									Key Metrics
								</Heading>
								<DataList items={keyMetrics} variant="horizontal" columns={2} />
							</Card>

							{/* Contact Information */}
							{(deal.contactPerson || deal.contactEmail) && (
								<Card className="p-6">
									<Heading as="h2" size="xl" weight="medium" className="mb-6">
										Contact Information
									</Heading>
									<div className="space-y-4">
										{deal.contactPerson && (
											<div className="flex items-start gap-3">
												<Avatar name={deal.contactPerson} size="md" />
												<div>
													<Text weight="medium" className="text-gray-900">
														{deal.contactPerson}
													</Text>
													{deal.contactEmail && (
														<a
															href={`mailto:${deal.contactEmail}`}
															className="flex items-center gap-1.5 mt-1 text-sm text-[#5dcb8a] hover:underline"
														>
															<Mail className="h-3.5 w-3.5" />
															{deal.contactEmail}
														</a>
													)}
												</div>
											</div>
										)}
									</div>
								</Card>
							)}

							{/* Notes */}
							{deal.notes && (
								<Card className="p-6">
									<Heading as="h2" size="xl" weight="medium" className="mb-4">
										Notes
									</Heading>
									<Text color="muted" className="leading-relaxed">
										{deal.notes}
									</Text>
								</Card>
							)}

							{/* Next Steps */}
							{deal.nextSteps && deal.nextSteps.length > 0 && (
								<Card className="p-6">
									<Heading as="h2" size="xl" weight="medium" className="mb-6">
										Next Steps
									</Heading>
									<ul className="space-y-3">
										{deal.nextSteps.map((step, index) => (
											<li key={step} className="flex items-start gap-3">
												<div className="mt-0.5 shrink-0">
													<div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5dcb8a]/10 text-sm font-medium text-[#5dcb8a]">
														{index + 1}
													</div>
												</div>
												<Text color="muted" className="flex-1">
													{step}
												</Text>
											</li>
										))}
									</ul>
								</Card>
							)}

							{/* Recent Activity Timeline */}
							{deal.recentActivity && deal.recentActivity.length > 0 && (
								<Card className="p-6">
									<Heading as="h2" size="xl" weight="medium" className="mb-6">
										Recent Activity
									</Heading>
									<ActivityFeed activities={activityItems} variant="default" />
								</Card>
							)}
						</div>

						{/* Right Column - Quick Info */}
						<div className="space-y-6">
							<Card className="p-6">
								<Heading as="h3" size="lg" weight="medium" className="mb-4">
									Quick Info
								</Heading>
								<Divider className="mb-4" />
								<div className="space-y-4">
									<div>
										<Text size="sm" color="muted" className="mb-1">
											Last Activity
										</Text>
										<Text weight="medium">{deal.lastActivity}</Text>
									</div>
									<Divider variant="dashed" />
									<div>
										<Text size="sm" color="muted" className="mb-1">
											Deal ID
										</Text>
										<Text weight="medium" className="font-mono">
											{deal.id}
										</Text>
									</div>
									<Divider variant="dashed" />
									<div>
										<Text size="sm" color="muted" className="mb-1">
											Stage Progress
										</Text>
										<div className="flex items-center gap-2 mt-2">
											<ProgressBar
												value={
													deal.stage === "closed-won"
														? 100
														: deal.stage === "closed-lost"
															? 0
															: ((currentStageIndex + 1) /
																	PIPELINE_STAGES.length) *
																100
												}
												variant={
													deal.stage === "closed-won"
														? "success"
														: deal.stage === "closed-lost"
															? "error"
															: "default"
												}
											/>
											<Text size="sm" color="muted">
												{deal.stage === "closed-won"
													? "100%"
													: deal.stage === "closed-lost"
														? "0%"
														: `${Math.round(((currentStageIndex + 1) / PIPELINE_STAGES.length) * 100)}%`}
											</Text>
										</div>
									</div>
								</div>
							</Card>

							{/* Deal Health */}
							<Card className="p-6">
								<Heading as="h3" size="lg" weight="medium" className="mb-4">
									Deal Health
								</Heading>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<Text size="sm" color="muted">
											Probability
										</Text>
										<Badge
											variant={
												deal.probability >= 70
													? "success"
													: deal.probability >= 40
														? "warning"
														: "error"
											}
											size="sm"
										>
											{deal.probability >= 70
												? "High"
												: deal.probability >= 40
													? "Medium"
													: "Low"}
										</Badge>
									</div>
									<div className="flex items-center justify-between">
										<Text size="sm" color="muted">
											Engagement
										</Text>
										<Badge variant="success" size="sm">
											Active
										</Badge>
									</div>
									<div className="flex items-center justify-between">
										<Text size="sm" color="muted">
											Data Quality
										</Text>
										<Badge variant="info" size="sm">
											Complete
										</Badge>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
