import { create } from "zustand";

type LogoStepData = {
  logoFileName: string;
  logoAsBase64: string;
};

type LogoStepStore = LogoStepData & {
  submitLogoStepData: (data: LogoStepData) => void;
  clearLogoStepData: () => void;
};

export const useLogoStepStore = create<LogoStepStore>((set) => ({
  logoAsBase64: "",
  logoFileName: "",
  submitLogoStepData: (data) => {
    set(data);
  },
  clearLogoStepData: () => {
    set({
      logoAsBase64: "",
      logoFileName: "",
    });
  },
}));
