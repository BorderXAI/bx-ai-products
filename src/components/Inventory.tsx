import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, BarChart2, Package as PackageIcon, RefreshCw, Search, Filter, Clock, DollarSign, Truck, ShoppingBag, Box, ArrowRight, ChevronDown, Settings, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderPoint: number;
  incoming: number;
  category: string;
  price: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

const salesActivityData = [
  { status: 'TO BE PACKED', count: 228, color: 'text-blue-600' },
  { status: 'TO BE SHIPPED', count: 6, color: 'text-purple-600' },
  { status: 'TO BE DELIVERED', count: 10, color: 'text-green-600' },
  { status: 'TO BE INVOICED', count: 474, color: 'text-orange-600' }
];

const topSellingData = [
  { name: 'Cotton T-Shirts', quantity: 171, unit: 'pcs', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80' },
  { name: 'Winter Jackets', quantity: 45, unit: 'sets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80' },
  { name: 'Denim Jeans', quantity: 89, unit: 'pcs', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=80' }
];

const productStatusData = [
  { name: 'Active', value: 71 },
  { name: 'Inactive', value: 29 }
];

const COLORS = ['#10B981', '#6B7280'];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your product inventory</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5 text-gray-500" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Package className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Sales Activity Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {salesActivityData.map((item) => (
          <div key={item.status} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{item.status}</h3>
            <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Product Details */}
        <div className="col-span-2 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="apparel">Apparel</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Product Status Chart */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Status</h3>
                <div className="h-64">
                  <PieChart width={250} height={250}>
                    <Pie
                      data={productStatusData}
                      cx={125}
                      cy={125}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {productStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Products</span>
                    <span className="font-semibold">190</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Items</span>
                    <span className="font-semibold">135</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Low Stock Items</span>
                    <span className="font-semibold text-yellow-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Out of Stock</span>
                    <span className="font-semibold text-red-600">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm border rounded-lg px-2 py-1"
              >
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Stock Updated</p>
                  <p className="text-xs text-gray-500">Cotton T-Shirts +50 units</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Low Stock Alert</p>
                  <p className="text-xs text-gray-500">Winter Jackets (5 units remaining)</p>
                </div>
                <span className="text-xs text-gray-500">4 hours ago</span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Incoming Shipment</p>
                  <p className="text-xs text-gray-500">Denim Jeans (100 units)</p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Top Selling & Summary */}
        <div className="space-y-6">
          {/* Inventory Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-6">Inventory Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity in Hand</span>
                <span className="font-semibold">10,458</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity to be Received</span>
                <span className="font-semibold">168</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Value</span>
                <span className="font-semibold">$124,582</span>
              </div>
            </div>
          </div>

          {/* Top Selling Items */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-6">Top Selling Items</h3>
            <div className="space-y-4">
              {topSellingData.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Package className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">Add Stock</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Truck className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">New Order</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <BarChart2 className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">Reports</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Settings className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}