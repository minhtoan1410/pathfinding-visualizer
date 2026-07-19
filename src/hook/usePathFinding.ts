import { useRef } from "react";
import { useAlgorithm } from "../context/AlgorithmContext/useAlgorithm";
import { useMaze } from "../context/MazeContext/useMaze";
import { useSpeed } from "../context/SpeedContext/useSpeed";
import type { MazeTile, Position, Route } from "../types/MazeType";
import { sleep } from "../utils/sleep";

const dx = [-1, 0, 0, 1];
const dy = [0, -1, 1, 0];
const isValidPosition = (
  position: Position,
  mazeSize: number,
  maze: MazeTile[][],
  visited: boolean[][],
) => {
  return (
    position.col >= 0 &&
    position.col < mazeSize &&
    position.row >= 0 &&
    position.row < mazeSize &&
    !maze[position.row][position.col].isObstacle &&
    !visited[position.row][position.col]
  );
};
const backtrack = async ({
  route,
  setMaze,
  parentMap,
  delay,
}: {
  route: Route;
  setMaze: React.Dispatch<React.SetStateAction<MazeTile[][]>>;
  parentMap: Map<string, Position>;
  delay: number;
}) => {
  const validPath: Position[] = [];
  let curPosition = route.destination;

  while (
    curPosition.row !== route.origin.row ||
    curPosition.col !== route.origin.col
  ) {
    const newPosition = parentMap.get(`${curPosition.row},${curPosition.col}`);
    if (!newPosition) break;
    curPosition = newPosition;
    validPath.push(newPosition);
  }

  for (let i = validPath.length - 1; i >= 0; i--) {
    const position = validPath[i];
    setMaze((prev) => {
      const newMaze = [...prev];
      newMaze[position.row] = [...newMaze[position.row]];
      newMaze[position.row][position.col] = {
        ...newMaze[position.row][position.col],
        isPath: true,
      };
      return newMaze;
    });
    await sleep(delay);
  }
};
const bfs = async ({
  route,
  maze,
  setMaze,
  delay,
  currentId,

  runId,
}: {
  route: Route;
  maze: MazeTile[][];
  setMaze: React.Dispatch<React.SetStateAction<MazeTile[][]>>;
  delay: number;
  currentId: number;
  runId: React.RefObject<number>;
}) => {
  const { origin, destination } = route;
  const mazeSize = maze.length;
  const parentMap = new Map<string, Position>();
  const visited: boolean[][] = Array.from({ length: mazeSize }, () =>
    Array(mazeSize).fill(false),
  );
  const queue: Position[] = [origin];
  parentMap.set(`${origin.row},${origin.col}`, { row: -1, col: -1 });
  visited[origin.row][origin.col] = true;
  while (queue.length > 0) {
    if (runId.current !== currentId) return;
    const curPosition = queue.shift()!;

    for (let k = 0; k < 4; k++) {
      const newPos = {
        row: curPosition.row + dx[k],
        col: curPosition.col + dy[k],
      };

      if (isValidPosition(newPos, maze.length, maze, visited)) {
        parentMap.set(`${newPos.row},${newPos.col}`, curPosition);
        visited[newPos.row][newPos.col] = true;
        if (runId.current !== currentId) return;
        setMaze((prev) => {
          const newMaze = [...prev];
          newMaze[newPos.row] = [...newMaze[newPos.row]];
          newMaze[newPos.row][newPos.col] = {
            ...newMaze[newPos.row][newPos.col],
            isVisited: true,
          };
          return newMaze;
        });

        await sleep(delay);

        if (newPos.row === destination.row && newPos.col === destination.col) {
          await backtrack({ route, setMaze, parentMap, delay });
          return;
        }
        queue.push(newPos);
      }
    }
  }
};
const dfs = async ({
  route,
  maze,
  setMaze,
  delay,
  currentId,
  runId,
}: {
  route: Route;
  maze: MazeTile[][];
  setMaze: React.Dispatch<React.SetStateAction<MazeTile[][]>>;
  delay: number;
  currentId: number;
  runId: React.RefObject<number>;
}) => {
  const { origin, destination } = route;
  const mazeSize = maze.length;
  const parentMap = new Map<string, Position>();
  const visited: boolean[][] = Array.from({ length: mazeSize }, () =>
    Array(mazeSize).fill(false),
  );
  const stack: Position[] = [origin];

  parentMap.set(`${origin.row},${origin.col}`, { row: -1, col: -1 });
  visited[origin.row][origin.col] = true;

  while (stack.length > 0) {
    if (runId.current !== currentId) return;

    const curPosition = stack.pop()!;
    if (
      curPosition.row === destination.row &&
      curPosition.col === destination.col
    ) {
      await backtrack({ route, setMaze, parentMap, delay });
      return;
    }

    for (let k = 0; k < 4; k++) {
      const newPos = {
        row: curPosition.row + dx[k],
        col: curPosition.col + dy[k],
      };

      if (isValidPosition(newPos, maze.length, maze, visited)) {
        parentMap.set(`${newPos.row},${newPos.col}`, curPosition);
        visited[newPos.row][newPos.col] = true;
        stack.push(newPos);
        if (runId.current !== currentId) return;

        setMaze((prev) => {
          const newMaze = [...prev];
          newMaze[newPos.row] = [...newMaze[newPos.row]];
          newMaze[newPos.row][newPos.col] = {
            ...newMaze[newPos.row][newPos.col],
            isVisited: true,
          };
          return newMaze;
        });

        await sleep(delay);
      }
    }
  }
};

const algorithmNavigation = {
  "Breadth First Search": bfs,
  "Depth First Search": dfs,
  Dijkstra: bfs,
};
const speedDelay = {
  Slow: 15,
  Medium: 10,
  Fast: 3,
};
export const usePathFinding = () => {
  const { route, maze, setMaze, clearPath, clearVisited } = useMaze();
  const { algorithm } = useAlgorithm();
  const { speed } = useSpeed();
  const runId = useRef(0);
  const delay = speedDelay[speed];
  const run = async () => {
    runId.current += 1;
    const currentId = runId.current;
    clearPath();
    clearVisited();
    await algorithmNavigation[algorithm]({
      maze,
      route,
      setMaze,
      delay,
      currentId,
      runId,
    });
  };

  return { run };
};
