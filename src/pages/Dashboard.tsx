import React from 'react';
import { ShopsTable } from '../components/dashboard/ShopsTable';
import { AccountsTable } from '../components/dashboard/AccountsTable';
import { LiveStreamTable } from '../components/dashboard/LiveStreamTable';
import { DollarSign, ShoppingBag, Activity, Eye, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const overallMetrics = {
    totalSales: 458920,
    totalOrders: 12840,
    totalViews: 2450000,
    totalComments: 245000,
    totalGMV: 892450
  };

  return (
    <div className="min-h-screen bg-dashboard">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {/* Total Sales */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-purple-100 rounded-lg mb-3">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold mb-1 text-gray-800">
                ${(overallMetrics.totalSales / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-500">Total Sales</p>
              <div className="flex items-center text-green-600 mt-2">
                <span className="text-sm">+23.5%</span>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-lg mb-3">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold mb-1 text-gray-800">
                {(overallMetrics.totalOrders / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-500">Total Orders</p>
              <div className="flex items-center text-green-600 mt-2">
                <span className="text-sm">+18.2%</span>
              </div>
            </div>
          </div>

          {/* Total GMV */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-green-100 rounded-lg mb-3">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold mb-1 text-gray-800">
                ${(overallMetrics.totalGMV / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-500">Total GMV</p>
              <div className="flex items-center text-green-600 mt-2">
                <span className="text-sm">+12.5%</span>
              </div>
            </div>
          </div>

          {/* Total Video Views */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-yellow-100 rounded-lg mb-3">
                <Eye className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold mb-1 text-gray-800">
                {(overallMetrics.totalViews / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-500">Video Views</p>
              <div className="flex items-center text-green-600 mt-2">
                <span className="text-sm">+24.8%</span>
              </div>
            </div>
          </div>

          {/* Total Comments */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-pink-100 rounded-lg mb-3">
                <MessageSquare className="h-8 w-8 text-pink-600" />
              </div>
              <p className="text-3xl font-bold mb-1 text-gray-800">
                {(overallMetrics.totalComments / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-500">Total Comments</p>
              <div className="flex items-center text-green-600 mt-2">
                <span className="text-sm">+15.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* TikTok Shops Section */}
          <ShopsTable />

          {/* TikTok Accounts Section */}
          <AccountsTable />

          {/* Live Stream Management Section */}
          <LiveStreamTable />
        </div>
      </div>
    </div>
  );
}