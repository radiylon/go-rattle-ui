import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const previousActiveElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			// Store the previously focused element
			previousActiveElement.current = document.activeElement as HTMLElement;

			// Focus the modal container
			modalRef.current?.focus();

			// Prevent body scroll when modal is open
			document.body.style.overflow = "hidden";
		} else {
			// Restore body scroll
			document.body.style.overflow = "";

			// Restore focus to the previously focused element
			if (previousActiveElement.current) {
				previousActiveElement.current.focus();
			}
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isOpen) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 overflow-y-auto"
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? "modal-title" : undefined}
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal Container - Full Screen */}
			<div className="fixed inset-0">
				<div
					ref={modalRef}
					className="relative bg-white w-full h-full overflow-y-auto shadow-xl transform transition-all"
					tabIndex={-1}
				>
					{/* Close Button */}
					<button
						type="button"
						onClick={onClose}
						className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full transition-colors cursor-pointer"
						aria-label="Close modal"
					>
						<X className="h-6 w-6" />
					</button>

					{/* Modal Content */}
					<div className="h-full">{children}</div>
				</div>
			</div>
		</div>
	);
}
