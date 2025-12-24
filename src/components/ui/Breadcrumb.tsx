import { ChevronRight, Home } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

export interface BreadcrumbItem {
	label: string;
	href?: string;
	icon?: ReactNode;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
	items: BreadcrumbItem[];
	separator?: ReactNode;
	showHome?: boolean;
	homeHref?: string;
}

export function Breadcrumb({
	items,
	separator,
	showHome = false,
	homeHref = "/",
	className = "",
	...props
}: BreadcrumbProps) {
	const allItems: BreadcrumbItem[] = showHome
		? [
				{ label: "Home", href: homeHref, icon: <Home className="h-4 w-4" /> },
				...items,
			]
		: items;

	const defaultSeparator = <ChevronRight className="h-4 w-4 text-gray-400" />;

	return (
		<nav aria-label="Breadcrumb" className={className} {...props}>
			<ol className="flex items-center gap-2">
				{allItems.map((item, index) => {
					const isLast = index === allItems.length - 1;

					return (
						<li key={item.label} className="flex items-center gap-2">
							{index > 0 && (
								<span className="flex-shrink-0" aria-hidden="true">
									{separator || defaultSeparator}
								</span>
							)}

							{isLast ? (
								<span
									className="flex items-center gap-1.5 text-sm font-medium text-gray-900"
									aria-current="page"
								>
									{item.icon}
									{!item.icon || index > 0 ? item.label : null}
								</span>
							) : item.href ? (
								<a
									href={item.href}
									className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
								>
									{item.icon}
									{!item.icon || index > 0 ? item.label : null}
								</a>
							) : (
								<span className="flex items-center gap-1.5 text-sm text-gray-500">
									{item.icon}
									{!item.icon || index > 0 ? item.label : null}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
