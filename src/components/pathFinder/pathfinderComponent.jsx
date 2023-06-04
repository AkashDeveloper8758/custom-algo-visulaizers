import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { waitFor } from "../../helpers/staticConstants";
import { dfsFinder, bfsFinder, dijkstraFunction } from "./functions";
import PathFinderItem from "./pathItem";

class MouseEventWithType {
  static START = "START";
  static END = "END";
  static BLANK = "BLANK";
}
const PathFinderAlgoType = {
  BFS: "BFS",
  DFS: "DFS",
  DIJKSTRA: "DIJKSTRA",
  // A_STAR: "A STAR",
};

export default function PathFinderComponent({ size }) {
  const horizontalCount = 40;

  const [startCordinate, setStartCordinate] = useState([3, 3]);
  const [endCordinates, setEndCordinates] = useState([3, horizontalCount - 3]);
  const [borders, setBorders] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // if algo is running
  const [algoType, setAlgoType] = useState(PathFinderAlgoType.BFS);

  const [pathList, setPathList] = useState([]); // traversed path
  const [routeList, setRouteList] = useState([]); // route to target path
  const [isReached, setIsReached] = useState(false); // route to target path
  const [computingCount, setComputingCount] = useState(0); // route to target path

  let instructionMap = {};
  const dijkstraInstructions = [
    " In this dijkstra visualization, wall can be broken if no available path found ",
    " Dijkstra algo, will try to find the traget with minimum wall break.",
    " The path will not be shortest by distance but will be less costlier",
  ];
  instructionMap[PathFinderAlgoType.DIJKSTRA] = dijkstraInstructions;
  instructionMap[PathFinderAlgoType.BFS] = [
    "Breadth first search (BFS) will traverse all direction and will find the shortest path to the target"
  ]
  instructionMap[PathFinderAlgoType.DFS] = [
    "Depth first search (DFS) will find the target in depth first (one-direction until not possible) manner, the found path need not to be the shortest "
  ]

  const [mouseEventWithType, setMouseEventWithType] = useState(
    MouseEventWithType.BLANK
  );

  function clearStates() {
    if (isRunning) return true;
    console.log("--- cleared state --- ");
    setStartCordinate([3, 3]);
    setEndCordinates([3, horizontalCount - 3]);
    setBorders([]);
    clearPathOnly();
  }
  // clear only path and route, to start again
  function clearPathOnly() {
    setIsRunning(false);
    setPathList([]);
    setRouteList([]);
    setIsReached(false);
    setComputingCount(0);
  }

  function getPathNo(x, y) {
    return x * horizontalCount + y;
  }

  useEffect(() => {
    if (!isRunning) clearStates();
  }, [size]);

  function getStringName(x, y) {
    if (startCordinate[0] == x && startCordinate[1] == y) return "S";
    if (endCordinates[0] == x && endCordinates[1] == y) return "E";
    return "";
  }

  function onMouseEnterEvent(cord) {
    if (isRunning) return;
    let start = getPathNo(startCordinate[0], startCordinate[1]);
    let end = getPathNo(endCordinates[0], endCordinates[1]);

    let cordNumber = getPathNo(cord[0], cord[1]);
    if (isMouseDown) {
      if (mouseEventWithType == MouseEventWithType.START) {
        setStartCordinate(cord);
      } else if (mouseEventWithType == MouseEventWithType.END) {
        setEndCordinates(cord);
      } else {
        if (borders.includes(cordNumber)) {
          setBorders(borders.filter((e) => e != cordNumber));
        } else {
          if (cordNumber != start && cordNumber != end) {
            setBorders([...borders, cordNumber]);
          }
        }
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
    let downCord = getPathNo(cord[0], cord[1]);
    setBorders(borders.filter((e) => e != downCord));
  }

  function onMouseDownEvent(cord) {
    if (isRunning) return;
    let downCord = getPathNo(cord[0], cord[1]);
    let start = getPathNo(startCordinate[0], startCordinate[1]);
    let end = getPathNo(endCordinates[0], endCordinates[1]);

    if (downCord == start) {
      setMouseEventWithType(MouseEventWithType.START);
    } else if (downCord == end) {
      setMouseEventWithType(MouseEventWithType.END);
    } else {
      setMouseEventWithType(MouseEventWithType.BLANK);
      if (borders.includes(downCord)) {
        setBorders(borders.filter((e) => e != downCord));
      } else {
        setBorders([...borders, downCord]);
      }
    }
    setIsMouseDown(true);
  }

  async function startExecution() {
    if (isRunning) return;
    clearPathOnly();
    setIsRunning(true);
    let pathData = [];
    switch (algoType) {
      case PathFinderAlgoType.BFS: {
        pathData = await bfsFinder(
          startCordinate,
          endCordinates,
          borders,
          (x, y) => {
            setPathList((prevstate) => [...prevstate, getPathNo(x, y)]);
          },
          size,
          horizontalCount,
          (value) => setComputingCount(value)
        );

        // setIsRunning(false);
        break;
      }

      case PathFinderAlgoType.DFS:
        pathData = await dfsFinder(
          startCordinate,
          endCordinates,
          borders,
          (x, y) => {
            setPathList((prevstate) => [...prevstate, getPathNo(x, y)]);
          },
          size,
          horizontalCount,
          (value) => setComputingCount(value)
        );
        break;
      case PathFinderAlgoType.DIJKSTRA:
        pathData = await dijkstraFunction(
          startCordinate,
          endCordinates,
          borders,
          (x, y) => {
            setPathList((prevstate) => [...prevstate, getPathNo(x, y)]);
          },
          size,
          horizontalCount,
          (value) => setComputingCount(value)
        );
    }


    for (let item of pathData) {
      await waitFor(20);
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
        You can move start and end positions, create wall, then click on the algo type to find the shortest path.
      </div>
      { instructionMap[algoType] && <div className="flex flex-col m-2 border-t-2 p-4 border-b-2">
        {(instructionMap[algoType] ?? []).map((value, idx) => {
          return (
            <div className="text-sm" key={idx}>
              { (instructionMap[algoType] ?? []).length > 1 ?  (`${idx + 1} .` ) : ""} {value}
            </div>
          );
        })}
      </div>}
      <div className="flex justify-between">
        <div className="flex">
          {Object.values(PathFinderAlgoType).map((at) => {
            return (
              <div key={at} className="p-2">
                <Button
                  onClick={() => {
                    if (isRunning) return;
                    console.log("setting type : ", at);
                    setAlgoType(at);
                  }}
                  variant={algoType == at ? "contained" : "outlined"}
                >
                  {PathFinderAlgoType[at]}
                </Button>
              </div>
            );
          })}
        </div>
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
                  <PathFinderItem
                    pathMarkingNumber={getPathNo(x, y)}
                    key={currKey}
                    isStart={startCordinate[0] == x && startCordinate[1] == y}
                    isEnd={endCordinates[0] == x && endCordinates[1] == y}
                    cordinates={[x, y]}
                    isBorder={borders.includes(currKey)}
                    onClickHandler={() => {}}
                    name={getStringName(x, y)}
                    onMouseDown={() => onMouseDownEvent([x, y])}
                    onMouseUp={() => onMouseUpEvent([x, y])}
                    onMouseEnter={() => onMouseEnterEvent([x, y])}
                    isMarked={pathList.includes(currKey)}
                    isRoutePath={routeList.includes(currKey)}
                    isReached={isReached}
                    size={[size, horizontalCount]}
                    isBorderBroken={
                      algoType == PathFinderAlgoType.DIJKSTRA &&
                      routeList.includes(currKey) &&
                      borders.includes(currKey)
                    }
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
