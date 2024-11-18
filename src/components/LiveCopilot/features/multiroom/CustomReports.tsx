import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FileText, Download, Share2, Filter, Calendar } from 'lucide-react';

const performanceData = [
  { date: 'Mon', stream1: 85, stream2: 78, stream3: 92 },
  { date: 'Tue', stream1: 88, stream2: 82, stream3: 89 },
  { date: 'Wed', stream1: 92, stream2: 85, stream3: 87 },
  { date: 'Thu', stream1: 90, stream2: 88, stream3: 91 },
  { date: 'Fri', stream1: 86, stream2: 84, stream3: 90 }
];

export function CustomReports() {
  const [selectedMetrics] = useState([
    'viewer_count',
    'engagement_rate',
    'conversion_rate'
  ]);

  const [reportSchedule] = useState([
    { id: '1', name: 'Daily Performance', frequency: 'Daily', time: '23:00' },
    { id: '2', name: 'Weekly Analytics', frequency: 'Weekly', time: 'Monday 09:00' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Custom Reports</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
          <FileText className="h-4 w-4" />
          New Report
        </button>
      </div>

      {/* Performance Chart */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Performance Overview</h4>
          <select className="text-sm border rounded-lg px-2 py-1">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
          </select>
        </div>
        <div className="h-64">
          <BarChart
            width={400}
            height={250}
            data={performanceData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stream1" fill="#6366f1" name="Stream 1" />
            <Bar dataKey="stream2" fill="#8b5cf6" name="Stream 2" />
            <Bar dataKey="stream3" fill="#ec4899" name="Stream 3" />
          </BarChart>
        </div>
      </div>

      {/* Metrics Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">Selected Metrics</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedMetrics.map(metric => (
            <span
              key={metric}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
            >
              {metric.replace('_', ' ')}
            </span>
          ))}
          <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-indigo-500 hover:text-indigo-500">
            + Add Metric
          </button>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-medium">Scheduled Reports</h4>
        </div>
        <div className="space-y-2">
          {reportSchedule.map(report => (
            <div
              key={report.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="text-sm font-medium">{report.name}</div>
                <div className="text-xs text-gray-500">
                  {report.frequency} at {report.time}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Share2 className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end gap-3">
        <button className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
          Schedule Report
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Download className="h-4 w-4" />
          Export All
        </button>
      </div>
    </div>
  );
}