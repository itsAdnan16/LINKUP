import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("linkup-theme") || "coffee",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("linkup-theme", theme);
  },
}));