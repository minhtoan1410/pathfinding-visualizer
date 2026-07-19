export type Mode = "DRAW" | "END" | "START";
export type ModeContextType = {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};
