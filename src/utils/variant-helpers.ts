import type {
	AlertType,
	AlertVariant,
	BadgeVariant,
	DealStage,
	ProgressBarVariant,
} from "../types";

/**
 * Maps alert type to alert variant
 */
export function getAlertVariant(type: AlertType): AlertVariant {
	switch (type) {
		case "closed-won":
			return "success";
		case "data-quality":
			return "error";
		case "renewal":
			return "info";
		default:
			return type;
	}
}

/**
 * Maps deal stage to badge variant
 */
export function getStageBadgeVariant(stage: DealStage | string): BadgeVariant {
	switch (stage) {
		case "closed-won":
			return "success";
		case "closed-lost":
			return "error";
		case "negotiation":
			return "info";
		case "at-risk":
			return "warning";
		default:
			return "default";
	}
}

/**
 * Maps probability percentage to progress bar variant
 */
export function getProbabilityVariant(probability: number): ProgressBarVariant {
	if (probability >= 75) return "success";
	if (probability >= 50) return "default";
	return "warning";
}
