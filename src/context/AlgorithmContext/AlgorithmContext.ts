import { createContext } from "react";
import type { AlgorithmContextType } from "../../types/AlgorithmType";

export const AlgorithmContext = createContext<AlgorithmContextType | undefined>(
  undefined,
);
