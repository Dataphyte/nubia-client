import create from 'zustand';

export const notificationStore = create((set) => ({
  content: { text: '', type: 'success', description: '' },
  show: false,
  setContent: (params) => set({ content: params }),
  setShow: (state) => set({ show: state }),
}));
