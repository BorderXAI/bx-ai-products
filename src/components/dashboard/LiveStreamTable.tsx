import React from 'react';
import { Video, Users, DollarSign, Clock, Plus, Play, Settings } from 'lucide-react';

interface LiveStream {
  id: string;
  title: string;
  host: string;
  scheduledTime: string;
  expectedViewers: number;
  status: 'scheduled' | 'live' | 'ended';
  revenue?: number;
  actualViewers?: number;
  duration?: string;
}

const liveStreams: LiveStream[] = [
  {
    id: '1',
    title: 'Summer Fashion Collection Launch',
    host: '@fashionista',
    scheduledTime: '2024-03-20 14:00',
    expectedViewers: 5000,
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Beauty Products Showcase',
    host: '@beautyexpert',
    scheduledTime: 'Live Now',
    expectedViewers: 3000,
    status: 'live',
    actualViewers: 3500,
    revenue: 2800,
    duration: '45:22'
  },
  {
    id: '3',
    title: 'Tech Gadgets Review',
    host: '@techreview',
    scheduledTime: '2024-03-19 15:00',
    expectedViewers: 4000,
    status: 'ended',
    actualViewers: 4500,
    revenue: 5600,
    duration: '1:15:00'
  }
];

export function LiveStreamTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Live Stream Management</h2>
          <p className="text-sm text-gray-500">Schedule and manage your live streaming sessions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Schedule Stream
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-gray-600">Stream Details</th>
              <th className="text-left p-3 text-gray-600">Host</th>
              <th className="text-right p-3 text-gray-600">Schedule</th>
              <th className="text-right p-3 text-gray-600">Viewers</th>
              <th className="text-right p-3 text-gray-600">Duration</th>
              <th className="text-right p-3 text-gray-600">Revenue</th>
              <th className="text-right p-3 text-gray-600">Status</th>
              <th className="text-right p-3 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveStreams.map(stream => (
              <tr key={stream.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Video className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{stream.title}</p>
                      <p className="text-sm text-gray-500">ID: {stream.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{stream.host}</td>
                <td className="text-right p-3">{stream.scheduledTime}</td>
                <td className="text-right p-3">
                  {stream.status === 'live' || stream.status === 'ended' 
                    ? `${(stream.actualViewers! / 1000).toFixed(1)}K`
                    : `${(stream.expectedViewers / 1000).toFixed(1)}K (est.)`}
                </td>
                <td className="text-right p-3">
                  {stream.duration || '-'}
                </td>
                <td className="text-right p-3">
                  {stream.revenue ? `$${stream.revenue.toLocaleString()}` : '-'}
                </td>
                <td className="text-right p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    stream.status === 'live' 
                      ? 'bg-red-100 text-red-800'
                      : stream.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {stream.status.charAt(0).toUpperCase() + stream.status.slice(1)}
                  </span>
                </td>
                <td className="text-right p-3">
                  <div className="flex items-center justify-end gap-2">
                    {stream.status === 'scheduled' && (
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Settings className="h-4 w-4 text-gray-600" />
                      </button>
                    )}
                    {stream.status === 'scheduled' && (
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Play className="h-4 w-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}