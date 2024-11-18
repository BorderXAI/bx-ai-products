import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, Hash, Music, Users, Download, Filter, Search, Globe, Clock } from 'lucide-react';

const trendingData = [
  { time: '00:00', tiktok: 4500, instagram: 3800, youtube: 4200 },
  { time: '04:00', tiktok: 5200, instagram: 4100, youtube: 4600 },
  { time: '08:00', tiktok: 6800, instagram: 5400, youtube: 5900 },
  { time: '12:00', tiktok: 8200, instagram: 6900, youtube: 7200 },
  { time: '16:00', tiktok: 7500, instagram: 6200, youtube: 6800 },
  { time: '20:00', tiktok: 6200, instagram: 5100, youtube: 5600 }
];

const trendingHashtags = [
  { tag: '#skincareroutine', count: '2.5M', growth: 25 },
  { tag: '#morningroutine', count: '1.8M', growth: 15 },
  { tag: '#makeuptutorial', count: '3.2M', growth: 30 },
  { tag: '#fitnesschallenge', count: '2.9M', growth: 20 }
];

const trendingSounds = [
  { title: 'Original Sound - Creator1', uses: '500K', growth: 45 },
  { title: 'Popular Song Remix', uses: '350K', growth: 30 },
  { title: 'Viral Sound Effect', uses: '250K', growth: 25 }
];

export function TrendDashboard() {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
          <Globe className="h-5 w-5 text-gray-500" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-transparent border-none text-sm focus:ring-0"
          >
            <option value="global">Global</option>
            <option value="us">United States</option>
            <option value="eu">Europe</option>
            <option value="asia">Asia</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent border-none text-sm focus:ring-0"
          >
            <option value="all">All Categories</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent border-none text-sm focus:ring-0"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Cross-Platform Engagement</h3>
          <div className="h-80">
            <LineChart
              width={500}
              height={300}
              data={trendingData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tiktok" stroke="#FF0050" />
              <Line type="monotone" dataKey="instagram" stroke="#E1306C" />
              <Line type="monotone" dataKey="youtube" stroke="#FF0000" />
            </LineChart>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Content Category Distribution</h3>
          <div className="h-80">
            <BarChart
              width={500}
              height={300}
              data={[
                { category: 'Tutorial', count: 3500 },
                { category: 'Comedy', count: 2800 },
                { category: 'Lifestyle', count: 2200 },
                { category: 'Education', count: 1900 },
                { category: 'Fashion', count: 1500 }
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Trending Lists */}
      <div className="grid grid-cols-2 gap-6">
        {/* Trending Hashtags */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Trending Hashtags</h3>
            <Hash className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {trendingHashtags.map((hashtag, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{hashtag.tag}</span>
                  <p className="text-sm text-gray-500">{hashtag.count} posts</p>
                </div>
                <span className={`text-sm ${hashtag.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {hashtag.growth > 0 ? '+' : ''}{hashtag.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Sounds */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Trending Sounds</h3>
            <Music className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {trendingSounds.map((sound, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{sound.title}</span>
                  <p className="text-sm text-gray-500">{sound.uses} videos</p>
                </div>
                <span className={`text-sm ${sound.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {sound.growth > 0 ? '+' : ''}{sound.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}