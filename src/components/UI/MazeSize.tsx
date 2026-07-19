import type { MazeSize } from "../../types/MazeSizeType";
import { useMazeSize } from "../../context/MazeSizeContext/useMazeSize";
import { Select } from "./Select";

const options = [
  { value: 10 as MazeSize, label: "10 x 10" },
  { value: 25 as MazeSize, label: "25 x 25" },
  { value: 50 as MazeSize, label: "50 x 50" },
];
export function MazeSize() {
  const { mazeSize, setMazeSize } = useMazeSize();
  const label = "Maze Size";
  return (
    <Select
      options={options}
      label={label}
      onChange={setMazeSize}
      value={mazeSize}
    ></Select>
  );
}
