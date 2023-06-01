import React from "react";

export default function PathFinderItem({
  isReached,
  name,
  isMarked = false,
  cordinates,
  isStart = false,
  isEnd = false,
  onClickHandler,
  pathMarkingNumber,
  isBorder = false,
  onMouseDown,
}) {
  const [x, y] = cordinates;

  return (
    <div
      onClick={() => onClickHandler([x, y])}
      onMouseDownCapture={onMouseDown}
      className={`
      relative w-10  h-10 flex justify-center items-center  border-2 border-gray-200 hover:bg-slate-200 
      ${isStart && "font-bold border-gray-500 "}
     
         ${isBorder && "bg-slate-600"}
         
         `}
    >
      {/* <div className="absolute left-1 top-1 w-4 h-4  text-xs "> {name} </div> */}
      <div className="font-bold">{name}</div>
    </div>
  );
}
