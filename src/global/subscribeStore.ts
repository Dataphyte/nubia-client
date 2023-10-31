'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const subscribeStore = create<SubscribeStore>()(
  persist(
    (set) => ({
      seen: false,
      setSeen: () => set({ seen: true }),
    }),
    { name: 'seen-subscribe', storage: createJSONStorage(() => localStorage) }
  )
);
