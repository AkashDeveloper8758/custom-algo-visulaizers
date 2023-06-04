import React from "react";

export default function PathFinderItem({
  isReached,
  name,
  isMarked = false,
  cordinates,
  isStart = false,
  isEnd = false,
  onClickHandler,
  isRoutePath,
  isBorder = false,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  size,
  isBorderBroken = false,
}) {
  const [x, y] = cordinates;
  const [n, m] = size;

  const notAnyStateColor = !isStart && !isEnd && !isBorder;

  return (
    <div
      onClick={onClickHandler}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      className={`
      relative w-8  h-8 flex justify-center items-center  border-slate-400
      ${x ==0 && y == 0 && "border-l border-t"}
      ${x != 0 && "border-l"}
      ${y != 0 && "border-t"}
      ${(x == n - 1 || y == 0) && "border-b"}
      ${(y == m - 1 || x == 0) && "border-r"}
    
      
      ${notAnyStateColor && "hover:bg-slate-200"} 
      ${isStart ? "bg-blue-500" : (isEnd && !isReached) ? "bg-red-400" : ""}
      ${isMarked && notAnyStateColor && "bg-cyan-200"}
      ${notAnyStateColor && isRoutePath && "bg-yellow-300"}
      ${isEnd && isReached && "bg-green-400"}
      ${isBorder && "bg-slate-600"}`}
    >
      {/* <div className="absolute left-1 top-1 w-4 h-4  text-xs "> {name} </div> */}

      {isBorderBroken && <div className="font-bold">{"💥"}</div>}
    </div>
  );
}

//relative w-10  h-10 flex justify-center items-center  border-2 border-gray-20
// ${x != 0 && "border-l-2" }
// ${y != 0 && "border-t-2" }
// ${y != 0 && "border-t-2" }
//${isBorderBroken && "bg-pink-500" }
