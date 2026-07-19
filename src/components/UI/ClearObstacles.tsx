// components/ClearObstacles.tsx

import { useMaze } from "../../context/MazeContext/useMaze";

export const ClearObstacles = () => {
  const { clearObstacles } = useMaze();

  return (
    <button
      onClick={clearObstacles}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Clear Obstacles
    </button>
  );
};
