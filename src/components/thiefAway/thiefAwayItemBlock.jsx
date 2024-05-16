import React from "react";

export default function ThiefAwayItemBlock({
  isReached,
  name,
  cordinates,
  isStart = false,
  isEnd = false,
  onClickHandler,
  isRoutePath,
  isThief = false,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  size,
  countValue,
  isDikjstraRoute,
}) {
  const [x, y] = cordinates;
  const [n, m] = size;

  const notAnyStateColor = !isStart && !isEnd && !isThief;

  return (
    <div
      onClick={onClickHandler}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      className={`
      text-gray-400 relative w-8  h-8 flex justify-center items-center  border-slate-400
      ${x == 0 && y == 0 && "border-l border-t"}
      ${x != 0 && "border-l"}
      ${y != 0 && "border-t"}
      ${(x == n - 1 || y == 0) && "border-b"}
      ${(y == m - 1 || x == 0) && "border-r"}
      
      
      ${notAnyStateColor && isRoutePath && "bg-yellow-300"}
      ${isStart ? "bg-blue-500" : isEnd && !isReached ? "bg-red-400" : ""}

      ${!isRoutePath && isDikjstraRoute && notAnyStateColor && "bg-gray-300"}
      ${!isRoutePath && countValue > 0 && !isDikjstraRoute && notAnyStateColor && "bg-gray-200"}
      
      ${isEnd && isReached && "bg-green-400"}
      ${isThief && "bg-gray-800"}
      `}
    >
      {countValue != 0 && notAnyStateColor && countValue}
    </div>
  );
}

//relative w-10  h-10 flex justify-center items-center  border-2 border-gray-20
// ${x != 0 && "border-l-2" }
// ${y != 0 && "border-t-2" }
// ${y != 0 && "border-t-2" }
//${isBorderBroken && "bg-pink-500" }
