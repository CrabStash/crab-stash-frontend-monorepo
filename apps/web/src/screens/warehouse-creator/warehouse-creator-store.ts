import type { BasicInfromationForm } from "./steps/basic-information";
import type { WarehouseCreatorStep } from "./types";

import { create } from "zustand";

type WarehouseCreatorStoreState = {
  step: WarehouseCreatorStep;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

const stepsInOrder: WarehouseCreatorStep[] = [
  "basic-information",
  "logo",
  "additional-information",
];

export const useWarehouseCreatorStore = create<WarehouseCreatorStoreState>((set, get) => ({
  step: "basic-information",
  goToNextStep: () => {
    const { step } = get();
    const currentIndex = stepsInOrder.findIndex((stepInOrder) => stepInOrder === step);
    const nextStep = stepsInOrder[currentIndex + 1];

    if (nextStep) {
      set({ step: nextStep });
    }
  },
  goToPreviousStep: () => {
    const { step } = get();
    const currentIndex = stepsInOrder.findIndex((stepInOrder) => stepInOrder === step);
    const previousStep = stepsInOrder[currentIndex - 1];

    if (previousStep) {
      set({ step: previousStep });
    }
  },
}));
