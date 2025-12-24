import type { HTMLAttributes } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	name?: string;
	src?: string;
	size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({
	name = "",
	src,
	size = "md",
	className = "",
	...props
}: AvatarProps) {
	const sizes = {
		sm: "h-8 w-8 text-xs",
		md: "h-10 w-10 text-sm",
		lg: "h-12 w-12 text-base",
		xl: "h-16 w-16 text-lg",
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div
			className={`${sizes[size]} rounded-full bg-[#5dcb8a] flex items-center justify-center text-white font-semibold shrink-0 ${className}`}
			{...props}
		>
			{src ? (
				<img
					src={src}
					alt={name}
					className="h-full w-full rounded-full object-cover"
				/>
			) : (
				<span>{getInitials(name || "U")}</span>
			)}
		</div>
	);
}
