import React from 'react';
import { Lightbulb, TrendingUp } from 'lucide-react';
import type { OpportunityArea } from '../../types/analysis';

interface Props {
  opportunities: OpportunityArea[];
}

export function OpportunitiesCard({ opportunities }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Growth Opportunities</h3>

      <div className="space-y-4">
        {opportunities.map((opportunity, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+{opportunity.potentialGrowth}%</span>
              </div>
            </div>

            <div className="mt-3 flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${opportunity.impact === 'high' ? 'bg-green-100 text-green-800' :
                  opportunity.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}`}>
                {opportunity.impact} impact
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${opportunity.effort === 'low' ? 'bg-green-100 text-green-800' :
                  opportunity.effort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}`}>
                {opportunity.effort} effort
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}