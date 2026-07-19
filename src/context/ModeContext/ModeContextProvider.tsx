import { useState, type ReactNode } from "react";
import { ModeContext } from "./ModeContext";
import type { Mode } from "../../types/ModeType";

export function ModeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("DRAW");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}
