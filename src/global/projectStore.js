import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const projectStore = create(
  persist(
    (set, get) => ({
      currentTab: 'Overview',
      projectData: null,
      status: [
        { id: 1, text: 'Project Details', complete: true },
        { id: 2, text: 'Add Data', complete: false },
        { id: 3, text: 'Write a template', complete: false },
        { id: 4, text: 'Customize features', complete: false },
        { id: 5, text: 'Submit project', complete: false },
      ],
      template: '',
      features: [],
      setFeatures: (features) => set({ features }),
      setTemplate: (template) => set({ template }),
      setStatus: (id, status) =>
        set((state) => ({
          status: state.status.map((entry) =>
            entry.id === id ? { ...entry, complete: status } : entry
          ),
        })),
      setProjectData: (projectData) => set({ projectData }),
      setCurrentTab: (currentTab) => set({ currentTab }),
    }),
    {
      name: 'project-data',
      getStorage: () => sessionStorage,
    }
  )
);
