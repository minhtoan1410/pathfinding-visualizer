import { useContext } from "react";
import { AlgorithmContext } from "./AlgorithmContext";

export function useAlgorithm() {
  const context = useContext(AlgorithmContext);
  if (!context) {
    throw new Error(
      "useAlgorithm must be used inside AlgorithmContextProvider",
    );
  }
  return context;
}
