import { useState, type ReactNode } from "react";
import { SpeedContext } from "./SpeedContext";
import type { Speed } from "../../types/SpeedType";

export const SpeedContextProvider = ({ children }: { children: ReactNode }) => {
  const [speed, setSpeed] = useState<Speed>("Medium");
  return (
    <SpeedContext.Provider value={{ speed, setSpeed }}>
      {children}
    </SpeedContext.Provider>
  );
};
