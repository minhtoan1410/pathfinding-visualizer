export type Position = {
  row: number;
  col: number;
};

export type Route = {
  origin: Position;
  destination: Position;
};

export type MazeTile = {
  position: Position;

  isObstacle: boolean;

  isVisited: boolean;
  isPath: boolean;
};

export type MazeContextType = {
  maze: MazeTile[][];
  setMaze: React.Dispatch<React.SetStateAction<MazeTile[][]>>;

  route: Route;
  setRoute: React.Dispatch<React.SetStateAction<Route>>;

  toggleObstacle: (position: Position) => void;

  clearObstacles: () => void;

  clearVisited: () => void;

  clearPath: () => void;

  setStart: (position: Position) => void;

  setEnd: (position: Position) => void;
};
