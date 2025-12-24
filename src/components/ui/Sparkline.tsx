import type { HTMLAttributes } from "react";

export interface SparklineProps extends HTMLAttributes<SVGSVGElement> {
	data: number[];
	width?: number;
	height?: number;
	strokeWidth?: number;
	color?: "primary" | "success" | "warning" | "error" | "gray";
	showArea?: boolean;
	showDots?: boolean;
	animated?: boolean;
}

const colors = {
	primary: "#5dcb8a",
	success: "#5dcb8a",
	warning: "#F59E0B",
	error: "#EF4444",
	gray: "#6B7280",
};

export function Sparkline({
	data,
	width = 120,
	height = 32,
	strokeWidth = 2,
	color = "primary",
	showArea = false,
	showDots = false,
	animated = false,
	className = "",
	...props
}: SparklineProps) {
	if (!data.length) return null;

	const padding = showDots ? 4 : 2;
	const chartWidth = width - padding * 2;
	const chartHeight = height - padding * 2;

	const min = Math.min(...data);
	const max = Math.max(...data);
	const range = max - min || 1;

	// Calculate points
	const points = data.map((value, index) => {
		const x = padding + (index / (data.length - 1)) * chartWidth;
		const y = padding + chartHeight - ((value - min) / range) * chartHeight;
		return { x, y, value };
	});

	// Create SVG path
	const pathD = points
		.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
		.join(" ");

	// Create area path
	const areaD = showArea
		? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`
		: "";

	const strokeColor = colors[color];

	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			className={className}
			aria-hidden="true"
			{...props}
		>
			{/* Area fill */}
			{showArea && <path d={areaD} fill={strokeColor} opacity={0.1} />}

			{/* Line */}
			<path
				d={pathD}
				fill="none"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				className={animated ? "animate-draw" : ""}
				style={
					animated
						? {
								strokeDasharray: chartWidth * 2,
								strokeDashoffset: chartWidth * 2,
								animation: "draw 1s ease-out forwards",
							}
						: undefined
				}
			/>

			{/* Dots */}
			{showDots &&
				points.map((point) => (
					<circle
						key={`dot-${point.x}-${point.y}`}
						cx={point.x}
						cy={point.y}
						r={3}
						fill="white"
						stroke={strokeColor}
						strokeWidth={2}
					/>
				))}

			{/* End dot (always show) */}
			{!showDots && (
				<circle
					cx={points[points.length - 1].x}
					cy={points[points.length - 1].y}
					r={3}
					fill={strokeColor}
				/>
			)}
		</svg>
	);
}

// Mini Bar Chart variant
export interface SparkBarProps extends HTMLAttributes<SVGSVGElement> {
	data: number[];
	width?: number;
	height?: number;
	gap?: number;
	color?: "primary" | "success" | "warning" | "error" | "gray";
}

export function SparkBar({
	data,
	width = 80,
	height = 24,
	gap = 2,
	color = "primary",
	className = "",
	...props
}: SparkBarProps) {
	if (!data.length) return null;

	const max = Math.max(...data);
	const barWidth = (width - (data.length - 1) * gap) / data.length;
	const strokeColor = colors[color];

	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			className={className}
			aria-hidden="true"
			{...props}
		>
			{data.map((value, index) => {
				const barHeight = (value / max) * height;
				const x = index * (barWidth + gap);
				const y = height - barHeight;

				return (
					<rect
						key={`bar-${x}`}
						x={x}
						y={y}
						width={barWidth}
						height={barHeight}
						fill={strokeColor}
						rx={1}
						opacity={index === data.length - 1 ? 1 : 0.6}
					/>
				);
			})}
		</svg>
	);
}
