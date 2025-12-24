import type { HTMLAttributes } from "react";
import { Avatar } from "./Avatar";

export interface AvatarGroupItem {
	name: string;
	src?: string;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
	items: AvatarGroupItem[];
	max?: number;
	size?: "sm" | "md" | "lg" | "xl";
	spacing?: "tight" | "normal" | "loose";
}

export function AvatarGroup({
	items,
	max = 4,
	size = "md",
	spacing = "normal",
	className = "",
	...props
}: AvatarGroupProps) {
	const visibleItems = items.slice(0, max);
	const remainingCount = items.length - max;

	const spacings = {
		tight: "space-x-1",
		normal: "space-x-2",
		loose: "space-x-3",
	};

	const overflowSizes = {
		sm: "h-8 w-8 text-xs",
		md: "h-10 w-10 text-sm",
		lg: "h-12 w-12 text-sm",
		xl: "h-16 w-16 text-base",
	};

	return (
		<div
			className={`flex items-center ${spacings[spacing]} ${className}`}
			{...props}
		>
			{visibleItems.map((item) => (
				<Avatar
					key={item.name}
					name={item.name}
					src={item.src}
					size={size}
					className="ring-2 ring-white"
				/>
			))}

			{remainingCount > 0 && (
				<div
					className={`
            inline-flex items-center justify-center
            bg-gray-100 text-gray-600 font-medium
            rounded-full ring-2 ring-white
            ${overflowSizes[size]}
          `}
				>
					+{remainingCount}
				</div>
			)}
		</div>
	);
}
