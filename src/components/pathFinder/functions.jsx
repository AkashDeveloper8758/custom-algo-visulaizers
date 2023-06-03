import { border, getPath } from "@mui/system";
import { waitFor } from "../../helpers/staticConstants";

// updatePathFunction : ( cord, )
function isValidCordinate(x, y, n, m) {
  return x >= 0 && y >= 0 && x < n && y < m;
}

function getPathNo(x, y, m) {
  return x * m + y;
}

export async function bfsFinder(start, end, borders, updatePathFunction, n, m) {
  console.log("--- started");
  let stack = [start];
  let childrenToParentMap = {};
  let isFound = false;

  while (stack.length > 0) {
    let curr = stack.shift();
    if (JSON.stringify(curr) === JSON.stringify(end)) {
      console.log("found the element : ", [curr, end]);
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

async function dfsHelper(
  end,
  borders,
  updatePathFunction,
  n,
  m,
  path,
  visited,
  i,
  j
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

    if (
      isValidCordinate(x, y, n, m) &&
      !borders.includes(newPathValue) &&
      !visited.has(newPathValue)
    ) {
      visited.add(newPathValue);
      // console.log('visited : ',visited)
      updatePathFunction(x, y);
      await waitFor(30);
      path.push(newPathValue);
      console.log(" end / curr : ", [
        getPathNo(end[0], end[1], m),
        newPathValue,
      ]);
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
        y
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

export async function dfsFinder(start, end, borders, updatePathFunction, n, m) {
  let visited = new Set();

  let parent = getPathNo(end[0], end[1], m);
  let pathOrder = [parent];
  await dfsHelper(
    end,
    borders,
    updatePathFunction,
    n,
    m,
    pathOrder,
    visited,
    start[0],
    start[1]
  );
  console.log("path order : ", pathOrder);

  return pathOrder;
}

// def dikstraAlgorithm(graph:list[list],s=0):
//     v = len(graph)
//     visited = [False for _ in range(v)]
//     dist = [math.inf for _ in range(v)]
//     dist[s]= 0

//     for _ in range(v):
//         u = -1
//         for i in range(v):
//             if not visited[i] and (u == -1 or dist[u] > dist[i] ):
//                 u = i
//         visited[u]= True
//         for i in range(v):
//             if not visited[i] and graph[u][i] != 0:
//                 dist[i] = min(dist[i],dist[u]+graph[u][i])

//     return dist

export async function dijkstraFunction(
  start,
  end,
  borders,
  updatePathFunction,
  n,
  m
) {
  let mat = Array.from({length:n}).map((_)=>  new Array(m).fill(0))
  for(let i=0;i<n;i ++){
    for(let j=0; j< m; j++){
      let currValue = getPathNo(i,j,m)
      if(borders.includes(currValue)){
        mat[i][j] = 1
      }
    }
  }
  let visited = new Set()
  let dist = {};
  let reverseMap = {}
  let startValue = getPathNo(start[0],start[1],m)
  let endValue = getPathNo(end[0],end[1],m)
  dist[startValue] = 0
  
  let totalLength = n * m
  for(let i = 0; i < totalLength; i++ ){
    let u = [-1,-1]
    for(let x= 0; x < n; x++){
      for(let y=0; y < m; y++){
        let value = getPathNo(x,y,m)
       
        if(!visited.has(value) && (u[0] == -1 || mat[u[0]][u[1]] > mat[x][y] ) ){
          u = [x,y]
        }
      }
    }
    let smallestIndexV = getPathNo(u[0],u[1],m)
    visited.add(smallestIndexV)
    await waitFor(20)
    updatePathFunction(u[0],u[1])
  }

  
}
