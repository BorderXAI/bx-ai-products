import { create } from 'zustand';
import { z } from 'zod';

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

interface IdeasState {
  dailyIdeas: DailyIdea[];
  loading: boolean;
  error: string | null;
  lastFetched: Date | null;
  fetchDailyIdeas: () => Promise<void>;
  setError: (error: string | null) => void;
}

const API_URL = 'http://localhost:3000/api';

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

export const useIdeasStore = create<IdeasState>((set, get) => ({
  dailyIdeas: [],
  loading: false,
  error: null,
  lastFetched: null,

  fetchDailyIdeas: async () => {
    // Check if ideas were fetched in the last 24 hours
    const lastFetched = get().lastFetched;
    if (lastFetched && new Date().getTime() - lastFetched.getTime() < 24 * 60 * 60 * 1000) {
      return; // Return if ideas were fetched less than 24 hours ago
    }

    set({ loading: true, error: null });

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
      const validatedData = dailyIdeaSchema.parse(data);
      
      set({ 
        dailyIdeas: validatedData.ideas,
        lastFetched: new Date(),
        loading: false 
      });
    } catch (err) {
      console.error('Error fetching daily ideas:', err);
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch daily ideas',
        loading: false 
      });
    }
  },

  setError: (error) => set({ error })
}));