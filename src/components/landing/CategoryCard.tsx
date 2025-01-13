import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import type { CategoryInsight } from '../../types/categories';

interface Props {
  category: CategoryInsight;
}

export function CategoryCard({ category }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${category.competitionLevel === 'low' ? 'bg-green-100 text-green-800' :
            category.competitionLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'}`}>
          {category.competitionLevel} competition
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="w-4 h-4 mr-1" />
            Market Size
          </div>
          <div className="font-semibold">${category.marketSize}B</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            Growth
          </div>
          <div className="font-semibold text-green-600">+{category.growth}%</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            Avg Margin
          </div>
          <div className="font-semibold">{category.avgMargin}%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Trending Products</h4>
          <div className="space-y-2">
            {category.trendingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{product.name}</span>
                <span className="text-green-600">+{product.growth}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}