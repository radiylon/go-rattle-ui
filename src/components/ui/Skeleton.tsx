import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "text" | "circular" | "rectangular" | "rounded";
	width?: string | number;
	height?: string | number;
	lines?: number;
	animate?: boolean;
}

export function Skeleton({
	variant = "text",
	width,
	height,
	lines = 1,
	animate = true,
	className = "",
	...props
}: SkeletonProps) {
	const baseStyles = `bg-gray-200 ${animate ? "animate-pulse" : ""}`;

	const variants = {
		text: "rounded h-4",
		circular: "rounded-full",
		rectangular: "",
		rounded: "rounded-lg",
	};

	const style = {
		width: typeof width === "number" ? `${width}px` : width,
		height: typeof height === "number" ? `${height}px` : height,
	};

	if (variant === "text" && lines > 1) {
		return (
			<div className={`space-y-2 ${className}`} {...props}>
				{Array.from({ length: lines }).map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton elements
						key={i}
						className={`${baseStyles} ${variants.text}`}
						style={{
							...style,
							width: i === lines - 1 ? "75%" : style.width,
						}}
					/>
				))}
			</div>
		);
	}

	return (
		<div
			className={`${baseStyles} ${variants[variant]} ${className}`}
			style={style}
			{...props}
		/>
	);
}

// Skeleton Card
export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
	hasHeader?: boolean;
	hasFooter?: boolean;
	lines?: number;
}

export function SkeletonCard({
	hasHeader = false,
	hasFooter = false,
	lines = 3,
	className = "",
	...props
}: SkeletonCardProps) {
	return (
		<div
			className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
			{...props}
		>
			{hasHeader && (
				<div className="px-6 py-4 border-b border-gray-200">
					<Skeleton variant="text" width="40%" height={20} />
				</div>
			)}
			<div className="px-6 py-4">
				<Skeleton variant="text" lines={lines} />
			</div>
			{hasFooter && (
				<div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
					<Skeleton variant="text" width="30%" />
				</div>
			)}
		</div>
	);
}

// Skeleton Table Row
export interface SkeletonTableRowProps
	extends HTMLAttributes<HTMLTableRowElement> {
	columns?: number;
}

export function SkeletonTableRow({
	columns = 5,
	className = "",
	...props
}: SkeletonTableRowProps) {
	return (
		<tr className={className} {...props}>
			{Array.from({ length: columns }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton elements
				<td key={i} className="px-6 py-4">
					<Skeleton variant="text" width={i === 0 ? "80%" : "60%"} />
				</td>
			))}
		</tr>
	);
}

// Skeleton Metric
export function SkeletonMetric({ className = "" }: { className?: string }) {
	return (
		<div
			className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
		>
			<div className="flex items-center justify-between mb-4">
				<Skeleton variant="text" width={100} />
				<Skeleton variant="circular" width={24} height={24} />
			</div>
			<Skeleton variant="text" width={80} height={32} className="mb-2" />
			<Skeleton variant="text" width={120} />
		</div>
	);
}
