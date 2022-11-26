'use client';

import create from 'zustand';
import { persist } from 'zustand/middleware';

export const storyStore = create(
  persist(
    (set) => ({
      currentStory: null,
      storyRoute: null,
      setCurrentStory: (payload) => set({ currentStory: payload }),
      setStoryRoute: (payload) => set({ storyRoute: payload }),
    }),
    { name: 'story-details', getStorage: () => sessionStorage }
  )
);
