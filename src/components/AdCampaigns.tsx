import React, { useState } from 'react';
import { Target, Users, TrendingUp, DollarSign, AlertCircle, Loader2, BarChart2, PieChart, LineChart, Activity, Globe, Clock, Zap } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { day: 'Mon', impressions: 12400, clicks: 840, conversions: 24 },
  { day: 'Tue', impressions: 15200, clicks: 920, conversions: 32 },
  { day: 'Wed', impressions: 18100, clicks: 1100, conversions: 38 },
  { day: 'Thu', impressions: 16800, clicks: 980, conversions: 28 },
  { day: 'Fri', impressions: 19500, clicks: 1250, conversions: 42 },
  { day: 'Sat', impressions: 21000, clicks: 1400, conversions: 45 },
  { day: 'Sun', impressions: 17800, clicks: 1150, conversions: 36 }
];

const audienceData = [
  { name: '18-24', value: 25 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 20 },
  { name: '45-54', value: 15 },
  { name: '55+', value: 5 }
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

export function AdCampaigns() {
  const [formData, setFormData] = useState({
    objective: '',
    audience: '',
    budget: '',
    platform: 'all',
    startDate: '',
    endDate: '',
    targeting: {
      age: [],
      gender: [],
      interests: [],
      location: []
    },
    bidStrategy: 'automatic',
    creativeFormat: 'image',
    placement: 'feed'
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [results, setResults] = useState(null);
  const { loading, error, generateAdCampaign } = useAI();

  const metrics = {
    impressions: '152.8K',
    clicks: '7,640',
    ctr: '5.2%',
    conversions: '245',
    conversionRate: '3.2%',
    costPerClick: '$0.48',
    costPerConversion: '$15.20',
    roi: '285%',
    spend: '$3,720',
    revenue: '$14,325'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.values(formData).every(Boolean)) return;

    try {
      const data = await generateAdCampaign(
        formData.objective,
        formData.audience,
        formData.budget,
        formData.platform
      );
      setResults(data);
    } catch (err) {
      console.error('Failed to generate ad campaign:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ad Campaign Management</h1>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Create New Campaign
        </button>
      </div>

      {/* Campaign Performance Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium text-gray-700">CTR</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.ctr}</p>
          <p className="text-sm text-green-600">↑ 12.5% vs last week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-gray-700">ROI</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.roi}</p>
          <p className="text-sm text-green-600">↑ 8.3% vs last week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <h3 className="font-medium text-gray-700">Conversions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.conversions}</p>
          <p className="text-sm text-green-600">↑ 15.2% vs last week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-700">Reach</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.impressions}</p>
          <p className="text-sm text-green-600">↑ 10.1% vs last week</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['overview', 'performance', 'audience', 'creatives', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Performance Chart */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
                <div className="h-80">
                  <RechartsLineChart
                    width={800}
                    height={300}
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="impressions" stroke="#6366f1" />
                    <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" />
                    <Line type="monotone" dataKey="conversions" stroke="#ec4899" />
                  </RechartsLineChart>
                </div>
              </div>

              {/* Audience Demographics */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Audience Demographics</h3>
                <div className="h-80">
                  <RechartsPieChart width={400} height={300}>
                    <Pie
                      data={audienceData}
                      cx={200}
                      cy={150}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </div>
              </div>

              {/* Campaign Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Cost Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost per Click</span>
                      <span className="font-semibold">{metrics.costPerClick}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost per Conversion</span>
                      <span className="font-semibold">{metrics.costPerConversion}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Spend</span>
                      <span className="font-semibold">{metrics.spend}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-semibold">{metrics.revenue}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Campaign Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily Budget</span>
                      <span className="font-semibold">$500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bid Strategy</span>
                      <span className="font-semibold">Automatic</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Schedule</span>
                      <span className="font-semibold">Always Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Campaign Creation Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Objective
                </label>
                <select
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Objective</option>
                  <option value="awareness">Brand Awareness</option>
                  <option value="traffic">Website Traffic</option>
                  <option value="engagement">Post Engagement</option>
                  <option value="leads">Lead Generation</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Platforms</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="google">Google Ads</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Budget
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., $500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bid Strategy
                </label>
                <select
                  value={formData.bidStrategy}
                  onChange={(e) => setFormData({ ...formData, bidStrategy: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual CPC</option>
                  <option value="target_cpa">Target CPA</option>
                  <option value="target_roas">Target ROAS</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <textarea
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                placeholder="Describe your target audience demographics, interests, and behaviors"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Campaign...
                </>
              ) : (
                <>
                  <Target className="h-5 w-5" />
                  Create Campaign
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}