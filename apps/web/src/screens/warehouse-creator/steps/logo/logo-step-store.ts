import { create } from "zustand";

type LogoStepData = {
  logoFileName: string;
  logoAsBase64: string;
  logo: File | null;
};

type LogoStepStore = LogoStepData & {
  submitLogoStepData: (data: LogoStepData) => void;
  clearLogoStepData: () => void;
};

export const useLogoStepStore = create<LogoStepStore>((set) => ({
  logoAsBase64: "",
  logoFileName: "",
  logo: null,
  submitLogoStepData: (data) => {
    set(data);
  },
  clearLogoStepData: () => {
    set({
      logoAsBase64: "",
      logoFileName: "",
      logo: null,
    });
  },
}));
