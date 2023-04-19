import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import BoardItem from "./boardItem";

export default function BoardComponents({ size }) {
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

  function createShortestPath(parentMap, start, end,size) {
    
    let [startId, endId] = [getPathNo(start[0], start[1],size), getPathNo(end[0], end[1],size)];
    let pathArr = [endId];
    let currId = endId

    while (parentMap[currId] && currId != startId) {
      pathArr.push(parentMap[currId]);
      currId = parentMap[currId];
    }
    console.log(parentMap);
    pathArr = pathArr.reverse()
    console.log('final path : ',pathArr)
    setShortestPath(pathArr);
  }

  const bfsTraversal = async (start, end, size) => {
    let dx = [-2, -1, 1, 2, -2, -1, 1, 2];
    let dy = [-1, -2, -2, -1, 1, 2, 2, 1];
    let q = [[...start, 0]];
    let visited = new Array(size);
    for (let i = 0; i < size; i++) {
      visited[i] = new Array(size).fill(false);
    }
    let parentMap = {};

    while (q.length > 0) {
      let [x, y, d] = q.shift();

      for (let i = 0; i < 8; i++) {
        let newX = x + dx[i];
        let newY = y + dy[i];
        if (isValidCordinate(newX, newY, size) && !visited[newX][newY]) {
          visited[newX][newY] = true;
          await waitFor(20);
          setPathArray((prev) => [...prev, getPathNo(newX, newY, size)]);
          parentMap[getPathNo(newX, newY, size)] = getPathNo(x, y, size);
          
          if (newX === end[0] && newY === end[1]) {
            setIsReached(true);
            createShortestPath(parentMap, start, end,size);
            return;
          }
          q.push([newX, newY, d + 1]);
        }
      }
    }
    setIsReached(false);
  };

  const stepsToReach = async () => {
    if (startCordinate.length == 0 || endCordinates.length == 0) return;
    await bfsTraversal(startCordinate, endCordinates, size);
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
