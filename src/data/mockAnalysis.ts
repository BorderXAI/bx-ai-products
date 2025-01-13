import type { CategoryMetrics, MarketPosition, SentimentData } from '../types/analysis';

// Market Position
export const mockMarketPosition: MarketPosition = {
  marketShare: 12.5,
  categoryRank: 8,
  totalCompetitors: 45,
  growth: {
    monthly: 2.5,
    yearly: 15.8
  },
  priceComparison: {
    percentile: 65,
    position: 'mid-range',
    averagePrice: 49.99,
    priceRange: { min: 29.99, max: 89.99 }
  }
};

// Category Metrics
export const mockCategoryMetrics: CategoryMetrics = {
  marketSize: 4.2,
  marketGrowth: 15.3,
  totalSellers: 245,
  newSellers: 12,
  averagePrice: 89.99,
  priceChange: -2.5,
  monthlySales: 125,
  salesGrowth: 8.5
};

// Sentiment Data
export const mockSentimentData: SentimentData = {
  positive: 0.65,
  neutral: 0.25,
  negative: 0.10,
  topPhrases: [
    "Great value for money",
    "Excellent customer service",
    "Fast shipping and delivery",
    "Product quality exceeds expectations",
    "Easy to use and setup"
  ]
};