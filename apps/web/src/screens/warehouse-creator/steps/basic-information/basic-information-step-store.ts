import type { BasicInfromationForm } from "./";

import { create } from "zustand";

type BasicInformationStepStore = {
  basicInformationStepData: BasicInfromationForm | null;
  submitBasicInformationStepData: (data: BasicInfromationForm) => void;
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
