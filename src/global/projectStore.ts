import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProjectStore } from '../typescript/project';

export const projectStore = create<ProjectStore>()(
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
      template: { editor: '', content: '' },
      updateData: null,
      data_url: '',
      setTemplate: (template) => set({ template }),
      setStatus: (id, status) =>
        set((state) => ({
          status: state.status.map((entry) =>
            entry.id === id ? { ...entry, complete: status } : entry
          ),
        })),
      setProjectData: (projectData) => set({ projectData }),
      setCurrentTab: (currentTab) => set({ currentTab }),
      setUpdateData: (updateData) => set({ updateData }),
      setDataUrl: (data_url) => set({ data_url }),
    }),
    {
      name: 'project-data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
