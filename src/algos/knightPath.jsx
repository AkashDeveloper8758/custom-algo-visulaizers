import {useState} from 'react'
import BoardComponents from '../components/knightComponents/boardComponents';


export default function KnightPath() {
  const [boardInput, setBoardInput] = useState(10);

  const [boardSize, setBoardSize] = useState(10);


  const handleInputChange = (event) => {
    setBoardInput(event.target.value)
  };


 

  function handleSubmit(event) {
    event.preventDefault();
   
    setBoardSize(Number(boardInput))
  }
  
  return (
    <div className="p-8 flex-col items-center justify-center ">
       <div className=" self-center w-full border-t-2  p-4 border-b-2 m-4 text-sm ">
        Click on the board to choose the start and end points, and the algo will find the shortest Knight path to reach the target. 
      </div>
    <form onSubmit={handleSubmit}>
      <label className="mr-4">
      KNIGHT PATH - Enter chess board size (3 - 20) :
        <input
          className="ml-4 outline rounded-sm p-2 w-24"
          type="number"
          value={boardInput}
          onChange={handleInputChange}
          min={3}
          max={20}
        />
      </label>
    </form>
    {boardSize > 0 && <BoardComponents size={boardSize} /> }
  </div>
  )
}
