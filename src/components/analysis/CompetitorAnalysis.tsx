import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { ActionItem } from '../../types/analysis';

interface Props {
  actions: ActionItem[];
}

export function CompetitorAnalysis({ actions }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Action Plan</h3>
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{action.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
              </div>
              <span className="text-sm text-gray-500">{action.deadline}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${action.category === 'immediate' ? 'bg-red-100 text-red-800' :
                  action.category === 'short-term' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}`}>
                {action.category}
              </span>
              
              {action.metrics.map((metric, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {metric}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}