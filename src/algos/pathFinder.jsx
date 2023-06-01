import { useState } from "react";
import PathFinderComponent from "../components/pathFinder/pathfinderComponent";

export default function PathFinder() {
  const [boardInput, setBoardInput] = useState(6);

  const [boardSize, setBoardSize] = useState(6);

  const handleInputChange = (event) => {
    setBoardInput(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    setBoardSize(Number(boardInput));
  }
  return (
    <div className="p-8 flex-col items-center justify-center ">
      <form onSubmit={handleSubmit}>
        <label className="mr-4">
         Path Finder Using BFS & DFS
          <input
            className="ml-4 outline rounded-sm p-2 w-24"
            type="number"
            value={boardInput}
            onChange={handleInputChange}
            min={3}
            max={25}
          />
        </label>
      </form>
      {boardSize > 0 && <PathFinderComponent size={boardSize} />}
    </div>
  );
}
