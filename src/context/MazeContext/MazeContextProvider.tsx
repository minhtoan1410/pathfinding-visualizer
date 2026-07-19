import { useCallback, useMemo, useState, type ReactNode } from "react";
import { type MazeTile, type Position, type Route } from "../../types/MazeType";
import { useMazeSize } from "../MazeSizeContext/useMazeSize";
import { MazeContext } from "./MazeContext";
const createMaze = (size: number) => {
  const newMaze: MazeTile[][] = [];
  for (let i = 0; i < size; i++) {
    const newRow: MazeTile[] = [];
    for (let j = 0; j < size; j++) {
      const newTile: MazeTile = {
        position: { row: i, col: j },

        isObstacle: false,

        isVisited: false,
        isPath: false,
      };
      newRow.push(newTile);
    }
    newMaze.push(newRow);
  }
  return newMaze;
};
export function MazeContextProvider({ children }: { children: ReactNode }) {
  const { mazeSize } = useMazeSize();

  const [maze, setMaze] = useState<MazeTile[][]>(() => createMaze(mazeSize));
  const [route, setRoute] = useState<Route>({
    origin: { row: 0, col: 0 },
    destination: { row: mazeSize - 1, col: mazeSize - 1 },
  });
  const setStart = useCallback((position: Position) => {
    setMaze((prev) => {
      const newMaze = [...prev];
      const newRow = [...newMaze[position.row]];
      newRow[position.col] = {
        ...newRow[position.col],
        isObstacle: false,
      };

      newMaze[position.row] = newRow;

      return newMaze;
    });
    setRoute((prev) => ({ ...prev, origin: position }));
  }, []);

  const setEnd = useCallback((position: Position) => {
    setMaze((prev) => {
      const newMaze = [...prev];
      const newRow = [...newMaze[position.row]];
      newRow[position.col] = {
        ...newRow[position.col],
        isObstacle: false,
      };

      newMaze[position.row] = newRow;

      return newMaze;
    });
    setRoute((prev) => ({ ...prev, destination: position }));
  }, []);
  const toggleObstacle = useCallback((position: Position) => {
    setMaze((prev) => {
      const newMaze = [...prev];
      const newRow = [...newMaze[position.row]];
      newRow[position.col] = {
        ...newRow[position.col],
        isObstacle: !newRow[position.col].isObstacle,
      };

      newMaze[position.row] = newRow;

      return newMaze;
    });
  }, []);
  const clearObstacles = useCallback(() => {
    setMaze((prev) =>
      prev.map((r) =>
        r.map((tile) => ({
          ...tile,
          isObstacle: false,
        })),
      ),
    );
  }, []);
  const clearVisited = useCallback(() => {
    setMaze((prev) =>
      prev.map((r) =>
        r.map((tile) => ({
          ...tile,
          isVisited: false,
        })),
      ),
    );
  }, []);
  const clearPath = useCallback(() => {
    setMaze((prev) =>
      prev.map((r) =>
        r.map((tile) => ({
          ...tile,
          isPath: false,
        })),
      ),
    );
  }, []);
  const contextValue = useMemo(
    () => ({
      maze,
      setMaze,
      route,
      setRoute,
      toggleObstacle,
      setEnd,
      setStart,
      clearObstacles,
      clearPath,
      clearVisited,
    }),
    [
      clearObstacles,
      clearVisited,
      clearPath,
      setEnd,
      setStart,
      maze,
      route,
      toggleObstacle,
    ],
  );

  return (
    <MazeContext.Provider value={contextValue}>{children}</MazeContext.Provider>
  );
}
