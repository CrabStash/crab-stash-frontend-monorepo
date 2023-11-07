import type { BasicInformationForm } from ".";

import { create } from "zustand";

type BasicInformationStepStore = {
  basicInformationStepData: BasicInformationForm | null;
  submitBasicInformationStepData: (data: BasicInformationForm) => void;
  clearBasicInformationStepData: () => void;
};

export const useBasicInformationStepStore = create<BasicInformationStepStore>((set) => ({
  basicInformationStepData: null,
  submitBasicInformationStepData: (data) => {
    set({ basicInformationStepData: data });
  },
  clearBasicInformationStepData: () => {
    set({ basicInformationStepData: null });
  },
}));
