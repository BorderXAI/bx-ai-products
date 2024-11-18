import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Target, Users, AlertCircle, Loader2, Hash, Calendar } from 'lucide-react';
import { useDailyIdeasStore } from '../../stores/dailyIdeasStore';

export function IdeationEngine() {
  const [formData, setFormData] = useState({
    productUrl: '',
    targetAudience: '',
    contentGoals: '',
    brandTone: 'casual',
    contentTypes: [] as string[],
    preferredLength: '15',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<any>(null);
  const { dailyIdeas, loading, error, fetchDailyIdeas, refreshIdeas } = useDailyIdeasStore();

  useEffect(() => {
    fetchDailyIdeas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/content/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedIdeas(data);
    } catch (error) {
      console.error('Error generating ideas:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6">
      {/* Ideas of the Day Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ideas of the Day</h2>
          <button
            onClick={() => refreshIdeas()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Give me new ideas
              </>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        ) : dailyIdeas && dailyIdeas.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {dailyIdeas.map((idea, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">{idea.title}</h3>
                <p className="text-gray-600 mb-4">{idea.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm">{idea.targetAudience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm">{idea.bestTimeToPost}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {idea.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No daily ideas available</p>
          </div>
        )}
      </div>

      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}