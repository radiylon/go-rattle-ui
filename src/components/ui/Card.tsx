import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	hover?: boolean;
}

export function Card({
	children,
	header,
	footer,
	hover = false,
	className = "",
	...props
}: CardProps) {
	return (
		<article
			className={`bg-white rounded-lg border border-gray-200 shadow-sm ${
				hover ? "hover:shadow-md" : ""
			} ${className}`}
			{...props}
		>
			{header && (
				<div className="px-6 py-4 border-b border-gray-200">{header}</div>
			)}
			<div className="px-6 py-4">{children}</div>
			{footer && (
				<div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
					{footer}
				</div>
			)}
		</article>
	);
}
