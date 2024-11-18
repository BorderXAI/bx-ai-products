import React, { useState } from 'react';
import { Zap, MessageSquare, TrendingUp, Target } from 'lucide-react';

export function PerformanceEngine() {
  const [salesScripts] = useState([
    {
      id: 1,
      type: 'opening',
      content: 'Welcome to our exclusive skincare showcase!',
      performance: '92%'
    },
    {
      id: 2,
      type: 'product',
      content: 'This premium set includes our bestselling formula...',
      performance: '88%'
    },
    {
      id: 3,
      type: 'closing',
      content: 'Limited time offer - Don\'t miss out!',
      performance: '95%'
    }
  ]);

  const [behaviorInsights] = useState([
    { id: 1, metric: 'Closing Rate', value: '35%', trend: 'up' },
    { id: 2, metric: 'Viewer Retention', value: '4.2m', trend: 'up' },
    { id: 3, metric: 'Engagement Rate', value: '8.5%', trend: 'stable' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Performance Engine</h3>
        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">AI Powered</span>
      </div>

      {/* Sales Scripts */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-4 w-4 text-indigo-600" />
          <span className="font-medium text-sm">Active Scripts</span>
        </div>
        <div className="space-y-2">
          {salesScripts.map(script => (
            <div key={script.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 capitalize">{script.type}</span>
                <span className="text-xs text-green-600">{script.performance} effective</span>
              </div>
              <p className="text-sm">{script.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Behavior Analysis */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-4 w-4 text-indigo-600" />
          <span className="font-medium text-sm">Performance Metrics</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {behaviorInsights.map(insight => (
            <div key={insight.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">{insight.metric}</div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{insight.value}</span>
                <TrendingUp className={`h-4 w-4 ${
                  insight.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Zap className="h-4 w-4" />
          <span className="text-sm">Generate Script</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Target className="h-4 w-4" />
          <span className="text-sm">Optimize Flow</span>
        </button>
      </div>
    </div>
  );
}