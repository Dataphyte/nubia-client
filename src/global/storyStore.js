'use client';

import create from 'zustand';
import { persist } from 'zustand/middleware';

export const storyStore = create(
  persist(
    (set) => ({
      storyRoute: null,
      currentStory: null,
      currentStoryCategory: null,
      setStoryRoute: (payload) => set({ storyRoute: payload }),
      setCurrentStory: (payload) => set({ currentStory: payload }),
      setCurrentStoryCategory: (payload) =>
        set({ currentStoryCategory: payload }),
    }),
    { name: 'story-details', getStorage: () => sessionStorage }
  )
);
