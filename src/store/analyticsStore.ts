import { create } from "zustand";
import type { AnalyticsRange } from "@/api/analytics";

interface AnalyticsStore {
  range: AnalyticsRange;
  setRange: (range: AnalyticsRange) => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  range: "30d",
  setRange: (range) => set({ range }),
}));
