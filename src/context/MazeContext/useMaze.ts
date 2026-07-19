import { useContext } from "react";
import { MazeContext } from "./MazeContext";

export function useMaze() {
  const context = useContext(MazeContext);
  if (!context) {
    throw new Error("useMaze must be used inside MazeProvider");
  }
  return context;
}
