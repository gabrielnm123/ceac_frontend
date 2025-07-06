import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dispatch, SetStateAction } from "react";

interface spinningContextType {
  getSpinning: boolean;
  setSpinning: Dispatch<SetStateAction<boolean>>;
}

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
