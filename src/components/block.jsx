import React from "react";

export const BlockItem = ({ number, isHighlight = false }) => {
  return (
    <div
      className={` px-4 m-4 w-16 h-16 flex justify-center items-center outline-dashed ${isHighlight ? "rounded-full font-bold border-4 ": "rounded-sm" }  `}
      key={number}
    >
      {" "}
      {number}
    </div>
  );
};
