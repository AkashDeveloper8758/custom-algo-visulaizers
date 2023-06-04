import React from "react";

export default function QueensBoardItem({
  isReached,
  name,
  isHighlight,
  isMarked = false,
  cordinates,
  onClickHandler,
  isCheckMarking = false,
  size
}) {
  const [x, y] = cordinates;
  const [n, m] = size;
  const getCenterString = () => {
    return isMarked || isHighlight ? "Q" : "";
  };
  return (
    <div
      onClick={() => onClickHandler([x, y])}
      className={`
      
      relative w-16 h-16 flex justify-center items-center border border-slate-400 hover:bg-slate-200 
      ${x ==0 && y == 0 && "border-l border-t"}
      ${x != 0 && "border-l"}
      ${y != 0 && "border-t"}
      ${(x == n - 1 || y == 0) && "border-b"}
      ${(y == m - 1 || x == 0) && "border-r"}

      ${isMarked && "font-bold border-gray-500 "}
      ${(isHighlight && isReached === null) && "bg-slate-300"}
      ${(isMarked || isHighlight) && ( isReached === true ? "bg-green-300 font-bold " : isReached===false ? "bg-red-300 font-bold" : "" )}
         `}
    >
      {/* <div className="absolute left-1 top-1 w-4 h-4  text-xs "> {name} </div> */}
      <div className="font-bold">{getCenterString()}</div>
    </div>
  );
}

// ${isMarked && "bg-amber-100" }
