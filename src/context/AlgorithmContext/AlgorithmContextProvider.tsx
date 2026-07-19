import { useState, type ReactNode } from "react";
import type { Algorithm } from "../../types/AlgorithmType";
import { AlgorithmContext } from "./AlgorithmContext";

export function AlgorithmContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [algorithm, setAlgorithm] = useState<Algorithm>("Breadth First Search");
  return (
    <AlgorithmContext.Provider value={{ algorithm, setAlgorithm }}>
      {children}
    </AlgorithmContext.Provider>
  );
}
