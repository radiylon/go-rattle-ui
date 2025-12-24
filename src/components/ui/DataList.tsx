import type { HTMLAttributes, ReactNode } from "react";

// Data List - Key-value pairs display
export interface DataListItem {
	label: string;
	value: ReactNode;
	description?: string;
}

export interface DataListProps extends HTMLAttributes<HTMLDListElement> {
	items: DataListItem[];
	variant?: "default" | "horizontal" | "striped" | "card";
	columns?: 1 | 2 | 3;
}

export function DataList({
	items,
	variant = "default",
	columns = 1,
	className = "",
	...props
}: DataListProps) {
	const columnClasses = {
		1: "grid-cols-1",
		2: "grid-cols-1 sm:grid-cols-2",
		3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
	};

	if (variant === "horizontal") {
		return (
			<dl
				className={`grid gap-4 ${columnClasses[columns]} ${className}`}
				{...props}
			>
				{items.map((item) => (
					<div
						key={item.label}
						className="flex items-start justify-between gap-4 py-2"
					>
						<dt className="text-sm text-gray-500 flex-shrink-0">
							{item.label}
						</dt>
						<dd className="text-sm font-medium text-gray-900 text-right">
							{item.value}
							{item.description && (
								<span className="block text-xs text-gray-500 font-normal mt-0.5">
									{item.description}
								</span>
							)}
						</dd>
					</div>
				))}
			</dl>
		);
	}

	if (variant === "striped") {
		return (
			<dl
				className={`rounded-lg border border-gray-200 overflow-hidden ${className}`}
				{...props}
			>
				{items.map((item, index) => (
					<div
						key={item.label}
						className={`px-4 py-3 flex items-start justify-between gap-4 ${
							index % 2 === 0 ? "bg-white" : "bg-gray-50"
						}`}
					>
						<dt className="text-sm text-gray-500">{item.label}</dt>
						<dd className="text-sm font-medium text-gray-900 text-right">
							{item.value}
						</dd>
					</div>
				))}
			</dl>
		);
	}

	if (variant === "card") {
		return (
			<dl
				className={`grid gap-4 ${columnClasses[columns]} ${className}`}
				{...props}
			>
				{items.map((item) => (
					<div
						key={item.label}
						className="bg-white rounded-lg border border-gray-200 p-4"
					>
						<dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
							{item.label}
						</dt>
						<dd className="mt-1 text-lg font-semibold text-gray-900">
							{item.value}
						</dd>
						{item.description && (
							<dd className="mt-1 text-sm text-gray-500">{item.description}</dd>
						)}
					</div>
				))}
			</dl>
		);
	}

	// Default variant
	return (
		<dl
			className={`grid gap-4 ${columnClasses[columns]} ${className}`}
			{...props}
		>
			{items.map((item) => (
				<div
					key={item.label}
					className="py-2 border-b border-gray-100 last:border-0"
				>
					<dt className="text-sm text-gray-500 mb-1">{item.label}</dt>
					<dd className="text-sm font-medium text-gray-900">
						{item.value}
						{item.description && (
							<span className="block text-xs text-gray-500 font-normal mt-0.5">
								{item.description}
							</span>
						)}
					</dd>
				</div>
			))}
		</dl>
	);
}

// Stats List - For displaying summary stats
export interface StatsListItem {
	label: string;
	value: string | number;
	change?: {
		value: number;
		direction: "up" | "down";
	};
}

export interface StatsListProps extends HTMLAttributes<HTMLDivElement> {
	items: StatsListItem[];
	variant?: "default" | "inline";
}

export function StatsList({
	items,
	variant = "default",
	className = "",
	...props
}: StatsListProps) {
	if (variant === "inline") {
		return (
			<div className={`flex items-center gap-6 ${className}`} {...props}>
				{items.map((item) => (
					<div key={item.label} className="flex items-center gap-2">
						<span className="text-sm text-gray-500">{item.label}:</span>
						<span className="text-sm font-semibold text-gray-900">
							{item.value}
						</span>
						{item.change && (
							<span
								className={`text-xs font-medium ${
									item.change.direction === "up"
										? "text-[#5dcb8a]"
										: "text-red-500"
								}`}
							>
								{item.change.direction === "up" ? "+" : "-"}
								{item.change.value}%
							</span>
						)}
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={`divide-y divide-gray-100 ${className}`} {...props}>
			{items.map((item) => (
				<div key={item.label} className="flex items-center justify-between py-3">
					<span className="text-sm text-gray-600">{item.label}</span>
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold text-gray-900">
							{item.value}
						</span>
						{item.change && (
							<span
								className={`text-xs font-medium ${
									item.change.direction === "up"
										? "text-[#5dcb8a]"
										: "text-red-500"
								}`}
							>
								{item.change.direction === "up" ? "+" : "-"}
								{item.change.value}%
							</span>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
