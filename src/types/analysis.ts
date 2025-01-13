// Update the analysis types
export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  topPhrases: string[];
}

export interface CategoryMetrics {
  marketSize: number;
  marketGrowth: number;
  totalSellers: number;
  newSellers: number;
  averagePrice: number;
  priceChange: number;
  monthlySales: number;
  salesGrowth: number;
}

export interface MarketPosition {
  marketShare: number;
  categoryRank: number;
  totalCompetitors: number;
  growth: {
    monthly: number;
    yearly: number;
  };
  priceComparison: {
    position: string;
    averagePrice: number;
    percentile: number;
    priceRange: {
      min: number;
      max: number;
    };
  };
}