import { useState, useEffect } from 'react';
import { z } from 'zod';

const API_URL = 'http://localhost:3000/api';

export interface DailyIdea {
  title: string;
  description: string;
  targetAudience: string;
  suggestedFormat: string;
  estimatedEngagement: string;
  trendingHashtags: string[];
  bestTimeToPost: string;
  visualStyle: string;
}

const dailyIdeaSchema = z.object({
  ideas: z.array(z.object({
    title: z.string(),
    description: z.string(),
    targetAudience: z.string(),
    suggestedFormat: z.string(),
    estimatedEngagement: z.string(),
    trendingHashtags: z.array(z.string()),
    bestTimeToPost: z.string(),
    visualStyle: z.string()
  }))
});

export function useIdeasOfDay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<DailyIdea[]>([]);

  const fetchIdeasOfDay = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/content/daily-ideas`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch daily ideas');
      }

      const data = await response.json();
      
      // Validate the response data
      const validatedData = dailyIdeaSchema.parse(data);
      setIdeas(validatedData.ideas);
    } catch (err) {
      console.error('Error fetching daily ideas:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch daily ideas');
      setIdeas([]); // Reset ideas on error
    } finally {
      setLoading(false);
    }
  };

  // Retry mechanism for failed requests
  const retryFetch = async (retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        await fetchIdeasOfDay();
        return; // Success, exit retry loop
      } catch (err) {
        if (i === retries - 1) throw err; // Last retry failed
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    retryFetch().catch(err => {
      console.error('All retry attempts failed:', err);
      setError('Failed to load ideas after multiple attempts');
    });
  }, []);

  return {
    ideas,
    loading,
    error,
    refetch: () => retryFetch()
  };
}