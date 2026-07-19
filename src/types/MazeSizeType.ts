export type MazeSize = 10 | 25 | 50;
export type MazeSizeContextType = {
  mazeSize: MazeSize;
  setMazeSize: (size: MazeSize) => void;
};
