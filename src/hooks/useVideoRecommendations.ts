import { useState } from 'react';
import { z } from 'zod';

const API_URL = 'http://localhost:3000/api';

export interface VideoRecommendation {
  id: string;
  title: string;
  creator: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  duration: string;
  category: string;
  similarityScore: number;
  thumbnail: string;
  keyTakeaways: string[];
}

const recommendationSchema = z.object({
  success: z.boolean(),
  recommendations: z.array(z.object({
    id: z.string(),
    title: z.string(),
    creator: z.string(),
    views: z.string(),
    likes: z.string(),
    comments: z.string(),
    shares: z.string(),
    duration: z.string(),
    category: z.string(),
    similarityScore: z.number(),
    thumbnail: z.string(),
    keyTakeaways: z.array(z.string())
  }))
});

export function useVideoRecommendations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (
    category: string,
    styleTags: string[]
  ): Promise<VideoRecommendation[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/recommendations/daily`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          style_tags: styleTags
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      const validated = recommendationSchema.parse(data);
      return validated.recommendations;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch recommendations';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchRecommendations
  };
}