import { Award, Medal, Trophy } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { Avatar } from "./Avatar";
import { TrendIndicator } from "./TrendIndicator";

export interface LeaderboardEntry {
	id: string;
	name: string;
	value: number;
	subtitle?: string;
	avatar?: string;
	trend?: number;
	metadata?: Record<string, ReactNode>;
}

export interface LeaderboardProps extends HTMLAttributes<HTMLDivElement> {
	entries: LeaderboardEntry[];
	title?: string;
	valueLabel?: string;
	formatValue?: (value: number) => string;
	showRank?: boolean;
	showTrend?: boolean;
	maxEntries?: number;
	highlightTop?: number;
	variant?: "default" | "compact" | "detailed";
}

const defaultFormatValue = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: value >= 1000000 ? "compact" : "standard",
		maximumFractionDigits: value >= 1000000 ? 1 : 0,
	}).format(value);

const rankIcons = [
	{ icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
	{ icon: Medal, color: "text-gray-400", bg: "bg-gray-50" },
	{ icon: Award, color: "text-amber-700", bg: "bg-amber-50" },
];

export function Leaderboard({
	entries,
	title,
	valueLabel = "Revenue",
	formatValue = defaultFormatValue,
	showRank = true,
	showTrend = true,
	maxEntries = 10,
	highlightTop = 3,
	variant = "default",
	className = "",
	...props
}: LeaderboardProps) {
	const displayEntries = entries.slice(0, maxEntries);

	if (variant === "compact") {
		return (
			<div className={className} {...props}>
				{title && <h4 className="font-medium text-gray-900 mb-3">{title}</h4>}
				<div className="space-y-2">
					{displayEntries.map((entry, index) => (
						<div
							key={entry.id}
							className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
						>
							{showRank && (
								<span
									className={`
                  w-5 text-center text-sm font-medium
                  ${index < highlightTop ? "text-[#5dcb8a]" : "text-gray-400"}
                `}
								>
									{index + 1}
								</span>
							)}
							<Avatar name={entry.name} src={entry.avatar} size="sm" />
							<span className="flex-1 text-sm font-medium text-gray-900 truncate">
								{entry.name}
							</span>
							<span className="text-sm font-semibold text-gray-900">
								{formatValue(entry.value)}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (variant === "detailed") {
		return (
			<div
				className={`bg-white rounded-lg border border-gray-200 ${className}`}
				{...props}
			>
				{title && (
					<div className="px-5 py-4 border-b border-gray-100">
						<h4 className="font-medium text-gray-900">{title}</h4>
					</div>
				)}
				<div className="divide-y divide-gray-100">
					{displayEntries.map((entry, index) => {
						const isTop = index < highlightTop;
						const RankIcon = rankIcons[index]?.icon;

						return (
							<div
								key={entry.id}
								className={`px-5 py-4 ${isTop ? "bg-rattle-green-bg" : ""}`}
							>
								<div className="flex items-center gap-4">
									{/* Rank */}
									{showRank && (
										<div className="flex-shrink-0 w-8">
											{index < 3 && RankIcon ? (
												<div
													className={`p-1.5 rounded-full ${rankIcons[index].bg}`}
												>
													<RankIcon
														className={`h-4 w-4 ${rankIcons[index].color}`}
													/>
												</div>
											) : (
												<span className="text-lg font-bold text-gray-400">
													{index + 1}
												</span>
											)}
										</div>
									)}

									{/* Avatar & Info */}
									<Avatar name={entry.name} src={entry.avatar} size="md" />
									<div className="flex-1 min-w-0">
										<div className="font-medium text-gray-900">
											{entry.name}
										</div>
										{entry.subtitle && (
											<div className="text-sm text-gray-500">
												{entry.subtitle}
											</div>
										)}
									</div>

									{/* Value & Trend */}
									<div className="text-right">
										<div className="font-semibold text-gray-900">
											{formatValue(entry.value)}
										</div>
										{showTrend && entry.trend !== undefined && (
											<TrendIndicator value={entry.trend} size="sm" />
										)}
									</div>
								</div>

								{/* Metadata */}
								{entry.metadata && (
									<div className="flex items-center gap-4 mt-3 pl-12 text-sm text-gray-500">
										{Object.entries(entry.metadata).map(([key, value]) => (
											<div key={key}>
												<span className="font-medium">{key}:</span> {value}
											</div>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	// Default variant
	return (
		<div className={className} {...props}>
			{title && <h4 className="font-medium text-gray-900 mb-4">{title}</h4>}
			<div className="space-y-3">
				{displayEntries.map((entry, index) => {
					const isTop = index < highlightTop;

					return (
						<div
							key={entry.id}
							className={`
                flex items-center gap-3 p-3 rounded-lg border
                ${isTop ? "border-rattle-green-lighter bg-rattle-green-bg" : "border-gray-200 bg-white"}
              `}
						>
							{/* Rank */}
							{showRank && (
								<div
									className={`
                  flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
                  ${isTop ? "bg-[#5dcb8a] text-white" : "bg-gray-100 text-gray-500"}
                `}
								>
									{index + 1}
								</div>
							)}

							{/* Avatar */}
							<Avatar name={entry.name} src={entry.avatar} size="sm" />

							{/* Info */}
							<div className="flex-1 min-w-0">
								<div className="font-medium text-gray-900 truncate">
									{entry.name}
								</div>
								{entry.subtitle && (
									<div className="text-xs text-gray-500 truncate">
										{entry.subtitle}
									</div>
								)}
							</div>

							{/* Value & Trend */}
							<div className="flex items-center gap-2">
								{showTrend && entry.trend !== undefined && (
									<TrendIndicator
										value={entry.trend}
										size="sm"
										showValue={false}
									/>
								)}
								<span className="font-semibold text-gray-900">
									{formatValue(entry.value)}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
