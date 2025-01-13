import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import type { MarketTrend } from '../../types/categories';

interface Props {
  trends: MarketTrend[];
}

export function MarketTrends({ trends }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Market Trends</h2>
      </div>

      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-full ${
              trend.impact === 'positive' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {trend.impact === 'positive' ? (
                <ArrowUp className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{trend.trend}</h3>
              <p className="text-sm text-gray-600 mt-1">{trend.description}</p>
              <p className="text-sm text-gray-500 mt-1">in {trend.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}