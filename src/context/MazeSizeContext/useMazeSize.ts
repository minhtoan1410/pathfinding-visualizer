import { useContext } from "react";
import { MazeSizeContext } from "./MazeSizeContext";

export function useMazeSize() {
  const context = useContext(MazeSizeContext);
  if (!context) {
    throw new Error("useMazeSize must be used inside MazeSizeProvider");
  }
  return context;
}
