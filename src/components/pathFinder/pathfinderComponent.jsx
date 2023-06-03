import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { waitFor } from "../../helpers/staticConstants";
import { dfsFinder, bfsFinder } from "./functions";
import PathFinderItem from "./pathItem";

class MouseEventWithType {
  static START = "START";
  static END = "END";
  static BLANK = "BLANK";
}
const PathFinderAlgoType = {
  BFS: "BFS",
  DFS: "DFS",
  // DIJKSTRA: "DIJKSTRA",
  // A_STAR: "A STAR",
};

export default function PathFinderComponent({ size }) {
  const horizontalCount = 40;

  const [startCordinate, setStartCordinate] = useState([0, 0]);
  const [endCordinates, setEndCordinates] = useState([0, horizontalCount - 1]);
  const [borders, setBorders] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isRunning, setIsRunning] = useState(false); // if algo is running
  const [algoType, setAlgoType] = useState(PathFinderAlgoType.BFS);

  const [pathList, setPathList] = useState([]); // traversed path
  const [routeList, setRouteList] = useState([]); // route to target path
  const [isReached, setIsReached] = useState(false); // route to target path

  const [mouseEventWithType, setMouseEventWithType] = useState(
    MouseEventWithType.START
  );

  function clearStates() {
    if (isRunning) return true;
    console.log("--- cleared state --- ");
    setStartCordinate([0, 0]);
    setEndCordinates([0, horizontalCount - 1]);
    setBorders([]);
    setIsRunning(false);
    setPathList([]);
    setRouteList([]);
    setIsReached(false);
  }
  // clear only path and route, to start again
  function clearPathOnly() {
    setIsRunning(false);
    setPathList([]);
    setRouteList([]);
    setIsReached(false);
  }

  function getPathNo(x, y) {
    return x * horizontalCount + y;
  }

  const onBoardItemClick = (cord) => {
    //   if (cord) {
    //     if (startCordinate.length > 0) {
    //       setEndCordinates(cord);
    //     } else if (startCordinate.length == 0) {
    //       setStartCordinate(cord);
    //     }
    //   }
  };

  useEffect(() => {
    clearStates();
  }, [size]);

  function getStringName(x, y) {
    if (startCordinate[0] == x && startCordinate[1] == y) return "S";
    if (endCordinates[0] == x && endCordinates[1] == y) return "E";
    return "";
  }

  function onMouseEnterEvent(cord) {
    if (isRunning) return;
    
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
          setBorders([...borders, cordNumber]);
        }
      }
    }
  }
  function onMouseUpEvent(cord) {
    if (isRunning) return;
    setIsMouseDown(false);
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
          horizontalCount
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
          horizontalCount
        );
    }
    console.log("path data : ", pathData);
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
    <div className="flex-col m-8 ">
      <div className="flex justify-start">
        <div className="flex">
          {Object.keys(PathFinderAlgoType).map((at) => {
            return (<div className="p-2">
              <Button
                onClick={() => {
                  if (isRunning) return;
                  setAlgoType(at);
                }}
                variant={algoType == at ? "contained" : "outlined"}
              >
                {PathFinderAlgoType[at]}
              </Button>
            </div>);
          })}
          {/* <div className="p-2">
            <Button
              onClick={() => {
                if (isRunning) return;
                setAlgoType(PathFinderAlgoType.BFS);
              }}
              variant={algoType == PathFinderAlgoType.BFS ? "contained" : "outlined"}
            >
              BFS
            </Button>
          </div>
          <div className="p-2">
            <Button
              onClick={() => {
                if (isRunning) return;
                setAlgoType(PathFinderAlgoType.DFS);
              }}
              variant={algoType == PathFinderAlgoType.DFS ? "contained" : "outlined"}
            >
              DFS
            </Button>
          </div> */}
        </div>
        <div className="flex self-center px-12">
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
      </div>
      <div className="border-2 flex-col items-center justify-end   ">
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
                    onClickHandler={() => onBoardItemClick([x, y])}
                    name={getStringName(x, y)}
                    onMouseDown={() => onMouseDownEvent([x, y])}
                    onMouseUp={() => onMouseUpEvent([x, y])}
                    onMouseEnter={() => onMouseEnterEvent([x, y])}
                    isMarked={pathList.includes(currKey)}
                    isRoutePath={routeList.includes(currKey)}
                    isReached={isReached}
                    size={[size, horizontalCount]}
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
