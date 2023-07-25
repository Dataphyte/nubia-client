import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const projectStore = create(
  persist(
    (set, get) => ({
      currentTab: 'Overview',
      projectsData: [],
      setProjectData: (projectData) => set({ projectData }),
      setCurrentTab: (currentTab) => set({ currentTab }),
    }),
    {
      name: 'project-data',
      getStorage: () => sessionStorage,
    }
  )
);
