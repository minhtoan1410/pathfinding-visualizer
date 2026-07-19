import { Header } from "./components/Layout/Header";
import { ClearObstacles } from "./components/UI/ClearObstacles";
import { MazeGrid } from "./components/UI/MazeGrid";
import { MazeContextProvider } from "./context/MazeContext/MazeContextProvider";
import { useMazeSize } from "./context/MazeSizeContext/useMazeSize";
// import { MazeGrid } from "./components/UI/MazeGrid";

function App() {
  const { mazeSize } = useMazeSize();
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <MazeContextProvider key={mazeSize}>
        <Header></Header>
        <div className="flex">
          <div className="flex-col flex"></div>
          <div className="grow flex flex-col items-center justify-center p-4">
            <ClearObstacles></ClearObstacles>
            <MazeGrid />
          </div>
        </div>
      </MazeContextProvider>
    </div>
  );
}

export default App;
