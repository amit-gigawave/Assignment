import { CauseSearchType } from "@/models/schema";
import { create } from "zustand";

type State = {
  causes: CauseSearchType[];
  filteredCauses: CauseSearchType[];
  categories: string[];
};

type Actions = {
  setCauses: (causes: CauseSearchType[]) => void;
  setFilteredCauses: (causes: CauseSearchType[]) => void;
  setCategory: (category: string) => void;
};

export const useCauseStore = create<State & Actions>((set) => ({
  causes: [],
  filteredCauses: [],
  categories: [],
  setCauses: (causes) => set({ causes, filteredCauses: causes }),
  setFilteredCauses: (causes) => set({ filteredCauses: causes }),
  setCategory: (category) =>
    set((state) => {
      const categories = state.categories.includes(category)
        ? state.categories.filter((cat) => cat !== category)
        : [...state.categories, category];
      return {
        categories,
        filteredCauses: categories.length
          ? state.causes.filter((cause) =>
              cause.categories.some((category) => categories.includes(category))
            )
          : state.causes,
      };
    }),
}));
