'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const subscribeStore = create(
  persist(
    (set) => ({
      seen: false,
      setSeen: () => set({ seen: true }),
    }),
    { name: 'seen-subscribe' }
  )
);
