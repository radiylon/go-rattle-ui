// Rattle Design Tokens
// Extracted from https://www.gorattle.com/

export const colors = {
	// Primary Green (Rattle Exact Brand Color #5dcb8a)
	primary: {
		50: "#f5faf7",
		100: "#dff0e2",
		200: "#9eddb6",
		300: "#7dd4a0",
		400: "#5dcb8a", // Exact Rattle brand color
		500: "#5dcb8a", // Exact Rattle brand color
		600: "#4ba370",
		700: "#3a7b56",
		800: "#2d5e42",
		900: "#1f3e2d",
	},
	// Accent Blue
	accent: {
		50: "#EFF6FF",
		100: "#DBEAFE",
		200: "#BFDBFE",
		300: "#93C5FD",
		400: "#60A5FA",
		500: "#3B82F6",
		600: "#2563EB",
		700: "#1D4ED8",
		800: "#1E40AF",
		900: "#1E3A8A",
	},
	// Dark Backgrounds
	dark: {
		50: "#F8FAFC",
		100: "#F1F5F9",
		200: "#E2E8F0",
		300: "#CBD5E1",
		400: "#94A3B8",
		500: "#64748B",
		600: "#475569",
		700: "#334155",
		800: "#1E293B",
		900: "#0F172A",
	},
	// Success (Green - same as primary, Rattle brand color)
	success: {
		50: "#f5faf7",
		100: "#dff0e2",
		200: "#9eddb6",
		300: "#7dd4a0",
		400: "#5dcb8a", // Exact Rattle brand color
		500: "#5dcb8a", // Exact Rattle brand color
		600: "#4ba370",
		700: "#3a7b56",
		800: "#2d5e42",
		900: "#1f3e2d",
	},
	// Warning (Amber)
	warning: {
		50: "#FFFBEB",
		100: "#FEF3C7",
		200: "#FDE68A",
		300: "#FCD34D",
		400: "#FBBF24",
		500: "#F59E0B",
		600: "#D97706",
		700: "#B45309",
		800: "#92400E",
		900: "#78350F",
	},
	// Error (Red)
	error: {
		50: "#FEF2F2",
		100: "#FEE2E2",
		200: "#FECACA",
		300: "#FCA5A5",
		400: "#F87171",
		500: "#EF4444",
		600: "#DC2626",
		700: "#B91C1C",
		800: "#991B1B",
		900: "#7F1D1D",
	},
	// Neutral Grays
	gray: {
		50: "#F9FAFB",
		100: "#F3F4F6",
		200: "#E5E7EB",
		300: "#D1D5DB",
		400: "#9CA3AF",
		500: "#6B7280",
		600: "#4B5563",
		700: "#374151",
		800: "#1F2937",
		900: "#111827",
	},
} as const;

export const spacing = {
	xs: "0.25rem", // 4px
	sm: "0.5rem", // 8px
	md: "1rem", // 16px
	lg: "1.5rem", // 24px
	xl: "2rem", // 32px
	"2xl": "3rem", // 48px
	"3xl": "4rem", // 64px
} as const;

export const borderRadius = {
	sm: "0.375rem", // 6px
	md: "0.5rem", // 8px
	lg: "0.75rem", // 12px
	xl: "1rem", // 16px
	full: "9999px",
} as const;

export const shadows = {
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

export const typography = {
	fontFamily: {
		sans: ["Inter", "system-ui", "sans-serif"],
		mono: ["Monaco", "Courier New", "monospace"],
	},
	fontSize: {
		xs: "0.75rem", // 12px
		sm: "0.875rem", // 14px
		base: "1rem", // 16px
		lg: "1.125rem", // 18px
		xl: "1.25rem", // 20px
		"2xl": "1.5rem", // 24px
		"3xl": "1.875rem", // 30px
		"4xl": "2.25rem", // 36px
	},
	fontWeight: {
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
	},
} as const;
