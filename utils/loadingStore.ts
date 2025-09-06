import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  message?: string;
  subMessage?: string;
  showLoading: (message?: string, subMessage?: string) => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  message: undefined,
  subMessage: undefined,
  showLoading: (message, subMessage) => 
    set({ isLoading: true, message, subMessage }),
  hideLoading: () => 
    set({ isLoading: false, message: undefined, subMessage: undefined }),
}));
