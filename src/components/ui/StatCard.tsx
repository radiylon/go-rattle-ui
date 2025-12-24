import type { HTMLAttributes, ReactNode } from "react";
import { Sparkline } from "./Sparkline";
import { TrendIndicator } from "./TrendIndicator";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
	label: string;
	value: string | number;
	description?: string;
	trend?: {
		value: number;
		direction?: "up" | "down";
		label?: string;
	};
	icon?: ReactNode;
	chart?: number[];
	variant?: "default" | "outlined" | "filled" | "gradient";
	size?: "sm" | "md" | "lg";
	action?: ReactNode;
}

export function StatCard({
	label,
	value,
	description,
	trend,
	icon,
	chart,
	variant = "default",
	size = "md",
	action,
	className = "",
	...props
}: StatCardProps) {
	const variants = {
		default: "bg-white border border-gray-200",
		outlined: "bg-transparent border-2 border-gray-200",
		filled: "bg-gray-50 border border-gray-100",
		gradient:
			"bg-gradient-to-br from-rattle-green-bg to-white border border-rattle-green-lighter",
	};

	const sizes = {
		sm: {
			padding: "p-4",
			label: "text-xs",
			value: "text-xl",
			description: "text-xs",
		},
		md: {
			padding: "p-5",
			label: "text-sm",
			value: "text-2xl",
			description: "text-sm",
		},
		lg: {
			padding: "p-6",
			label: "text-sm",
			value: "text-3xl",
			description: "text-sm",
		},
	};

	const sizeStyles = sizes[size];

	return (
		<div
			className={`rounded-lg shadow-sm ${variants[variant]} ${sizeStyles.padding} ${className}`}
			{...props}
		>
			{/* Header Row */}
			<div className="flex items-start justify-between mb-2">
				<span className={`font-medium text-gray-500 ${sizeStyles.label}`}>
					{label}
				</span>
				{icon && (
					<div className="p-2 rounded-lg bg-gray-50 text-gray-500">{icon}</div>
				)}
			</div>

			{/* Value Row */}
			<div className="flex items-end justify-between gap-4">
				<div className="min-w-0">
					<div className={`font-bold text-gray-900 ${sizeStyles.value}`}>
						{value}
					</div>
					{description && (
						<p className={`text-gray-500 mt-1 ${sizeStyles.description}`}>
							{description}
						</p>
					)}
					{trend && (
						<div className="flex items-center gap-2 mt-2">
							<TrendIndicator
								value={trend.value}
								direction={trend.direction}
								size="sm"
							/>
							{trend.label && (
								<span className="text-xs text-gray-500">{trend.label}</span>
							)}
						</div>
					)}
				</div>

				{/* Chart or Action */}
				{chart && chart.length > 0 && (
					<Sparkline
						data={chart}
						width={80}
						height={32}
						color={trend?.direction === "down" ? "error" : "primary"}
						showArea
					/>
				)}
				{action && !chart && <div className="flex-shrink-0">{action}</div>}
			</div>
		</div>
	);
}

// Stat Group for displaying multiple stats in a row
export interface StatGroupProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	columns?: 2 | 3 | 4 | 5;
}

export function StatGroup({
	children,
	columns = 4,
	className = "",
	...props
}: StatGroupProps) {
	const columnClasses = {
		2: "grid-cols-1 sm:grid-cols-2",
		3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
		5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
	};

	return (
		<div
			className={`grid gap-4 ${columnClasses[columns]} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}
