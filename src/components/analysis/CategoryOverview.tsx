import React from 'react';
import { TrendingUp, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CategoryMetrics } from '../../types/analysis';

interface Props {
  data: CategoryMetrics;
}

export function CategoryOverview({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Category Performance</h3>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Market Size</div>
          <div className="text-2xl font-bold">${data.marketSize}B</div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            +{data.marketGrowth}% YoY
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">Total Sellers</div>
          <div className="text-2xl font-bold">{data.totalSellers}</div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            {data.newSellers} new this month
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">Avg. Price Point</div>
          <div className="text-2xl font-bold">${data.averagePrice}</div>
          <div className={`flex items-center text-sm ${
            data.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {data.priceChange >= 0 ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {data.priceChange}% MoM
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">Monthly Sales</div>
          <div className="text-2xl font-bold">{data.monthlySales}K</div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{data.salesGrowth}% MoM
          </div>
        </div>
      </div>
    </div>
  );
}