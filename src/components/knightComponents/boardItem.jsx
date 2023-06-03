import React from "react";

export default function BoardItem({
  isReached,
  name,
  isMarked = false,
  cordinates,
  isStart = false,
  isEnd = false,
  onClickHandler,
  pathMarkingNumber,
}) {
  const [x, y] = cordinates;
  const getCenterString = ()=>{
    if(pathMarkingNumber){
      return pathMarkingNumber
    }
    return isStart ? "S" : isEnd ? "E" : ""
  }

  return (
    <div
      onClick={() => onClickHandler([x, y])}
      className={`
      
      ${(pathMarkingNumber && !isEnd) && "bg-purple-300" }
      relative w-20 h-20 flex justify-center items-center  border-2 border-gray-200 hover:bg-slate-200 
      ${isStart && "font-bold border-gray-500 "}
     
      ${isMarked && "bg-amber-200" }
         ${
           isEnd &&
           (isReached === false
             ? "border-red-400 bg-red-200"
             : isReached === true
             ? "border-green-400 border-4 bg-green-100"
             : "font-bold border-gray-500")
         }
         `}
    >
      {/* <div className="absolute left-1 top-1 w-4 h-4  text-xs "> {name} </div> */}
      <div className="font-bold" >{getCenterString()}</div>
    </div>
  );
}
