import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger" | "ghost";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
	children: ReactNode;
}

export function Button({
	variant = "primary",
	size = "md",
	isLoading = false,
	disabled,
	className = "",
	children,
	...props
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-w-[10.5rem]";

	const variants = {
		primary:
			"bg-[#5dcb8a] text-black border-2 border-[#5dcb8a] hover:bg-[#6dd49a] hover:border-[#6dd49a] focus:ring-[#5dcb8a]",
		secondary:
			"bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
		danger:
			"bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700 focus:ring-red-500",
		ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
	};

	const sizes = {
		sm: "px-4 py-1.5 text-sm",
		md: "px-7 py-3 text-base",
		lg: "px-7 py-3 text-lg",
	};

	return (
		<button
			className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
			disabled={disabled || isLoading}
			aria-busy={isLoading}
			{...props}
		>
			{isLoading ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading...
				</>
			) : (
				children
			)}
		</button>
	);
}
