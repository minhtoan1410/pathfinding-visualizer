import type { ReactNode } from "react";
import { MazeSizeContextProvider } from "./context/MazeSizeContext/MazeSizeContextProvider";
import { SpeedContextProvider } from "./context/SpeedContext/SpeedContextProvider";
import { AlgorithmContextProvider } from "./context/AlgorithmContext/AlgorithmContextProvider";
import { ModeContextProvider } from "./context/ModeContext/ModeContextProvider";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ModeContextProvider>
      <SpeedContextProvider>
        <MazeSizeContextProvider>
          <AlgorithmContextProvider>{children}</AlgorithmContextProvider>
        </MazeSizeContextProvider>
      </SpeedContextProvider>
    </ModeContextProvider>
  );
}
