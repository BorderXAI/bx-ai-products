import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import type { MarketPosition } from '../../types/analysis';

interface Props {
  data: MarketPosition;
}

export function ProductOverview({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Market Position</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Market Share</span>
              <span className="font-semibold">{data.marketShare}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Category Rank</span>
              <span className="font-semibold">#{data.categoryRank} of {data.totalCompetitors}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price Position</span>
              <span className="font-semibold capitalize">{data.priceComparison.position}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold">Growth Metrics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Growth</span>
              <span className="font-semibold text-green-600">+{data.growth.monthly}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Yearly Growth</span>
              <span className="font-semibold text-green-600">+{data.growth.yearly}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Price</span>
              <span className="font-semibold">${data.priceComparison.averagePrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}