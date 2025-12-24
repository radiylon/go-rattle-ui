import { ChevronDown, ChevronUp } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { useId, useRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
}

export function Input({
	label,
	error,
	helperText,
	className = "",
	id,
	type,
	...props
}: InputProps) {
	const generatedId = useId();
	const inputId = id || generatedId;
	const inputRef = useRef<HTMLInputElement>(null);
	const isNumber = type === "number";

	const handleIncrement = () => {
		if (inputRef.current && isNumber) {
			const currentValue = parseFloat(inputRef.current.value) || 0;
			const step = parseFloat(inputRef.current.step) || 1;
			const max = inputRef.current.max
				? parseFloat(inputRef.current.max)
				: undefined;
			const newValue =
				max !== undefined
					? Math.min(currentValue + step, max)
					: currentValue + step;
			inputRef.current.value = newValue.toString();
			inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
			inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
		}
	};

	const handleDecrement = () => {
		if (inputRef.current && isNumber) {
			const currentValue = parseFloat(inputRef.current.value) || 0;
			const step = parseFloat(inputRef.current.step) || 1;
			const min = inputRef.current.min
				? parseFloat(inputRef.current.min)
				: undefined;
			const newValue =
				min !== undefined
					? Math.max(currentValue - step, min)
					: currentValue - step;
			inputRef.current.value = newValue.toString();
			inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
			inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
		}
	};

	return (
		<div className="w-full">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					{label}
				</label>
			)}
			<div className="relative">
				{isNumber && (
					<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
						$
					</span>
				)}
				<input
					ref={inputRef}
					id={inputId}
					type={type}
					className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5dcb8a] focus:border-transparent ${
						error
							? "border-red-300 bg-red-50"
							: "border-gray-300 bg-white hover:border-gray-400"
					} ${isNumber ? "pl-7 pr-12" : ""} ${className}`}
					{...props}
				/>
				{isNumber && (
					<div className="absolute right-0 top-0 h-full flex flex-col border-l border-gray-300 rounded-r-lg">
						<button
							type="button"
							onClick={handleIncrement}
							className="flex-1 px-2 flex items-center justify-center hover:bg-gray-100 border-r border-t border-gray-300 rounded-tr-lg focus:outline-none cursor-pointer"
							tabIndex={-1}
							aria-label="Increment"
						>
							<ChevronUp className="h-3 w-3 text-gray-600" />
						</button>
						<button
							type="button"
							onClick={handleDecrement}
							className="flex-1 px-2 flex items-center justify-center hover:bg-gray-100 border-r border-b border-gray-300 rounded-br-lg focus:outline-none cursor-pointer"
							tabIndex={-1}
							aria-label="Decrement"
						>
							<ChevronDown className="h-3 w-3 text-gray-600" />
						</button>
					</div>
				)}
			</div>
			{error && (
				<p className="mt-1.5 text-sm text-red-600" role="alert">
					{error}
				</p>
			)}
			{helperText && !error && (
				<p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
			)}
		</div>
	);
}
