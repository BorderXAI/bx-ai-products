import React, { useState } from 'react';
import {
  Users, Search, Filter, Star, Phone, Mail, Clock, ShoppingBag,
  BarChart2, PieChart as PieChartIcon, Download, Printer, MoreHorizontal,
  Plus, ChevronDown, Building, Calendar, DollarSign, CheckCircle, XCircle,
  ArrowRight, FileText, MessageSquare, Bell
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const dealStagesData = [
  { name: 'Jan 2024', qualified: 4, proposal: 2, negotiation: 3, closed: 2 },
  { name: 'Feb 2024', qualified: 3, proposal: 3, negotiation: 2, closed: 3 },
  { name: 'Mar 2024', qualified: 5, proposal: 4, negotiation: 4, closed: 3 }
];

const leadSourceData = [
  { name: 'Website', value: 45 },
  { name: 'Referral', value: 25 },
  { name: 'Social', value: 20 },
  { name: 'Direct', value: 10 }
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  lastContact: string;
  deals: number;
  value: number;
  tags: string[];
}

export function CRM() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [view, setView] = useState('card');

  const metrics = {
    totalLeads: '1,256',
    contactsAdded: '1,059',
    dealsClosed: '9,813',
    revenue: '$95,123'
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage contacts, companies, and deals in one place</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">Notifications</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Plus className="h-5 w-5" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium text-gray-700">Total Leads</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</p>
          <p className="text-sm text-green-600">↑ 12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-700">Contacts Added</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.contactsAdded}</p>
          <p className="text-sm text-green-600">↑ 8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-gray-700">Deals Closed</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.dealsClosed}</p>
          <p className="text-sm text-green-600">↑ 15% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-yellow-600" />
            <h3 className="font-medium text-gray-700">Revenue Generated</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.revenue}</p>
          <p className="text-sm text-green-600">↑ 20% from last month</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Charts */}
        <div className="col-span-2 space-y-6">
          {/* Deal Stages Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Stages of Deals</h2>
              <div className="flex items-center gap-2">
                <select className="text-sm border rounded-lg px-2 py-1">
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <BarChart
                width={600}
                height={300}
                data={dealStagesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="qualified" fill="#6366f1" />
                <Bar dataKey="proposal" fill="#8b5cf6" />
                <Bar dataKey="negotiation" fill="#ec4899" />
                <Bar dataKey="closed" fill="#f43f5e" />
              </BarChart>
            </div>
          </div>

          {/* Lead Sources Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Leads by Source</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  <Download className="h-5 w-5" />
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  <Printer className="h-5 w-5" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <PieChart width={400} height={300}>
                <Pie
                  data={leadSourceData}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Users className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">Add Contact</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Building className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">Add Company</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <DollarSign className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">New Deal</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Calendar className="h-6 w-6 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-700">Schedule</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">New deal created</p>
                  <p className="text-xs text-gray-500">Tech Solutions Ltd. - $45,000</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Meeting scheduled</p>
                  <p className="text-xs text-gray-500">Product demo with InnovateCorp</p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">New contact added</p>
                  <p className="text-xs text-gray-500">Sarah Chen - Marketing Director</p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-700">
              View All Activity →
            </button>
          </div>

          {/* Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700">
                View All
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input type="checkbox" className="rounded text-indigo-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Follow up with John regarding proposal</p>
                  <p className="text-xs text-gray-500">Due today</p>
                </div>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  High
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input type="checkbox" className="rounded text-indigo-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Prepare quarterly sales report</p>
                  <p className="text-xs text-gray-500">Due in 2 days</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Medium
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input type="checkbox" className="rounded text-indigo-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Schedule team review meeting</p>
                  <p className="text-xs text-gray-500">Due in 3 days</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Low
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}