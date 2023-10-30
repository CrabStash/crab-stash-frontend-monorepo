import { useState } from "react";

import type { WarehouseCreatorStep } from "./types";

const stepsInOrder: WarehouseCreatorStep[] = [
  "basic-information",
  "logo",
  "additional-information",
];

function useWarehouseCreatorNavigation() {
  const [currentStep, setCurrentStep] = useState<WarehouseCreatorStep>("basic-information");

  const goToNextStep = () => {
    const currentIndex = stepsInOrder.findIndex((step) => step === currentStep);
    const nextStep = stepsInOrder[currentIndex + 1];

    if (!nextStep) {
      return;
    }

    setCurrentStep(nextStep);
  };

  const goToPreviousStep = () => {
    const currentIndex = stepsInOrder.findIndex((step) => step === currentStep);
    const previousStep = stepsInOrder[currentIndex - 1];

    if (!previousStep) {
      return;
    }

    setCurrentStep(previousStep);
  };

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
  };
}

export default useWarehouseCreatorNavigation;
