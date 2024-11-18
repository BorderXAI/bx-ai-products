import React, { useState } from 'react';
import { Grid, Users, Heart, DollarSign, TrendingUp, Settings, Maximize } from 'lucide-react';

interface StreamMetrics {
  id: string;
  title: string;
  host: string;
  viewers: number;
  likes: number;
  revenue: number;
  engagement: number;
  thumbnail: string;
}

export function UnifiedDashboard() {
  const [activeStreams] = useState<StreamMetrics[]>([
    {
      id: '1',
      title: 'Summer Fashion Collection',
      host: 'Sarah Chen',
      viewers: 1234,
      likes: 8500,
      revenue: 3240,
      engagement: 8.5,
      thumbnail: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=225'
    },
    {
      id: '2',
      title: 'Tech Gadget Review',
      host: 'Alex Rivera',
      viewers: 856,
      likes: 6200,
      revenue: 2180,
      engagement: 7.8,
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225'
    },
    {
      id: '3',
      title: 'Beauty Tutorial Live',
      host: 'Emma Thompson',
      viewers: 945,
      likes: 7300,
      revenue: 2890,
      engagement: 8.2,
      thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=225'
    }
  ]);

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Multi-Stream Monitor</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLayout('grid')}
            className={`p-1.5 rounded ${layout === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`p-1.5 rounded ${layout === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stream Grid */}
      <div className={`grid ${layout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {activeStreams.map(stream => (
          <div key={stream.id} className="bg-gray-50 rounded-lg overflow-hidden">
            {/* Stream Preview */}
            <div className="relative aspect-video">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="p-1 bg-black/50 rounded hover:bg-black/70 text-white">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="p-1 bg-black/50 rounded hover:bg-black/70 text-white">
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <h4 className="text-white font-medium truncate">{stream.title}</h4>
                <p className="text-white/80 text-sm">{stream.host}</p>
              </div>
            </div>

            {/* Stream Metrics */}
            <div className="p-4 grid grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-1 text-gray-500 mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Viewers</span>
                </div>
                <div className="font-medium">{stream.viewers}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gray-500 mb-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">Likes</span>
                </div>
                <div className="font-medium">{stream.likes}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gray-500 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">Revenue</span>
                </div>
                <div className="font-medium">${stream.revenue}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gray-500 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Engagement</span>
                </div>
                <div className="font-medium">{stream.engagement}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-end gap-3">
        <button className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
          Add Stream
        </button>
        <button className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
          Configure Layout
        </button>
      </div>
    </div>
  );
}