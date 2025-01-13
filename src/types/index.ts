export interface ProductData {
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
  url: string;
}

export interface CompetitorData {
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  url: string;
}

export interface AnalysisResult {
  overview: {
    avgPrice: number;
    avgRating: number;
    totalReviews: number;
    pricePosition: 'low' | 'medium' | 'high';
  };
  competitors: CompetitorData[];
  keywords: Array<{
    term: string;
    frequency: number;
    competition: 'low' | 'medium' | 'high';
  }>;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    topPhrases: string[];
  };
}