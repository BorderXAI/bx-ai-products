import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CompetitorData } from '../../types/analysis';

interface Props {
  competitors: CompetitorData[];
  currentProduct: {
    price: number;
    rating: number;
    name: string;
  };
}

export function CompetitivePosition({ competitors, currentProduct }: Props) {
  const allData = [...competitors, { ...currentProduct, isCurrent: true }];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Competitive Position</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="price" 
              name="Price" 
              unit="$"
              domain={['auto', 'auto']}
            />
            <YAxis 
              type="number" 
              dataKey="rating" 
              name="Rating"
              domain={[3.5, 5]}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'price' ? `$${value}` : value,
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Scatter 
              name="Competitors" 
              data={competitors} 
              fill="#94a3b8"
            />
            <Scatter
              name="Current Product"
              data={[currentProduct]}
              fill="#6366f1"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium">Price Range</div>
          <div className="text-gray-600">
            ${Math.min(...allData.map(d => d.price))} - ${Math.max(...allData.map(d => d.price))}
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium">Avg. Rating</div>
          <div className="text-gray-600">
            {(allData.reduce((acc, curr) => acc + curr.rating, 0) / allData.length).toFixed(1)}
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium">Total Competitors</div>
          <div className="text-gray-600">{competitors.length}</div>
        </div>
      </div>
    </div>
  );
}