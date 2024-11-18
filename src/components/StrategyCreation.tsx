import React, { useState } from 'react';
import { Brain, Target, MessageSquare, Rocket, AlertCircle, Loader2 } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import StrategyResults from './StrategyResults';

export function StrategyCreation() {
  const [formData, setFormData] = useState({
    industry: '',
    target: '',
    goals: '',
    budget: ''
  });
  const [results, setResults] = useState(null);
  const { loading, error, generateStrategy } = useAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.values(formData).every(Boolean)) return;

    try {
      const data = await generateStrategy(
        formData.industry,
        formData.target,
        formData.goals,
        formData.budget
      );
      setResults(data);
    } catch (err) {
      console.error('Failed to generate strategy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-strategy">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Strategy Creation</h1>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="space-y-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={loading}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Goals
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                placeholder="What are your main business objectives?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={loading}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !Object.values(formData).every(Boolean)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Strategy...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  Generate Strategy
                </>
              )}
            </button>
          </div>
        </form>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Marketing Plan</h2>
            </div>
            <p className="text-gray-600">
              Customized marketing strategies based on your objectives
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Content Strategy</h2>
            </div>
            <p className="text-gray-600">
              Content plans optimized for your target audience
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Action Items</h2>
            </div>
            <p className="text-gray-600">
              Prioritized tasks and implementation timeline
            </p>
          </div>
        </div>

        {results ? (
          <StrategyResults data={results} />
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Your Strategy</h2>
            <p className="text-gray-600">
              Fill out the form above to generate a customized strategy
            </p>
          </div>
        )}
      </div>
    </div>
  );
}