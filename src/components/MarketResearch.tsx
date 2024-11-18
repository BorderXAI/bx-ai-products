import React, { useState } from 'react';
import { Search, ChevronDown, BarChart2, Users, Target, Brain, AlertCircle, Upload, Download, Loader2, LineChart, PieChart, DollarSign, TrendingUp, Bell, Zap } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import ResearchResults from './ResearchResults';

interface URLInput {
  url: string;
  platform: 'tiktok' | 'amazon';
  isValid: boolean;
}

const mockAnalysis = {
  swot: {
    strengths: [
      "High product rating (4.8/5)",
      "Competitive pricing strategy",
      "Strong brand recognition",
      "Premium quality materials"
    ],
    weaknesses: [
      "Limited color options",
      "Higher shipping costs",
      "Seasonal demand fluctuations"
    ],
    opportunities: [
      "Expanding market demand",
      "Growing e-commerce adoption",
      "International market potential",
      "Social media trend alignment"
    ],
    threats: [
      "Increasing competition",
      "Price sensitivity in market",
      "Supply chain vulnerabilities"
    ]
  },
  competitors: [
    {
      name: "PrimeGoods Inc.",
      marketShare: "32%",
      strengths: ["Price leadership", "Wide distribution", "Brand loyalty"]
    },
    {
      name: "QualityBrands Co.",
      marketShare: "28%",
      strengths: ["Product quality", "Customer service", "Innovation"]
    },
    {
      name: "TrendSetters Ltd.",
      marketShare: "15%",
      strengths: ["Social media presence", "Youth appeal", "Fast production"]
    }
  ],
  marketSize: "$4.2B",
  growth: "15.3% YoY",
  pricing: {
    average: "$89.99",
    range: "$49.99 - $149.99",
    optimal: "$79.99 - $99.99"
  },
  demographics: {
    ageGroups: [
      { group: "18-24", percentage: 15 },
      { group: "25-34", percentage: 35 },
      { group: "35-44", percentage: 28 },
      { group: "45-54", percentage: 15 },
      { group: "55+", percentage: 7 }
    ],
    gender: {
      female: 65,
      male: 35
    },
    topLocations: [
      "California",
      "New York",
      "Texas",
      "Florida"
    ]
  },
  salesMetrics: {
    monthlyVolume: "12,500 units",
    averageOrder: "1.8 units",
    peakSeason: "November-December",
    estimatedGMV: "$1.1M/month"
  }
};

export function MarketResearch() {
  const [urlInputs, setUrlInputs] = useState<URLInput[]>([{ url: '', platform: 'amazon', isValid: true }]);
  const [results, setResults] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('us');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loading, generateMarketResearch } = useAI();

  const regions = {
    us: { flag: "🇺🇸", name: "United States" },
    uk: { flag: "🇬🇧", name: "United Kingdom" },
    eu: { flag: "🇪🇺", name: "European Union" },
    ca: { flag: "🇨🇦", name: "Canada" },
    au: { flag: "🇦🇺", name: "Australia" }
  };

  const validateUrl = (url: string, platform: 'amazon' | 'tiktok'): boolean => {
    if (platform === 'amazon') {
      return url.includes('amazon.com') || url.includes('amzn.to');
    }
    return url.includes('tiktok.com');
  };

  const handleUrlChange = (index: number, value: string) => {
    const newInputs = [...urlInputs];
    newInputs[index].url = value;
    newInputs[index].isValid = validateUrl(value, newInputs[index].platform);
    setUrlInputs(newInputs);
  };

  const handlePlatformChange = (index: number, platform: 'amazon' | 'tiktok') => {
    const newInputs = [...urlInputs];
    newInputs[index].platform = platform;
    newInputs[index].isValid = validateUrl(newInputs[index].url, platform);
    setUrlInputs(newInputs);
  };

  const addUrlInput = () => {
    if (urlInputs.length < 10) {
      setUrlInputs([...urlInputs, { url: '', platform: 'amazon', isValid: true }]);
    }
  };

  const removeUrlInput = (index: number) => {
    const newInputs = [...urlInputs];
    newInputs.splice(index, 1);
    setUrlInputs(newInputs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate all URLs
    const invalidUrls = urlInputs.filter(input => !input.isValid && input.url.trim() !== '');
    if (invalidUrls.length > 0) {
      setError('Please enter valid URLs for the selected platforms');
      return;
    }

    // Filter out empty URLs
    const validUrls = urlInputs.filter(input => input.url.trim() !== '');
    if (validUrls.length === 0) {
      setError('Please enter at least one URL to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setResults(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Product Market Analysis
        </h1>
        <p className="text-xl text-gray-600">
          Get comprehensive market insights from any e-commerce product URL
        </p>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Region Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">Select Region:</label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-8 pr-10 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {Object.entries(regions).map(([code, { flag, name }]) => (
                  <option key={code} value={code}>
                    {flag} {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* URL Inputs */}
          <div className="space-y-4">
            {urlInputs.map((input, index) => (
              <div key={index} className="flex gap-4">
                <select
                  value={input.platform}
                  onChange={(e) => handlePlatformChange(index, e.target.value as 'amazon' | 'tiktok')}
                  className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="amazon">Amazon</option>
                  <option value="tiktok">TikTok</option>
                </select>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input.url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder={`Enter ${input.platform} URL`}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      !input.isValid && input.url.trim() !== '' ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {!input.isValid && input.url.trim() !== '' && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {urlInputs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUrlInput(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add URL Button */}
          {urlInputs.length < 10 && (
            <button
              type="button"
              onClick={addUrlInput}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Add Another URL ({urlInputs.length}/10)
            </button>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing Products...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                Analyze Products
              </>
            )}
          </button>
        </form>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <BarChart2 className="h-6 w-6 text-indigo-600" />
            <span className="text-sm text-gray-500">Real-time</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Market Intelligence
          </h3>
          <p className="text-gray-600 text-sm">
            Get detailed insights on category trends, pricing analysis, and sales estimates
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-6 w-6 text-indigo-600" />
            <span className="text-sm text-gray-500">Automated</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Competitive Analysis
          </h3>
          <p className="text-gray-600 text-sm">
            Track competitors, market share, and positioning strategies
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Bell className="h-6 w-6 text-indigo-600" />
            <span className="text-sm text-gray-500">24/7</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Smart Alerts
          </h3>
          <p className="text-gray-600 text-sm">
            Get notified about price changes, stock status, and new competitors
          </p>
        </div>
      </div>

      {/* Results Section */}
      {results && <ResearchResults data={results} />}
    </div>
  );
}