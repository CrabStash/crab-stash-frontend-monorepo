import type { AdditionalInformationForm } from "./";

import { create } from "zustand";

type AdditionalInformationStepStore = {
  additionalInformationStepData: AdditionalInformationForm | null;
  submitAdditionalInformationStepData: (data: AdditionalInformationForm) => void;
  clearAdditionalInformationStepData: () => void;
};

export const useAdditionalInformationStepStore = create<AdditionalInformationStepStore>((set) => ({
  additionalInformationStepData: null,
  submitAdditionalInformationStepData: (data) => {
    set({ additionalInformationStepData: data });
  },
  clearAdditionalInformationStepData: () => {
    set({ additionalInformationStepData: null });
  },
}));
