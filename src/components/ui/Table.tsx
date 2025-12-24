import type {
	HTMLAttributes,
	ReactNode,
	TdHTMLAttributes,
	ThHTMLAttributes,
} from "react";

// Table Root
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
	children: ReactNode;
}

export function Table({ children, className = "", ...props }: TableProps) {
	return (
		<div className="overflow-x-auto">
			<table className={`w-full text-left ${className}`} {...props}>
				{children}
			</table>
		</div>
	);
}

// Table Header
export interface TableHeaderProps
	extends HTMLAttributes<HTMLTableSectionElement> {
	children: ReactNode;
	sticky?: boolean;
}

export function TableHeader({
	children,
	sticky = false,
	className = "",
	...props
}: TableHeaderProps) {
	return (
		<thead
			className={`bg-gray-50 border-b border-gray-200 ${sticky ? "sticky top-0 z-10" : ""} ${className}`}
			{...props}
		>
			{children}
		</thead>
	);
}

// Table Body
export interface TableBodyProps
	extends HTMLAttributes<HTMLTableSectionElement> {
	children: ReactNode;
}

export function TableBody({
	children,
	className = "",
	...props
}: TableBodyProps) {
	return (
		<tbody
			className={`bg-white divide-y divide-gray-200 ${className}`}
			{...props}
		>
			{children}
		</tbody>
	);
}

// Table Row
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
	children: ReactNode;
	clickable?: boolean;
	selected?: boolean;
}

export function TableRow({
	children,
	clickable = false,
	selected = false,
	className = "",
	...props
}: TableRowProps) {
	return (
		<tr
			className={`
        ${clickable ? "hover:bg-gray-50 cursor-pointer" : ""}
        ${selected ? "bg-rattle-green-bg" : ""}
        transition-colors
        ${className}
      `}
			{...props}
		>
			{children}
		</tr>
	);
}

// Table Head Cell
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
	children: ReactNode;
	sortable?: boolean;
	sortDirection?: "asc" | "desc" | null;
	onSort?: () => void;
}

export function TableHead({
	children,
	sortable = false,
	sortDirection = null,
	onSort,
	className = "",
	...props
}: TableHeadProps) {
	return (
		<th
			className={`
        px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider
        ${sortable ? "cursor-pointer hover:bg-gray-100 select-none" : ""}
        ${className}
      `}
			onClick={sortable ? onSort : undefined}
			{...props}
		>
			<div className="flex items-center gap-1">
				{children}
				{sortable && sortDirection && (
					<span className="text-gray-400">
						{sortDirection === "asc" ? "↑" : "↓"}
					</span>
				)}
			</div>
		</th>
	);
}

// Table Cell
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
	children: ReactNode;
	truncate?: boolean;
}

export function TableCell({
	children,
	truncate = false,
	className = "",
	...props
}: TableCellProps) {
	return (
		<td
			className={`px-6 py-4 ${truncate ? "truncate max-w-xs" : "whitespace-nowrap"} ${className}`}
			{...props}
		>
			{children}
		</td>
	);
}

// Table Footer
export interface TableFooterProps
	extends HTMLAttributes<HTMLTableSectionElement> {
	children: ReactNode;
}

export function TableFooter({
	children,
	className = "",
	...props
}: TableFooterProps) {
	return (
		<tfoot
			className={`bg-gray-50 border-t border-gray-200 ${className}`}
			{...props}
		>
			{children}
		</tfoot>
	);
}
