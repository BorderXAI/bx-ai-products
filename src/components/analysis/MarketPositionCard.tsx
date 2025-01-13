import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import type { MarketPosition } from '../../types/analysis';

interface Props {
  data: MarketPosition;
}

export function MarketPositionCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Market Position</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Market Share</p>
              <p className="text-lg font-semibold">{data.marketShare}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Category Rank</p>
              <p className="text-lg font-semibold">#{data.categoryRank} of {data.totalCompetitors}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-lg font-semibold">
                {data.growth.monthly}% Monthly
                <span className="text-sm text-gray-500 ml-1">
                  ({data.growth.yearly}% Yearly)
                </span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Price Position</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${data.priceComparison.percentile}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {data.priceComparison.position} range (${data.priceComparison.averagePrice})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}