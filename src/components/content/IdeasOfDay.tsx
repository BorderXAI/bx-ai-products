import React from 'react';
import { useIdeasOfDay } from '../../hooks/useIdeasOfDay';
import { Sparkles, Clock, Users, Layout, RefreshCw, AlertCircle } from 'lucide-react';

export function IdeasOfDay() {
  const { ideas, loading, error, refetch } = useIdeasOfDay();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <div>
          <p className="text-red-700 font-medium">Error loading ideas</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="ml-auto flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <RefreshCw className="h-6 w-6 animate-spin text-indigo-600 mx-auto mb-2" />
        <p className="text-gray-600">Loading fresh content ideas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Ideas of the Day</h2>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Ideas
        </button>
      </div>

      <div className="grid gap-6">
        {ideas.map((idea, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">{idea.title}</h3>
            <p className="text-gray-600 mb-4">{idea.description}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{idea.targetAudience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{idea.suggestedFormat}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{idea.estimatedEngagement}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{idea.bestTimeToPost}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Trending Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {idea.trendingHashtags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Style</h4>
                <p className="text-sm text-gray-600">{idea.visualStyle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}