import { createContext } from "react";
import type { MazeContextType } from "../../types/MazeType";

export const MazeContext = createContext<MazeContextType | undefined>(
  undefined,
);
