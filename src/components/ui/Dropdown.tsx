import { Check, ChevronDown } from "lucide-react";
import {
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";

export interface DropdownItem {
	label: string;
	value: string;
	icon?: ReactNode;
	description?: string;
	disabled?: boolean;
	destructive?: boolean;
}

export interface DropdownProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	trigger: ReactNode;
	items: DropdownItem[];
	value?: string;
	onChange?: (value: string) => void;
	align?: "left" | "right";
	width?: "auto" | "trigger" | number;
}

export function Dropdown({
	trigger,
	items,
	value,
	onChange,
	align = "left",
	width = "auto",
	className = "",
	...props
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	// Close on outside click
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Close on escape
	useEffect(() => {
		function handleEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
				triggerRef.current?.focus();
			}
		}

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	}, [isOpen]);

	const handleSelect = (item: DropdownItem) => {
		if (item.disabled) return;
		onChange?.(item.value);
		setIsOpen(false);
	};

	const getWidth = () => {
		if (width === "auto") return "min-w-[180px]";
		if (width === "trigger") return "w-full";
		return `w-[${width}px]`;
	};

	return (
		<div
			ref={containerRef}
			className={`relative inline-block ${className}`}
			{...props}
		>
			<button
				ref={triggerRef}
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				className="inline-flex items-center"
			>
				{trigger}
			</button>

			{isOpen && (
				<div
					className={`
            absolute z-50 mt-1 py-1 bg-white rounded-lg border border-gray-200 shadow-lg
            ${align === "right" ? "right-0" : "left-0"}
            ${getWidth()}
          `}
					role="listbox"
				>
					{items.map((item) => (
						<button
							key={item.value}
							type="button"
							role="option"
							aria-selected={value === item.value}
							disabled={item.disabled}
							onClick={() => handleSelect(item)}
							className={`
                w-full flex items-center gap-3 px-3 py-2 text-left text-sm
                ${
									item.disabled
										? "text-gray-400 cursor-not-allowed"
										: item.destructive
											? "text-red-600 hover:bg-red-50"
											: "text-gray-700 hover:bg-gray-50"
								}
                ${value === item.value ? "bg-rattle-green-bg" : ""}
              `}
						>
							{item.icon && <span className="flex-shrink-0">{item.icon}</span>}
							<div className="flex-1 min-w-0">
								<div className="truncate">{item.label}</div>
								{item.description && (
									<div className="text-xs text-gray-500 truncate">
										{item.description}
									</div>
								)}
							</div>
							{value === item.value && (
								<Check className="h-4 w-4 text-[#5dcb8a] flex-shrink-0" />
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

// Simple Dropdown Button
export interface DropdownButtonProps extends Omit<DropdownProps, "trigger"> {
	label: string;
	variant?: "primary" | "secondary" | "ghost";
	size?: "sm" | "md" | "lg";
}

export function DropdownButton({
	label,
	variant = "secondary",
	size = "md",
	...props
}: DropdownButtonProps) {
	const variants = {
		primary: "bg-[#5dcb8a] text-black border-[#5dcb8a] hover:bg-[#6dd49a]",
		secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
		ghost: "text-gray-700 border-transparent hover:bg-gray-100",
	};

	const sizes = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-sm",
		lg: "px-5 py-2.5 text-base",
	};

	return (
		<Dropdown
			trigger={
				<span
					className={`
            inline-flex items-center gap-2 font-medium rounded-lg border cursor-pointer
            ${variants[variant]} ${sizes[size]}
          `}
				>
					{label}
					<ChevronDown className="h-4 w-4" />
				</span>
			}
			{...props}
		/>
	);
}
