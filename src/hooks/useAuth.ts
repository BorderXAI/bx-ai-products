import { create } from 'zustand';
import { useDailyIdeasStore } from '../stores/dailyIdeasStore';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  loading: false,
  error: null,
  login: async (username: string, password: string) => {
    try {
      set({ loading: true, error: null });
      
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful login, fetch daily ideas
      const dailyIdeasStore = useDailyIdeasStore.getState();
      await dailyIdeasStore.fetchDailyIdeas();
      
      set({ isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ error: message, loading: false });
      return false;
    }
  },
  logout: () => {
    set({ isAuthenticated: false });
    // Clear daily ideas on logout
    useDailyIdeasStore.setState({ ideas: null, error: null });
  }
}));