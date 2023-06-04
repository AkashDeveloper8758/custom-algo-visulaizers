import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import QueensBoardItem from "./queenBoardItem";

export default function NQueensComponents({ size }) {
  const myArray = [...Array(size)];
  const [isIterating, setIsIterating] = useState(false);
  const [startPoint, setStartPoint] = useState([]);
  const [queensPath, setQueensPath] = useState([]);
  const [isReached, setIsReached] = useState(null);
  const [checkPathArray, setCheckPathArray] = useState([]);

  function clearStates() {
    setIsReached(null);
    setStartPoint([]);
    setQueensPath([]);
    setCheckPathArray([]);
  }
  function clearHalfState() {
    setIsReached(null);
    setQueensPath([]);
    setCheckPathArray([]);
  }

  useEffect(() => {
    clearStates();
  }, [size]);

  const onBoardItemClick = (cord) => {
    if (cord) {
      if (!isIterating) {
        clearHalfState();
        setStartPoint(cord);
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

  function checkIfSafe(i, j, matrix) {
    // diagonal top-left * bottom-right
    let x, y;
    let n = matrix.length;
    let checkArr = [];
    x = i - 1;
    y = j - 1;
    while (isValidCordinate(x, y, size)) {
      if (matrix[x][y] === 1) return false;
      checkArr.push(getPathNo(x, y, n));
      x -= 1;
      y -= 1;
    }
    x = i + 1;
    y = j + 1;
    while (isValidCordinate(x, y, size)) {
      if (matrix[x][y] === 1) return false;
      checkArr.push(getPathNo(x, y, n));
      x += 1;
      y += 1;
    }

    // diagonal bottom-left * top-right
    x = i + 1;
    y = j - 1;
    while (isValidCordinate(x, y, size)) {
      if (matrix[x][y] === 1) return false;
      checkArr.push(getPathNo(x, y, n));
      x += 1;
      y -= 1;
    }
    x = i - 1;
    y = j + 1;
    while (isValidCordinate(x, y, size)) {
      if (matrix[x][y] === 1) return false;
      checkArr.push(getPathNo(x, y, n));
      x += 1;
      y += 1;
    }
    //horizontal check
    for (let b = 0; b < size; b++) {
      if (b === j) continue;
      if (matrix[i][b] === 1) {
        return false;
      }
      checkArr.push(getPathNo(i, b, n));
    }
    // vertical check
    for (let b = 0; b < size; b++) {
      if (b === i) continue;
      if (matrix[b][j] === 1) {
        return false;
      }
      checkArr.push(getPathNo(b, j, n));
    }
    setCheckPathArray([...checkArr]);
    return true;
  }

  const findQueensPath = async (col, mat, res) => {
    let n = mat.length;
    if (startPoint[1] === col) {
      await waitFor(20);
      if (col + 1 == n) return true;
      let out = findQueensPath(col + 1, mat, res);
      return out;
    }

    for (let i = 0; i < n; i++) {
      res.push(getPathNo(i, col, n));
      setQueensPath([...res]);
      mat[i][col] = 1;
      await waitFor(10);

      if (checkIfSafe(i, col, mat)) {
        if (col + 1 == n) return true;
        let out = await findQueensPath(col + 1, mat, res);
        if (out) return true;
      }
      mat[i][col] = 0;
      res.pop();
      setQueensPath([...res]);
    }
    return false;
  };

  const startNqueensFunction = async () => {
    if (isIterating) return;

    if (startPoint.length == 0) return;
    setIsIterating(true);
    let currMat = Array.from({ length: size }, () => new Array(size));
    let startCol = startPoint[1] === 0 ? 1 : 0;
    currMat[startPoint[0]][startPoint[1]] = 1;
    let pathTrack = [getPathNo(startPoint[0], startPoint[1], size)];
    await findQueensPath(startCol, currMat, pathTrack);
    setIsReached(pathTrack.length == size);
    setIsIterating(false);
  };

  return (
    <div className="flex-col m-8 items-center ">
      <div className="flex justify-center">
        {startPoint.length > 0 && (
          <div className="p-4">
            <Button onClick={clearStates} variant="outlined">
              Clear
            </Button>
          </div>
        )}
        {startPoint.length > 0 && (
          <div className="p-4">
            <Button
              onClick={async () => {
                setIsReached(null);
                await startNqueensFunction();
              }}
              variant="outlined"
              color="success"
            >
              Start
            </Button>
          </div>
        )}
      </div>
      {myArray.map((_, x) => {
        return (
          <div key={x} className="flex justify-center ">
            {myArray.map((_, y) => {
              let currKey = getPathNo(x, y, size);
              return (
                <QueensBoardItem
                  key={currKey}
                  onClickHandler={onBoardItemClick}
                  cordinates={[x, y]}
                  isMarked={startPoint[0] === x && startPoint[1] === y}
                  // name={`${x}${y}`}
                  name={currKey + 1}
                  isHighlight={queensPath.includes(currKey)}
                  isReached={isReached}
                  size = {[size,size]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
