import { CategoryInsight, MarketTrend } from '../types/categories';

export const topCategories: CategoryInsight[] = [
  {
    id: 'electronics',
    name: 'Consumer Electronics',
    icon: 'smartphone',
    marketSize: 985.5,
    growth: 12.3,
    avgMargin: 32,
    competitionLevel: 'high',
    topBrands: ['Samsung', 'Apple', 'Sony', 'LG'],
    trendingProducts: [
      { name: 'Wireless Earbuds', price: 149.99, growth: 85 },
      { name: 'Smart Watches', price: 299.99, growth: 65 },
      { name: 'Portable Chargers', price: 49.99, growth: 45 }
    ]
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    icon: 'home',
    marketSize: 732.8,
    growth: 8.5,
    avgMargin: 45,
    competitionLevel: 'medium',
    topBrands: ['Ninja', 'KitchenAid', 'Dyson', 'Instant Pot'],
    trendingProducts: [
      { name: 'Air Fryers', price: 129.99, growth: 120 },
      { name: 'Robot Vacuums', price: 299.99, growth: 75 },
      { name: 'Coffee Makers', price: 199.99, growth: 40 }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    icon: 'sparkles',
    marketSize: 511.4,
    growth: 15.7,
    avgMargin: 65,
    competitionLevel: 'high',
    topBrands: ['L\'Oreal', 'Estée Lauder', 'Neutrogena', 'CeraVe'],
    trendingProducts: [
      { name: 'Face Serums', price: 59.99, growth: 95 },
      { name: 'LED Masks', price: 199.99, growth: 80 },
      { name: 'Hair Tools', price: 149.99, growth: 55 }
    ]
  }
];

export const marketTrends: MarketTrend[] = [
  {
    category: 'Consumer Electronics',
    trend: 'Sustainable Tech',
    impact: 'positive',
    description: 'Growing demand for eco-friendly and energy-efficient devices'
  },
  {
    category: 'Home & Kitchen',
    trend: 'Smart Home Integration',
    impact: 'positive',
    description: 'Increasing adoption of connected kitchen appliances'
  },
  {
    category: 'Beauty & Personal Care',
    trend: 'Clean Beauty',
    impact: 'positive',
    description: 'Rising preference for natural and sustainable ingredients'
  }
];