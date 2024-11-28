import React, { createContext, useContext, useState, ReactNode } from "react";
import type spinningContextType from "./types/spinningContextType";

const SpinningContext = createContext<spinningContextType>({
  getSpinning: false,
  setSpinning: () => { },
});

const SpinningProvider = ({ children }: { children: ReactNode }) => {
  const [getSpinning, setSpinning] = useState(false);

  return (
    <SpinningContext.Provider value={{ getSpinning, setSpinning }}>
      {children}
    </SpinningContext.Provider>
  );
};

const useSpinning = () => useContext(SpinningContext);

export { SpinningProvider, useSpinning };
