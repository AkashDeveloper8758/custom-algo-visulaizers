import { border, getPath } from "@mui/system";
import { waitFor } from "../../helpers/staticConstants";

// updatePathFunction : ( cord, )
function isValidCordinate(x, y, n, m) {
  return x >= 0 && y >= 0 && x < n && y < m;
}

function getPathNo(x, y, m) {
  return x * m + y;
}

export async function bfsFinder(
  start,
  end,
  borders,
  updatePathFunction,
  n,
  m,
  setCompute
) {
  let stack = [start];
  let childrenToParentMap = {};
  let isFound = false;
  let iteration = 0;

  while (stack.length > 0) {
    let curr = stack.shift();
    if (JSON.stringify(curr) === JSON.stringify(end)) {
      isFound = true;
      break;
    } else {
      let dirs = [
        [1, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
      ];
      for (let d of dirs) {
        let x = curr[0] + d[0],
          y = curr[1] + d[1];
        let newPathValue = getPathNo(x, y, m);
        if (
          isValidCordinate(x, y, n, m) &&
          !borders.includes(newPathValue) &&
          childrenToParentMap[newPathValue] == undefined
        ) {
          stack.push([x, y]);
          childrenToParentMap[newPathValue] = getPathNo(curr[0], curr[1], m);
          updatePathFunction(x, y);
          if (getPathNo(end[0], end[1], m) == newPathValue) {
            break;
          }
          await waitFor(10);
        }
        iteration += 1;
        setCompute(iteration);
      }
      if (childrenToParentMap[getPathNo(end[0], end[1], m)] != undefined) {
        isFound = true;
        break;
      }
    }
  }
  if (!isFound) return [];
  let parent = getPathNo(end[0], end[1], m);
  let pathOrder = [parent];

  while (childrenToParentMap[parent] != undefined) {
    parent = childrenToParentMap[parent];
    pathOrder.push(parent);
    if (parent == getPathNo(start[0], start[1], m)) break;
  }
  return pathOrder.reverse();
}

var _dfsComputeCount = 0;
async function dfsHelper(
  end,
  borders,
  updatePathFunction,
  n,
  m,
  path,
  visited,
  i,
  j,
  setCompute
) {
  let dirs = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let d of dirs) {
    let x = i + d[0],
      y = j + d[1];
    let newPathValue = getPathNo(x, y, m);
    _dfsComputeCount += 1;

    if (
      isValidCordinate(x, y, n, m) &&
      !borders.includes(newPathValue) &&
      !visited.has(newPathValue)
    ) {
      visited.add(newPathValue);

      updatePathFunction(x, y);
      await waitFor(15);
      path.push(newPathValue);
      setCompute(_dfsComputeCount);
      if (getPathNo(end[0], end[1], m) == newPathValue) return true;

      var res = await dfsHelper(
        end,
        borders,
        updatePathFunction,
        n,
        m,
        path,
        visited,
        x,
        y,
        setCompute
      );
      if (res) {
        console.log("pop ------- ", newPathValue);
        return true;
      }
      path.pop();
    }
  }
  return false;
}

export async function dfsFinder(
  start,
  end,
  borders,
  updatePathFunction,
  n,
  m,
  setCompute
) {
  let visited = new Set();
  _dfsComputeCount = 0;

  let parent = getPathNo(end[0], end[1], m);
  let pathOrder = [];
  await dfsHelper(
    end,
    borders,
    updatePathFunction,
    n,
    m,
    pathOrder,
    visited,
    start[0],
    start[1],
    setCompute
  );
  if (pathOrder.length > 0) {
    pathOrder.unshift(parent);
  }
  console.log("path order : ", pathOrder);

  return pathOrder;
}

export async function dijkstraFunction(
  start,
  end,
  borders,
  updatePathFunction,
  n,
  m,
  setComputeCount
) {
  let iterations = 0;
  let weight = Array.from({ length: n }).map((_) => new Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let currValue = getPathNo(i, j, m);
      if (borders.includes(currValue)) {
        weight[i][j] = 1;
      }
    }
  }
  let dist = Array.from({ length: n }).map((_) => new Array(m).fill(n * m + 1));
  let visited = new Set();

  let reverseMap = {};
  dist[start[0]][start[1]] = 0;

  let totalLength = n * m;
  for (let i = 0; i < totalLength; i++) {
    let u = [-1, -1];
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < m; y++) {
        let value = getPathNo(x, y, m);
        if (
          !visited.has(value) &&
          (u[0] == -1 || dist[u[0]][u[1]] > dist[x][y])
        ) {
          u = [x, y];
        }
        iterations += 1;
      }
    }
    visited.add(getPathNo(u[0], u[1], m));
    updatePathFunction(u[0], u[1]);
    let dirRoutes = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let d of dirRoutes) {
      let x = u[0] + d[0],
        y = u[1] + d[1];
      let currValue = getPathNo(x, y, m);
      if (isValidCordinate(x, y, n, m) && !visited.has(currValue)) {
        let currWeight = dist[u[0]][u[1]] + weight[x][y];
        if (dist[x][y] > currWeight) {
          dist[x][y] = currWeight;
          reverseMap[currValue] = getPathNo(u[0], u[1], m);
        }
      }
      iterations += 1;
    }
    await waitFor(10);
    setComputeCount(iterations);
  }

  let parent = getPathNo(end[0], end[1], m);
  let pathOrder = [parent];

  while (reverseMap[parent] != undefined) {
    parent = reverseMap[parent];
    pathOrder.push(parent);
    if (parent == getPathNo(start[0], start[1], m)) break;
  }
  console.log("dijkstra path order ; ", pathOrder);
  return pathOrder.reverse();
}
