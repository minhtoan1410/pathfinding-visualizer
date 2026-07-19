import { createContext } from "react";
import type { ModeContextType } from "../../types/ModeType";

export const ModeContext = createContext<ModeContextType | undefined>(
  undefined,
);
