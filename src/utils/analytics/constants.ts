export const TREND_CALCULATION_DAYS = 14;
export const PROJECTION_DAYS = 30;
export const LOW_BALANCE_THRESHOLD = 0.2; // 20% of projected usage
export const MIN_DATA_POINTS = 7;

export const USAGE_CATEGORIES = {
  ANALYSIS: 'Analysis',
  GENERATION: 'Generation',
  RESEARCH: 'Research',
  REVIEW: 'Review'
} as const;