import { create } from "zustand";

interface ResultStore {
  verdict: string;
  sources: string[];
  isLoading: boolean;
  claim: string;
  setVerdict: (data: string) => void;
  setSources: (data: string[]) => void;
  setIsLoading: (data: boolean) => void;
  setClaim: (data: string) => void;
}

export const useResultStore = create<ResultStore>((set) => ({
  verdict: "",
  sources: [],
  isLoading: false,
  claim: "",
  setVerdict: (data) => set({ verdict: data }),
  setSources: (data) => set({ sources: data }),
  setIsLoading: (data) => set({ isLoading: data }),
  setClaim: (data) => set({ claim: data }),
}));
