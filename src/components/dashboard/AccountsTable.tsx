import React from 'react';
import { Users, TrendingUp, Eye, Heart, MessageSquare, Plus, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccountPerformance {
  id: string;
  username: string;
  followers: number;
  engagement: number;
  views: number;
  likes: number;
  comments: number;
  growth: number;
  status: string;
}

const accounts: AccountPerformance[] = [
  {
    id: '1',
    username: '@fashionista',
    followers: 125000,
    engagement: 8.2,
    views: 450000,
    likes: 89000,
    comments: 12500,
    growth: 15.2,
    status: 'active'
  },
  {
    id: '2',
    username: '@beautyexpert',
    followers: 85000,
    engagement: 6.8,
    views: 320000,
    likes: 65000,
    comments: 8900,
    growth: -2.5,
    status: 'active'
  },
  {
    id: '3',
    username: '@techreview',
    followers: 200000,
    engagement: 9.1,
    views: 680000,
    likes: 145000,
    comments: 18500,
    growth: 28.4,
    status: 'active'
  }
];

export function AccountsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">TikTok Accounts</h2>
          <p className="text-sm text-gray-500">Manage all your TikTok creator accounts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Add Account
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-gray-600">Account</th>
              <th className="text-right p-3 text-gray-600">Followers</th>
              <th className="text-right p-3 text-gray-600">Engagement</th>
              <th className="text-right p-3 text-gray-600">Views</th>
              <th className="text-right p-3 text-gray-600">Likes</th>
              <th className="text-right p-3 text-gray-600">Comments</th>
              <th className="text-right p-3 text-gray-600">Growth</th>
              <th className="text-right p-3 text-gray-600">Status</th>
              <th className="text-right p-3 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{account.username}</p>
                      <p className="text-sm text-gray-500">Creator Account</p>
                    </div>
                  </div>
                </td>
                <td className="text-right p-3">{(account.followers / 1000).toFixed(1)}K</td>
                <td className="text-right p-3">{account.engagement}%</td>
                <td className="text-right p-3">{(account.views / 1000).toFixed(1)}K</td>
                <td className="text-right p-3">{(account.likes / 1000).toFixed(1)}K</td>
                <td className="text-right p-3">{(account.comments / 1000).toFixed(1)}K</td>
                <td className="text-right p-3">
                  <span className={account.growth >= 0 ? "text-green-600" : "text-red-600"}>
                    {account.growth >= 0 ? "+" : ""}{account.growth}%
                  </span>
                </td>
                <td className="text-right p-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {account.status}
                  </span>
                </td>
                <td className="text-right p-3">
                  <Link 
                    to="/content"
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    <Video className="h-4 w-4" /> Create Video
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}