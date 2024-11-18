import React, { useState } from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import ResearchResults from '../components/ResearchResults';

function MarketResearch() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        swot: {
          strengths: ['Strong brand recognition', 'Innovative product line', 'Global presence'],
          weaknesses: ['High production costs', 'Limited market share in emerging markets'],
          opportunities: ['Expanding e-commerce market', 'Growing demand in Asia'],
          threats: ['Increasing competition', 'Economic uncertainty']
        },
        competitors: [
          { name: 'Company A', marketShare: '35%', strengths: ['Price', 'Distribution'] },
          { name: 'Company B', marketShare: '28%', strengths: ['Quality', 'Innovation'] }
        ],
        marketSize: '$50B',
        growth: '12% YoY'
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Market Research Analysis
        </h1>
        <p className="text-gray-600">
          Enter a company URL or name to get comprehensive market insights
        </p>
      </header>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-md">
          <div className="pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter company URL or name (e.g., apple.com)"
            className="flex-1 p-4 pl-3 focus:outline-none rounded-l-lg"
          />
          <button
            type="submit"
            disabled={loading || !url}
            className="bg-indigo-600 text-white px-6 py-4 rounded-r-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>

      {results && <ResearchResults data={results} />}
    </div>
  );
}

export default MarketResearch;