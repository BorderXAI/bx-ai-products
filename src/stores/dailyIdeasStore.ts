import { create } from 'zustand';

interface DailyIdea {
  title: string;
  description: string;
  targetAudience: string;
  contentFormat: string;
  engagementPotential: string;
  hashtags: string[];
  bestTimeToPost: string;
  visualStyle: string;
}

interface DailyIdeasState {
  dailyIdeas: DailyIdea[] | null;
  loading: boolean;
  error: string | null;
  fetchDailyIdeas: () => Promise<void>;
  refreshIdeas: () => Promise<void>;
}

export const useDailyIdeasStore = create<DailyIdeasState>((set) => ({
  dailyIdeas: null,
  loading: false,
  error: null,
  
  fetchDailyIdeas: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch('http://localhost:3000/api/content/daily-ideas');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !data.ideas || !Array.isArray(data.ideas)) {
        throw new Error('Invalid response format or no ideas available');
      }
      
      set({ 
        dailyIdeas: data.ideas,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching daily ideas:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch daily ideas',
        loading: false,
        dailyIdeas: null
      });
    }
  },

  refreshIdeas: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch('http://localhost:3000/api/content/daily-ideas');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !data.ideas || !Array.isArray(data.ideas)) {
        throw new Error('Invalid response format or no ideas available');
      }
      
      set({ 
        dailyIdeas: data.ideas,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error refreshing ideas:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to refresh ideas',
        loading: false
      });
    }
  }
}));