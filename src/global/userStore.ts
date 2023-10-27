import { create } from 'zustand';
import { createJSONStorage } from 'zustand/middleware';

export const userStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (userData: UserInterface) => set({ user: userData }),
}));
