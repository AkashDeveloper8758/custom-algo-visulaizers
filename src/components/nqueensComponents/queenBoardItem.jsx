import React from "react";

export default function QueensBoardItem({
  isReached,
  name,
  isHighlight,
  isMarked = false,
  cordinates,
  onClickHandler,
  isCheckMarking = false,
}) {
  const [x, y] = cordinates;
  const getCenterString = () => {
    return isMarked || isHighlight ? "Q" : "";
  };
  return (
    <div
      onClick={() => onClickHandler([x, y])}
      className={`
      
      relative w-20 h-20 flex justify-center items-center  border-2 border-gray-200 hover:bg-slate-200 
      ${isMarked && "font-bold border-gray-500 "}
      ${isHighlight && "bg-slate-300"}
      ${(isMarked || isHighlight) && ( isReached === true ? "bg-green-400 font-bold " : isReached===false ? "bg-red-300 font-bold" : "" )}
         `}
    >
      {/* <div className="absolute left-1 top-1 w-4 h-4  text-xs "> {name} </div> */}
      <div className="font-bold">{getCenterString()}</div>
    </div>
  );
}

// ${isMarked && "bg-amber-100" }
