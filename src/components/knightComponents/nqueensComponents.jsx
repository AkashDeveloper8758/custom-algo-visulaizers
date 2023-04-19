import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import BoardItem from "./boardItem";

export default function NQueensComponents({ size }) {
  const myArray = [...Array(size)];
  const [startCordinate, setStartCordinate] = useState([]);
  const [endCordinates, setEndCordinates] = useState([]);
  const [pathArray, setPathArray] = useState([]);
  const [isReached, setIsReached] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);

  function clearStates() {
    setStartCordinate([]);
    setEndCordinates([]);
    setPathArray([]);
    setIsReached(null);
    setShortestPath([])
  }
  
  useEffect(() => {
    clearStates();
  }, [size]);

  const onBoardItemClick = (cord) => {
    if (cord) {
      if (startCordinate.length > 0) {
        setEndCordinates(cord);
      } else if (startCordinate.length == 0) {
        setStartCordinate(cord);
      }
    }
  };

  function getPathNo(x, y, size) {
    return x * size + y;
  }
  function isValidCordinate(x, y, size) {
    return x >= 0 && y >= 0 && x < size && y < size;
  }
  async function waitFor(durationInMillisecond) {
    await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve();
      }, durationInMillisecond);
    });
  }

  
  const findQueensPath = async (start, end, size) => {
    
  };

  const stepsToReach = async () => {
    if (startCordinate.length == 0 || endCordinates.length == 0) return;
    await findQueensPath(startCordinate, endCordinates, size);
  };

  return (
    <div className="flex-col m-8 items-center ">
      {myArray.map((_, x) => {
        return (
          <div key={x} className="flex justify-center ">
            {myArray.map((_, y) => {
              // console.log('is marked : ',[x,y] == startCordinate)
              let currKey = getPathNo(x, y, size) 
              return (
                <BoardItem
                pathMarkingNumber={(shortestPath.length > 0 && shortestPath.includes(currKey)) ? shortestPath.indexOf(currKey) +1 : false  }
                  key={currKey}
                  isStart={startCordinate[0] == x && startCordinate[1] == y}
                  isEnd={endCordinates[0] == x && endCordinates[1] == y}
                  onClickHandler={onBoardItemClick}
                  cordinates={[x, y]}
                  isMarked={pathArray.includes(currKey)}
                  name={currKey +1}
                  isReached={isReached}
                />
              );
            })}
          </div>
        );
      })}

      <div className="flex justify-center">
        {startCordinate.length > 0 && endCordinates.length > 0 && (
          <div className="p-4">
            <Button onClick={clearStates} variant="outlined">
              {" "}
              Clear{" "}
            </Button>
          </div>
        )}
        {startCordinate.length > 0 && endCordinates.length > 0 && (
          <div className="p-4">
            <Button
              onClick={() => {
                setPathArray([]);
                setIsReached(null);
                setShortestPath([])
                stepsToReach();
              }}
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
  );
}
