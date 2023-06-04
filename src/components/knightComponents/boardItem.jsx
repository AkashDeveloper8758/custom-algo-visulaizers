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
  size
}) {
  const [x, y] = cordinates;
  const [n, m] = size;

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
      
      ${(pathMarkingNumber && !isEnd) && "bg-blue-300" }
      relative w-16 h-16 flex justify-center items-center  border border-slate-400 hover:bg-slate-200 
      ${x ==0 && y == 0 && "border-l border-t"}
      ${x != 0 && "border-l"}
      ${y != 0 && "border-t"}
      ${(x == n - 1 || y == 0) && "border-b"}
      ${(y == m - 1 || x == 0) && "border-r"}
      ${isStart && "font-bold border-gray-500 "}
     
      ${isMarked && "bg-amber-200" }
         ${
           isEnd &&
           (isReached === false
             ? "border-red-400 bg-red-200"
             : isReached === true
             ? "border-green-400  bg-green-300"
             : "font-bold border-gray-500")
         }
         `}
    >
      {/* <div className="absolute left-1 top-1 w-4 h-4  text-xs "> {name} </div> */}
      <div className="font-bold" >{getCenterString()}</div>
    </div>
  );
}
