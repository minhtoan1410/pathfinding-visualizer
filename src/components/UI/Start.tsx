import { usePathFinding } from "../../hook/usePathFinding";

export function Start() {
  const { run } = usePathFinding();
  return (
    <button
      onClick={() => run()}
      className="cursor-pointer rounded-2xl bg-green-600 px-4 my-4 text-4xl text-white font-bold"
    >
      START
    </button>
  );
}
