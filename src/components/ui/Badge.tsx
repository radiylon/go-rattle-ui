import type { HTMLAttributes, ReactNode } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: "success" | "warning" | "error" | "info" | "default";
	size?: "sm" | "md";
	children: ReactNode;
}

export function Badge({
	variant = "default",
	size = "md",
	className = "",
	children,
	...props
}: BadgeProps) {
	const variants = {
		success:
			"bg-rattle-green-lightest text-rattle-green-darkest border-rattle-green-lighter",
		warning: "bg-amber-100 text-amber-800 border-amber-200",
		error: "bg-red-100 text-red-800 border-red-200",
		info: "bg-blue-100 text-blue-800 border-blue-200",
		default: "bg-gray-100 text-gray-800 border-gray-200",
	};

	const sizes = {
		sm: "px-2 py-0.5 text-xs",
		md: "px-2.5 py-1 text-sm",
	};

	return (
		<span
			className={`inline-flex items-center font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
			{...props}
		>
			{children}
		</span>
	);
}
