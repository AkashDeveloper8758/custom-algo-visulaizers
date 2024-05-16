import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ThiefAwayItemBlock from "./thiefAwayItemBlock";
import { thiefOptimalRoute } from "./thiefFunction";
import { waitFor } from "../../helpers/staticConstants";
import { update } from "three/examples/jsm/libs/tween.module.js";

class MouseEventWithType {
  static START = "START";
  static END = "END";
  static BLANK = "BLANK";
}

function ThiefAwayComponent({ size }) {
  const horizontalCount = 40;

  const [mouseEventWithType, setMouseEventWithType] = useState(
    MouseEventWithType.BLANK
  );
  const [startCordinate, setStartCordinate] = useState([3, 3]);
  const [endCordinates, setEndCordinates] = useState([3, horizontalCount - 3]);
  const [computingCount, setComputingCount] = useState(0); // route to target path

  const [pathList, setPathList] = useState({}); // traversed path
  const [routeList, setRouteList] = useState([]); // route to target path
  const [dijkstraTraversalList, setDijkstraTraversalList] = useState([]); // route to target path
  const [isReached, setIsReached] = useState(false); // route to target path
  const [isRunning, setIsRunning] = useState(false); // if algo is running

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [thiefList, setThiefList] = useState(new Set());

  function getPathNo(x, y) {
    return x * horizontalCount + y;
  }
  function getTwoDArray() {
    return Array.from({ length: size }).map((_) =>
      new Array(horizontalCount).fill(0)
    );
  }

  function getStringName(x, y) {
    if (startCordinate[0] == x && startCordinate[1] == y) return "S";
    if (endCordinates[0] == x && endCordinates[1] == y) return "E";
    return "";
  }
  function getStartEndCord() {
    let start = getPathNo(startCordinate[0], startCordinate[1]);
    let end = getPathNo(endCordinates[0], endCordinates[1]);
    return [start, end];
  }

  function handleOnClick(cord) {
    let [start, end] = getStartEndCord();

    if (cord == start || cord == end) return;

    if (thiefList.has(cord)) {
      thiefList.delete(cord);
    } else {
      thiefList.add(cord);
    }
    setThiefList(new Set(thiefList));
    console.log(thiefList);
  }

  function onMouseEnterEvent(cord) {
    if (isRunning) return;

    if (isMouseDown) {
      if (mouseEventWithType == MouseEventWithType.START) {
        setStartCordinate(cord);
      } else if (mouseEventWithType == MouseEventWithType.END) {
        setEndCordinates(cord);
      }
    }
  }

  function onMouseUpEvent(cord) {
    if (isRunning) return;
    setIsMouseDown(false);
    if (mouseEventWithType == MouseEventWithType.BLANK) return;

    if (mouseEventWithType == MouseEventWithType.START) {
      setStartCordinate(cord);
    } else if (mouseEventWithType == MouseEventWithType.END) {
      setEndCordinates(cord);
    }
  }

  function onMouseDownEvent(cord) {
    if (isRunning) return;
    let downCord = getPathNo(cord[0], cord[1]);
    let [start, end] = getStartEndCord();

    if (downCord == start) {
      setMouseEventWithType(MouseEventWithType.START);
    } else if (downCord == end) {
      setMouseEventWithType(MouseEventWithType.END);
    } else {
      setMouseEventWithType(MouseEventWithType.BLANK);
    }
    setIsMouseDown(true);
  }

  function clearStates() {
    if (isRunning) return true;
    console.log("--- cleared state --- ");
    setStartCordinate([3, 3]);
    setEndCordinates([3, horizontalCount - 3]);
    clearPathOnly();
    setThiefList(new Set());
  }

  function clearPathOnly() {
    setIsRunning(false);
    setPathList({});
    setRouteList([]);
    setIsReached(false);
    setComputingCount(0);
    setDijkstraTraversalList([]);

  }

  async function startExecution() {
    clearPathOnly()
    let pathData = await thiefOptimalRoute(
      startCordinate,
      endCordinates,
      (x, y, z) => {
        // (x,y) cordinates : z-> value
        setPathList((prev) => {
          const updatedObject = { ...prev };
          updatedObject[getPathNo(x, y)] = z;
          return updatedObject;
        });
      },
      (x, y) => {
        setDijkstraTraversalList((prev) => [...prev, getPathNo(x, y)]);
      },
      size,
      horizontalCount,
      (value) => setComputingCount(value),
      thiefList
    );

    for (let item of pathData) {
      await waitFor(10);
      setRouteList((prev) => [...prev, item]);
    }

    if (pathData.length > 0) {
      setIsReached(true);
    }
    setIsRunning(false);
  }

  return (
    <div className="flex-col  m-8 ">
      <div className=" self-center w-full border-t-2  p-4 text-sm ">
        You can move start and end positions, create thiefs, then start. This
        algo will find the best route to stay away from those thiefs and reach
        the destination.
      </div>
      <div className="flex justify-between">
        <div className="flex self-center ">
          <div className="p-2">
            <Button onClick={clearStates} variant="outlined">
              {" "}
              Clear{" "}
            </Button>
          </div>

          {startCordinate.length > 0 && endCordinates.length > 0 && (
            <div className="p-2">
              <Button
                onClick={startExecution}
                variant="outlined"
                color="success"
              >
                {" "}
                Start{" "}
              </Button>
            </div>
          )}
        </div>

        <div className="flex self-center">Computing : {computingCount}</div>
      </div>

      <div className=" flex-col items-center justify-end   ">
        {Array.from({ length: size }).map((_, x) => {
          return (
            <div key={x} className="flex ">
              {Array.from({ length: horizontalCount }).map((_, y) => {
                let currKey = getPathNo(x, y);
                return (
                  <ThiefAwayItemBlock
                    pathMarkingNumber={currKey}
                    key={currKey}
                    isStart={startCordinate[0] == x && startCordinate[1] == y}
                    isEnd={endCordinates[0] == x && endCordinates[1] == y}
                    cordinates={[x, y]}
                    onClickHandler={() => handleOnClick(currKey)}
                    name={getStringName(x, y)}
                    onMouseDown={() => onMouseDownEvent([x, y])}
                    onMouseUp={() => onMouseUpEvent([x, y])}
                    onMouseEnter={() => onMouseEnterEvent([x, y])}
                    isRoutePath={routeList.includes(currKey)}
                    isThief={thiefList.has(currKey)}
                    isReached={isReached}
                    size={[size, horizontalCount]}
                    countValue={pathList[getPathNo(x, y)] ?? 0}
                    isDikjstraRoute={dijkstraTraversalList.includes(
                      getPathNo(x, y)
                    )}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ThiefAwayComponent };
