import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import PathFinderItem from "./pathItem";

export default function PathFinderComponent({ size }) {
  const myArray = [...Array(size)];
  const [startCordinate, setStartCordinate] = useState([]);
  const [endCordinates, setEndCordinates] = useState([]);
  const [borders, setBorders] = useState([]);

  function clearStates() {
    setStartCordinate([]);
    setEndCordinates([]);
    setBorders([])
  }

  function getPathNo(x, y, size) {
    return x * size + y;
  }
  function isValidCordinate(x, y, size) {
    return x >= 0 && y >= 0 && x < size && y < size;
  }

  const onBoardItemClick = (cord) => {
    if (cord) {
      if (startCordinate.length > 0) {
        setEndCordinates(cord);
      } else if (startCordinate.length == 0) {
        setStartCordinate(cord);
      }
    }
  };

  useEffect(() => {
    clearStates();
  }, [size]);

  function getStringName(x, y) {
    if (startCordinate[0] == x && startCordinate[1] == y) return "S";
    if (endCordinates[0] == x && endCordinates[1] == y) return "E";
    return "";
  }

  function onMouseDownEvent(cord) {
    let cordNumber = getPathNo(cord[0],cord[1],size)
    if (!borders.includes(cordNumber)) {
      console.log("adding cord: ", cordNumber);
      setBorders([...borders,cordNumber ]);
      console.log("adding cord: ", borders);
    }
  }

  return (
    <div className="flex-col m-8 items-center ">
      <div className="flex justify-center">
        <div className="p-4">
          <Button onClick={clearStates} variant="outlined">
            {" "}
            Clear{" "}
          </Button>
        </div>

        {startCordinate.length > 0 && endCordinates.length > 0 && (
          <div className="p-4">
            <Button onClick={() => {}} variant="outlined" color="success">
              {" "}
              Start{" "}
            </Button>
          </div>
        )}
      </div>

      {Array.from({ length: size }).map((_, x) => {
        return (
          <div key={x} className="flex justify-center ">
            {Array.from({ length: size }).map((_, y) => {
              let currKey = getPathNo(x, y, size);
              return (
                <PathFinderItem
                  pathMarkingNumber={getPathNo(x, y, size)}
                  key={currKey}
                  isStart={startCordinate[0] == x && startCordinate[1] == y}
                  isEnd={endCordinates[0] == x && endCordinates[1] == y}
                  onClickHandler={onBoardItemClick}
                  cordinates={[x, y]}
                  isBorder={borders.includes(currKey)}
                  name={getStringName(x, y)}
                  onMouseDown={() => onMouseDownEvent([x, y])}
                  //   isMarked={pathArray.includes(currKey)}
                  //   isReached={isReached}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
