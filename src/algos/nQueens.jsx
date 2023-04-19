import { useState } from "react";
import NQueensComponents from "../components/knightComponents/nqueensComponents";

export default function Nqueens() {
  const [boardInput, setBoardInput] = useState(5);

  const [boardSize, setBoardSize] = useState(5);

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
          Enter chess board size (3 - 8) :
          <input
            className="ml-4 outline rounded-sm p-2 w-24"
            type="number"
            value={boardInput}
            onChange={handleInputChange}
            min={3}
            max={8}
          />
        </label>
      </form>
      {boardSize > 0 && <NQueensComponents size={boardSize} />}
    </div>
  );
}
