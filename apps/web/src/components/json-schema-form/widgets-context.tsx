import { createContext, useContext, useState } from "react";

const WidegetContext = createContext<{
  parentId: string | null;
  setParentId?: (id: string | null) => void;
}>({
  parentId: null,
  setParentId: () => {
    // do nothing
  },
});

export const WidegetContextProvider = ({ children }) => {
  const [parentId, setParentId] = useState<string | null>(null);

  return (
    <WidegetContext.Provider value={{ parentId, setParentId }}>{children}</WidegetContext.Provider>
  );
};

export const useWidegetContext = () => {
  const context = useContext(WidegetContext);

  if (!context) {
    throw new Error("useWidegetContext must be used within a WidegetContextProvider");
  }

  return context;
};
