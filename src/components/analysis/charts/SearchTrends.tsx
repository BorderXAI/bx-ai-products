import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateSearchTrendData, formatChartTooltip } from '../../../utils/charts';

export function SearchTrends() {
  const data = generateSearchTrendData();

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={formatChartTooltip} />
          <Line 
            type="monotone" 
            dataKey="volume" 
            stroke="#6366f1" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}