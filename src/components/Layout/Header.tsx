import { Algorithm } from "../UI/Algorithm";
import { MazeSize } from "../UI/MazeSize";
import { SetEnd } from "../UI/SetEnd";
import { SetStart } from "../UI/SetStart";
import { Speed } from "../UI/Speed";
import { Start } from "../UI/Start";

export function Header() {
  return (
    <div className=" font-mono flex flex-row gap-1 border-b-fuchsia-500 border-b-4">
      <h1 className="text-6xl mr-5 text-gray-300 p-4">
        Pathfinding Visualizer
      </h1>
      <MazeSize></MazeSize>
      <Algorithm></Algorithm>
      <Speed></Speed>
      <SetStart></SetStart>
      <SetEnd></SetEnd>
      <Start></Start>
    </div>
  );
}
