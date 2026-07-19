import { createContext } from "react";
import type { MazeSizeContextType } from "../../types/MazeSizeType";

export const MazeSizeContext = createContext<MazeSizeContextType | undefined>(
  undefined,
);
