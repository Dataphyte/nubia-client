'use client';

import create from 'zustand';
import { persist } from 'zustand/middleware';

export const storyStore = create(
  persist(
    (set) => ({
      storyRoute: null,
      currentStory: null,
      currentData: null,
      currentStoryCategory: null,
      setCurrentData: (currentData) => set({ currentData }),
      setStoryRoute: (storyRoute) => set({ storyRoute }),
      setCurrentStory: (currentStory) => set({ currentStory }),
      setCurrentStoryCategory: (currentStoryCategory) =>
        set({ currentStoryCategory }),
    }),
    { name: 'story-details', getStorage: () => sessionStorage }
  )
);
