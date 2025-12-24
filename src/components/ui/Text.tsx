import type { HTMLAttributes, ReactNode } from "react";

// Heading Component
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	weight?: "normal" | "medium" | "semibold" | "bold";
	children: ReactNode;
}

export function Heading({
	as: Component = "h2",
	size,
	weight = "medium",
	children,
	className = "",
	...props
}: HeadingProps) {
	// Default sizes based on heading level
	const defaultSizes = {
		h1: "3xl",
		h2: "2xl",
		h3: "xl",
		h4: "lg",
		h5: "md",
		h6: "sm",
	} as const;

	const effectiveSize = size ?? defaultSizes[Component];

	const sizes = {
		xs: "text-xs",
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
		xl: "text-xl",
		"2xl": "text-2xl",
		"3xl": "text-3xl",
		"4xl": "text-4xl",
	};

	const weights = {
		normal: "font-normal",
		medium: "font-medium",
		semibold: "font-semibold",
		bold: "font-bold",
	};

	return (
		<Component
			className={`text-gray-900 ${sizes[effectiveSize]} ${weights[weight]} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
}

// Text Component
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	as?: "p" | "span" | "div" | "label";
	size?: "xs" | "sm" | "md" | "lg";
	weight?: "normal" | "medium" | "semibold" | "bold";
	color?: "default" | "muted" | "subtle" | "success" | "warning" | "error";
	truncate?: boolean;
	children: ReactNode;
}

export function Text({
	as: Component = "p",
	size = "md",
	weight = "normal",
	color = "default",
	truncate = false,
	children,
	className = "",
	...props
}: TextProps) {
	const sizes = {
		xs: "text-xs",
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	const weights = {
		normal: "font-normal",
		medium: "font-medium",
		semibold: "font-semibold",
		bold: "font-bold",
	};

	const colors = {
		default: "text-gray-900",
		muted: "text-gray-600",
		subtle: "text-gray-500",
		success: "text-[#5dcb8a]",
		warning: "text-amber-600",
		error: "text-red-600",
	};

	return (
		<Component
			className={`
        ${sizes[size]} ${weights[weight]} ${colors[color]}
        ${truncate ? "truncate" : ""}
        ${className}
      `}
			{...(props as React.HTMLAttributes<HTMLElement>)}
		>
			{children}
		</Component>
	);
}

// Label Component
export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
	htmlFor?: string;
	required?: boolean;
	children: ReactNode;
}

export function Label({
	htmlFor,
	required = false,
	children,
	className = "",
	...props
}: LabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}
			{...props}
		>
			{children}
			{required && <span className="text-red-500 ml-1">*</span>}
		</label>
	);
}

// Caption/Helper Text
export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: "default" | "error" | "success";
	children: ReactNode;
}

export function Caption({
	variant = "default",
	children,
	className = "",
	...props
}: CaptionProps) {
	const variants = {
		default: "text-gray-500",
		error: "text-red-600",
		success: "text-[#5dcb8a]",
	};

	return (
		<span className={`text-xs ${variants[variant]} ${className}`} {...props}>
			{children}
		</span>
	);
}
