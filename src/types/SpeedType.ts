export type Speed = "Slow" | "Medium" | "Fast";
export type SpeedContextType = {
  speed: Speed;
  setSpeed: (value: Speed) => void;
};
