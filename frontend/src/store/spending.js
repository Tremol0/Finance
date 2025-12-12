import { create } from "zustand";

export const useSpendingStore = create((set) => ({
  spendings: [],
  addSpending: (s) =>
    set((state) => ({
      spendings: [...state.spendings, { id: Date.now().toString(), ...s }],
    })),
  updateSpending: (id, updates) =>
    set((state) => ({
      spendings: state.spendings.map((sp) =>
        sp.id === id ? { ...sp, ...updates } : sp
      ),
    })),
  removeSpending: (id) =>
    set((state) => ({ spendings: state.spendings.filter((s) => s.id !== id) })),
  setSpendings: (arr) => set({ spendings: arr }),
}));
