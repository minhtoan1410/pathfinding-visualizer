export type Algorithm =
  | "Breadth First Search"
  | "Depth First Search"
  | "Dijkstra";
export type AlgorithmContextType = {
  algorithm: Algorithm;
  setAlgorithm: (value: Algorithm) => void;
};
