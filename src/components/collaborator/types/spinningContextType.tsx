import { Dispatch, SetStateAction } from "react";

interface spinningContextType {
  getSpinning: boolean;
  setSpinning: Dispatch<SetStateAction<boolean>>
}

export default spinningContextType;
