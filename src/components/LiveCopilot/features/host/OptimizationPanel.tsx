import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Zap, AlertCircle } from 'lucide-react';

const performanceData = [
  { time: '0:00', engagement: 75, sales: 0 },
  { time: '0:05', engagement: 82, sales: 2 },
  { time: '0:10', engagement: 88, sales: 5 },
  { time: '0:15', engagement: 85, sales: 8 }
];

export function OptimizationPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Performance Optimization</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option>Real-time</option>
          <option>Last 15m</option>
          <option>Last Hour</option>
        </select>
      </div>

      {/* Performance Chart */}
      <div>
        <h4 className="text-sm font-medium mb-3">Performance Trends</h4>
        <div className="h-48">
          <LineChart
            width={300}
            height={180}
            data={performanceData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="engagement" stroke="#6366f1" />
            <Line type="monotone" dataKey="sales" stroke="#8b5cf6" />
          </LineChart>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="space-y-3">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">High Performance Detected</span>
          </div>
          <p className="text-xs text-green-700">
            Current script is performing well. Maintain this energy level.
          </p>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Optimization Opportunity</span>
          </div>
          <p className="text-xs text-yellow-700">
            Try highlighting product benefits more frequently to boost engagement.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Average Engagement</div>
          <div className="font-semibold">82.5%</div>
          <div className="text-xs text-green-600">↑ 5% from baseline</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Conversion Rate</div>
          <div className="font-semibold">3.8%</div>
          <div className="text-xs text-green-600">↑ 0.5% from average</div>
        </div>
      </div>
    </div>
  );
}