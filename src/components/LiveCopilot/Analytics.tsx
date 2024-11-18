import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, DollarSign, ShoppingCart, Heart } from 'lucide-react';

const viewerData = [
  { time: '14:00', viewers: 850, engagement: 75 },
  { time: '14:10', viewers: 940, engagement: 82 },
  { time: '14:20', viewers: 1120, engagement: 88 },
  { time: '14:30', viewers: 1350, engagement: 92 },
  { time: '14:40', viewers: 1250, engagement: 85 },
  { time: '14:50', viewers: 1420, engagement: 89 },
  { time: '15:00', viewers: 1550, engagement: 94 }
];

const engagementData = [
  { name: 'Comments', value: 45 },
  { name: 'Likes', value: 30 },
  { name: 'Shares', value: 15 },
  { name: 'Gifts', value: 10 }
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

export function Analytics() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Real-time Analytics</h2>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      {/* Viewer Trend */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Viewer & Engagement Trends</h3>
        <div className="h-64">
          <LineChart
            width={400}
            height={250}
            data={viewerData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="viewers"
              stroke="#6366f1"
              name="Viewers"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="engagement"
              stroke="#8b5cf6"
              name="Engagement %"
            />
          </LineChart>
        </div>
      </div>

      {/* Engagement Distribution */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Engagement Distribution</h3>
        <div className="h-64">
          <PieChart width={400} height={250}>
            <Pie
              data={engagementData}
              cx={200}
              cy={125}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {engagementData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Peak Viewers</span>
            </div>
            <span className="font-semibold">1,550</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Avg. Viewers</span>
            </div>
            <span className="font-semibold">1,210</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Engagement Rate</span>
            </div>
            <span className="font-semibold">8.5%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Orders</span>
            </div>
            <span className="font-semibold">127</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <span className="font-semibold">$3,240</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Duration</span>
            </div>
            <span className="font-semibold">01:15:32</span>
          </div>
        </div>
      </div>
    </div>
  );
}