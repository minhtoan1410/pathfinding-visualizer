import { useMode } from "../../context/ModeContext/useMode";

export function SetStart() {
  const { mode, setMode } = useMode();
  return (
    <button
      onClick={() => setMode("START")}
      className={`cursor-pointer rounded-2xl bg-green-600 my-4 text-l text-white font-bold px-4 py-2 ${mode === "START" ? "bg-green-700" : "bg-green-500"} text-white rounded`}
    >
      Pick Start Position
    </button>
  );
}
