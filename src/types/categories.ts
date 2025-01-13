export interface CategoryInsight {
  id: string;
  name: string;
  icon: string;
  marketSize: number;
  growth: number;
  avgMargin: number;
  competitionLevel: 'low' | 'medium' | 'high';
  topBrands: string[];
  trendingProducts: Array<{
    name: string;
    price: number;
    growth: number;
  }>;
}

export interface MarketTrend {
  category: string;
  trend: string;
  impact: 'positive' | 'negative';
  description: string;
}