import { useMode } from "../../context/ModeContext/useMode";

export function SetEnd() {
  const { mode, setMode } = useMode();
  return (
    <button
      onClick={() => setMode("END")}
      className={`cursor-pointer rounded-2xl bg-green-600 my-4 text-l text-white font-bold px-4 py-2 ${mode === "END" ? "bg-red-700" : "bg-red-500"} text-white rounded`}
    >
      Pick End Position
    </button>
  );
}
