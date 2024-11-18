import React, { useState } from 'react';
import { Target, Lightbulb, Users, Loader2 } from 'lucide-react';
import StrategyResults from '../components/StrategyResults';

function StrategyGenerator() {
  const [formData, setFormData] = useState({
    industry: '',
    target: '',
    goals: '',
    budget: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        strategy: {
          overview: 'Focus on digital transformation and customer experience',
          channels: ['Social Media', 'Content Marketing', 'Email Campaigns'],
          timeline: '6 months',
          budget: '$50,000'
        },
        personas: [
          {
            name: 'Tech-Savvy Professional',
            age: '25-34',
            interests: ['Technology', 'Innovation', 'Digital Solutions'],
            painPoints: ['Time management', 'Cost efficiency']
          },
          {
            name: 'Enterprise Decision Maker',
            age: '35-50',
            interests: ['Business Growth', 'ROI', 'Enterprise Solutions'],
            painPoints: ['Risk management', 'Scale operations']
          }
        ],
        kpis: [
          { metric: 'Customer Acquisition', target: '+25%' },
          { metric: 'Engagement Rate', target: '+40%' },
          { metric: 'ROI', target: '3.5x' }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Strategy Generator
        </h1>
        <p className="text-gray-600">
          Generate personalized marketing strategies based on your business needs
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="e.g., Technology, Retail, Healthcare"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Market
            </label>
            <input
              type="text"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              placeholder="e.g., B2B, Small Businesses, Consumers"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Goals
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              placeholder="What are your main business objectives?"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Budget
            </label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="e.g., $5,000"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !Object.values(formData).every(Boolean)}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Lightbulb className="h-5 w-5" />
              <span>Generate Strategy</span>
            </>
          )}
        </button>
      </form>

      {results && <StrategyResults data={results} />}
    </div>
  );
}

export default StrategyGenerator;