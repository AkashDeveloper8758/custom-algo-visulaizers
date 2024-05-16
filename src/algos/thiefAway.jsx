import { useState } from "react";
import { ThiefAwayComponent } from "../components/thiefAway/thiefAwayComponent";

export default function ThiefAway() {
  const [boardInput, setBoardInput] = useState(8);

  const [boardSize, setBoardSize] = useState(8);

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
          Thief away ( board height : 8 - 25 )
          <input
            className="ml-4 outline rounded-sm p-2 w-24"
            type="number"
            value={boardInput}
            onChange={handleInputChange}
            min={8}
            max={25}
          />
        </label>
      </form>
      {boardSize > 0 && <ThiefAwayComponent size={boardSize} />}
    </div>
  );
}
