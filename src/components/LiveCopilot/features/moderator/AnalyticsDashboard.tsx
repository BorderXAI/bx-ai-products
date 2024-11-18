import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const engagementData = [
  { time: '00:00', viewers: 850, engagement: 75 },
  { time: '00:15', viewers: 920, engagement: 82 },
  { time: '00:30', viewers: 1100, engagement: 88 },
  { time: '00:45', viewers: 980, engagement: 85 }
];

const salesData = [
  { product: 'Skincare Set', sales: 24, conversion: 3.2 },
  { product: 'Face Cream', sales: 18, conversion: 2.8 },
  { product: 'Serum', sales: 12, conversion: 2.5 }
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Analytics</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option>Last Hour</option>
          <option>Last 24 Hours</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-indigo-600" />
            <span className="text-sm">Viewers</span>
          </div>
          <div className="font-semibold">1,234</div>
          <div className="text-xs text-green-600">↑ 12%</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-indigo-600" />
            <span className="text-sm">Engagement</span>
          </div>
          <div className="font-semibold">8.5%</div>
          <div className="text-xs text-green-600">↑ 5%</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-indigo-600" />
            <span className="text-sm">Sales</span>
          </div>
          <div className="font-semibold">$3,245</div>
          <div className="text-xs text-green-600">↑ 18%</div>
        </div>
      </div>

      {/* Engagement Chart */}
      <div>
        <h4 className="text-sm font-medium mb-3">Viewer Engagement</h4>
        <div className="h-48">
          <LineChart
            width={300}
            height={180}
            data={engagementData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="viewers" stroke="#6366f1" />
            <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" />
          </LineChart>
        </div>
      </div>

      {/* Sales Performance */}
      <div>
        <h4 className="text-sm font-medium mb-3">Sales Performance</h4>
        <div className="h-48">
          <BarChart
            width={300}
            height={180}
            data={salesData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#6366f1" />
            <Bar dataKey="conversion" fill="#8b5cf6" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}