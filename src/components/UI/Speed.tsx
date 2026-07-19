import { useSpeed } from "../../context/SpeedContext/useSpeed";
import type { Speed } from "../../types/SpeedType";
import { Select } from "./Select";

const options = [
  { value: "Slow" as Speed, label: "Slow" },
  { value: "Medium" as Speed, label: "Medium" },
  { value: "Fast" as Speed, label: "Fast" },
];
export function Speed() {
  const { speed, setSpeed } = useSpeed();
  const label = "Speed";
  return (
    <Select
      value={speed}
      options={options}
      label={label}
      onChange={setSpeed}
    ></Select>
  );
}
