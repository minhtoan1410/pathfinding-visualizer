import { useAlgorithm } from "../../context/AlgorithmContext/useAlgorithm";
import type { Algorithm } from "../../types/AlgorithmType";
import { Select } from "./Select";

const options = [
  { value: "Breadth First Search" as Algorithm, label: "Breadth First Search" },
  { value: "Depth First Search" as Algorithm, label: "Depth First Search" },
  { value: "Dijkstra" as Algorithm, label: "Dijkstra" },
];
export function Algorithm() {
  const { algorithm, setAlgorithm } = useAlgorithm();
  const label = "Algorithm";
  return (
    <Select
      value={algorithm}
      options={options}
      label={label}
      onChange={setAlgorithm}
    ></Select>
  );
}
