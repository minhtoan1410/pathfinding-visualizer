import React from "react";
import type { MazeTile, Position, Route } from "../../types/MazeType";
import { useMaze } from "../../context/MazeContext/useMaze";
import { useMazeSize } from "../../context/MazeSizeContext/useMazeSize";
import { useMode } from "../../context/ModeContext/useMode";

const getTileColor = (tile: MazeTile, isStart: boolean, isEnd: boolean) => {
  if (isStart) return "bg-green-600";
  if (isEnd) return "bg-red-600";
  if (tile.isObstacle) return "bg-gray-600";
  if (tile.isPath) return "bg-green-400";
  if (tile.isVisited) return "bg-yellow-200";
  return "bg-gray-100";
};

const Tile = React.memo(
  ({
    tile,
    onClick,
    isStart,
    isEnd,
    onMouseEnter,
  }: {
    tile: MazeTile;
    onClick: (position: Position, isStart: boolean, isEnd: boolean) => void;
    isStart: boolean; // Nhận từ props
    isEnd: boolean;
    onMouseEnter: (
      position: Position,
      isStart: boolean,
      isEnd: boolean,
    ) => void;
  }) => {
    const tileColor = getTileColor(tile, isStart, isEnd);
    return (
      <div
        className={`w-full ${tileColor} h-full cursor-pointer transition-colors duration-200`}
        onClick={() => onClick(tile.position, isStart, isEnd)}
        onMouseEnter={() => onMouseEnter(tile.position, isStart, isEnd)}
      />
    );
  },
  (prev, next) => {
    return (
      prev.isStart === next.isStart &&
      prev.isEnd === next.isEnd &&
      prev.tile.isObstacle === next.tile.isObstacle &&
      prev.tile.isVisited === next.tile.isVisited &&
      prev.tile.isPath === next.tile.isPath
    );
  },
);

const Row = React.memo(
  ({
    rowData,
    onTileClick,
    route,
    onTileMouseEnter,
  }: {
    rowData: MazeTile[];
    onTileClick: (position: Position, isStart: boolean, isEnd: boolean) => void;
    route: Route;
    onTileMouseEnter: (
      position: Position,
      isStart: boolean,
      isEnd: boolean,
    ) => void;
  }) => {
    return (
      <div className="contents">
        {rowData.map((tile) => {
          const position = tile.position;
          const isStart =
            position.row === route.origin.row &&
            position.col === route.origin.col;
          const isEnd =
            position.row === route.destination.row &&
            position.col === route.destination.col;
          return (
            <Tile
              key={`${tile.position.row}-${tile.position.col}`}
              tile={tile}
              onClick={onTileClick}
              isStart={isStart}
              isEnd={isEnd}
              onMouseEnter={onTileMouseEnter}
            />
          );
        })}
      </div>
    );
  },
);

export function MazeGrid() {
  const { setStart, setEnd, route, maze, toggleObstacle } = useMaze();
  const { mazeSize } = useMazeSize();
  const { mode, setMode } = useMode();
  const modeRef = React.useRef(mode);

  React.useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  const isMouseDown = React.useRef(false);

  const handleMouseDown = () => {
    isMouseDown.current = true;
  };
  const handleMouseUp = () => {
    isMouseDown.current = false;
  };
  const handleClickTile = React.useCallback(
    (position: Position, isStart: boolean, isEnd: boolean) => {
      if (isStart || isEnd) return;

      const currentMode = modeRef.current;
      if (currentMode === "START") {
        setStart(position);
        setMode("DRAW");
      } else if (currentMode === "END") {
        setEnd(position);
        setMode("DRAW");
      } else {
        toggleObstacle(position);
      }
    },
    [setStart, setEnd, setMode, toggleObstacle],
  );
  const handleMouseEnter = React.useCallback(
    (position: Position, isStart: boolean, isEnd: boolean) => {
      if (isMouseDown.current) {
        handleClickTile(position, isStart, isEnd);
      }
    },
    [handleClickTile], // Phụ thuộc vào handleClickTile đã memoized
  );
  return (
    <div
      className="mt-5 grid grid-container bg-gray-800 aspect-square w-3xl border-6 border-purple-700 "
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        gridTemplateColumns: `repeat(${mazeSize}, 1fr)`,
        gap: "1px",
      }}
    >
      {maze.map((row, index) => (
        <Row
          key={index}
          rowData={row}
          route={route}
          onTileMouseEnter={handleMouseEnter}
          onTileClick={handleClickTile}
        />
      ))}
    </div>
  );
}
