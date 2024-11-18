import { useState } from 'react';
import { z } from 'zod';

const API_URL = 'http://localhost:3000/api';

// Types
export interface ContentIdea {
  contentBriefs: Array<{
    title: string;
    hook: string;
    keyPoints: string[];
    estimatedEngagement: string;
    recommendedHashtags: string[];
    suggestedSound: string;
    visualStyle: string;
  }>;
  recommendedTimes: {
    bestDays: string[];
    bestHours: string[];
  };
  trendAlignment: {
    relevantTrends: string[];
    recommendedAngles: string[];
  };
}

export interface IdeaRequest {
  productUrl: string;
  targetAudience: string;
  contentGoals: string;
  brandTone: 'casual' | 'professional' | 'luxury' | 'playful';
  contentTypes: string[];
  preferredLength: string;
}

// Validation schema
const ideaResponseSchema = z.object({
  contentBriefs: z.array(z.object({
    title: z.string(),
    hook: z.string(),
    keyPoints: z.array(z.string()),
    estimatedEngagement: z.string(),
    recommendedHashtags: z.array(z.string()),
    suggestedSound: z.string(),
    visualStyle: z.string()
  })),
  recommendedTimes: z.object({
    bestDays: z.array(z.string()),
    bestHours: z.array(z.string())
  }),
  trendAlignment: z.object({
    relevantTrends: z.array(z.string()),
    recommendedAngles: z.array(z.string())
  })
});

export function useContentIdeas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateIdeas = async (request: IdeaRequest): Promise<ContentIdea | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/content/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content ideas');
      }

      const data = await response.json();
      const validatedData = ideaResponseSchema.parse(data);
      return validatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTrends = async () => {
    try {
      const response = await fetch(`${API_URL}/content/trends`);
      if (!response.ok) throw new Error('Failed to fetch trends');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trends');
      return null;
    }
  };

  const generateSchedule = async (contentTypes: string[]) => {
    try {
      const response = await fetch(`${API_URL}/content/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentTypes }),
      });
      if (!response.ok) throw new Error('Failed to generate schedule');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate schedule');
      return null;
    }
  };

  return {
    loading,
    error,
    generateIdeas,
    getTrends,
    generateSchedule,
  };
}