import { useState, type ReactNode } from "react";
import type { MazeSize } from "../../types/MazeSizeType";
import { MazeSizeContext } from "./MazeSizeContext";

export const MazeSizeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mazeSize, setMazeSize] = useState<MazeSize>(10);
  return (
    <MazeSizeContext.Provider value={{ mazeSize, setMazeSize }}>
      {children}
    </MazeSizeContext.Provider>
  );
};
