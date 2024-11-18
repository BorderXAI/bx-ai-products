import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Brain, TrendingUp, AlertCircle, Zap } from 'lucide-react';

const performanceData = [
  { time: '14:00', stream1: 85, stream2: 78, stream3: 92 },
  { time: '14:15', stream1: 88, stream2: 82, stream3: 89 },
  { time: '14:30', stream1: 92, stream2: 85, stream3: 87 },
  { time: '14:45', stream1: 90, stream2: 88, stream3: 91 }
];

const insights = [
  {
    type: 'success',
    title: 'Peak Performance',
    message: 'Stream 1 showing highest engagement. Consider cross-promoting products.',
    action: 'Optimize cross-stream promotion'
  },
  {
    type: 'warning',
    title: 'Audience Overlap',
    message: '25% viewer overlap between Stream 2 and 3. Adjust scheduling.',
    action: 'Review schedule'
  },
  {
    type: 'info',
    title: 'Resource Opportunity',
    message: 'Stream 2 could benefit from additional moderator support.',
    action: 'Allocate resources'
  }
];

export function AdvancedAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Advanced Analytics</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option>Last Hour</option>
          <option>Last 3 Hours</option>
          <option>Last 24 Hours</option>
        </select>
      </div>

      {/* Cross-Stream Performance */}
      <div>
        <h4 className="text-sm font-medium mb-3">Cross-Stream Performance</h4>
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
            <Line type="monotone" dataKey="stream1" stroke="#6366f1" name="Stream 1" />
            <Line type="monotone" dataKey="stream2" stroke="#8b5cf6" name="Stream 2" />
            <Line type="monotone" dataKey="stream3" stroke="#ec4899" name="Stream 3" />
          </LineChart>
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">AI-Powered Insights</h4>
        </div>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                insight.type === 'success'
                  ? 'bg-green-50'
                  : insight.type === 'warning'
                  ? 'bg-yellow-50'
                  : 'bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {insight.type === 'success' ? (
                  <Zap className="h-4 w-4 text-green-600" />
                ) : insight.type === 'warning' ? (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                )}
                <span className="text-sm font-medium">{insight.title}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{insight.message}</p>
              <button
                className={`text-xs px-2 py-1 rounded ${
                  insight.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : insight.type === 'warning'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {insight.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Total Viewers</div>
          <div className="font-semibold">3,245</div>
          <div className="text-xs text-green-600">↑ 12% overall</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Avg. Engagement</div>
          <div className="font-semibold">8.7%</div>
          <div className="text-xs text-green-600">↑ 3% from last hour</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Cross Promotion</div>
          <div className="font-semibold">25%</div>
          <div className="text-xs text-green-600">↑ 5% success rate</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
          Export Report
        </button>
        <button className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
          Configure Alerts
        </button>
      </div>
    </div>
  );
}