import { useContext } from "react";
import { SpeedContext } from "./SpeedContext";

export function useSpeed() {
  const context = useContext(SpeedContext);
  if (!context) {
    throw new Error("useSpeed must be used inside SpeedContextProvider");
  }
  return context;
}
