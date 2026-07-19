import { createContext } from "react";
import type { SpeedContextType } from "../../types/SpeedType";

export const SpeedContext = createContext<SpeedContextType | undefined>(
  undefined,
);
