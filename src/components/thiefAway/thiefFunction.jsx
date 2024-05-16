import { waitFor } from "../../helpers/staticConstants";
import { PriorityQueue } from "./priorityQueue";

function isValidCordinate(x, y, n, m) {
  return x >= 0 && y >= 0 && x < n && y < m;
}

function getPathNo(x, y, m) {
  return x * m + y;
}
let horizontalCount = 0;
let size = 0;

function getTwoDArray(value) {
  return Array.from({ length: size }).map((_) =>
    new Array(horizontalCount).fill(value)
  );
}

let roww = [0, 0, -1, 1];
let coll = [-1, 1, 0, 0];
let iterations = 0;

async function bfs(grid, score, n, m, setCompute, updatePathFunction) {
  let q = [];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (grid[i][j] == 1) {
        q.push([i, j]);
        score[i][j] = 0;
      }
    }
  }
  while (q.length) {
    const [x, y] = q.shift();
    let s = score[x][y];
    for (var i = 0; i < 4; i++) {
      let newx = x + roww[i];
      let newy = y + coll[i];

      iterations += 1;
      setCompute(iterations);
      
      if (isValidCordinate(newx,newy,n,m) && score[newx][newy] > s + 1) {
        score[newx][newy] = s + 1;
        q.push([newx, newy]);
        updatePathFunction(newx, newy, s + 1);
      }
    }
    await waitFor(5);
  }
}

export async function thiefOptimalRoute(
  start,
  end,
  updatePathFunction,
  dijkstraPathUpdate,
  n,
  m,
  setCompute,
  thiefs
) {
  // pre - init
  horizontalCount = m;
  size = n;
  iterations = 0;

// post - init
  let grid = getTwoDArray(0);
  let score = getTwoDArray(Infinity);
  let vis = getTwoDArray(false);

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (thiefs.has(getPathNo(i, j, m))) {
        grid[i][j] = 1;
      }
    }
  }
  await bfs(grid, score, n, m, setCompute, updatePathFunction);
  let pq = new PriorityQueue((a, b) => a[0] > b[0]);
  pq.push([score[start[0]][start[1]], start[0], start[1]]);
  let reverseMap = {};
  let finalRes = 0

  while (pq.size()) {
    const [s, x, y] = pq.pop();
    if (x == end[0] && y == end[1]) {
      finalRes =  s;
      break
    }
    vis[x][y] = true;
    dijkstraPathUpdate(x, y);
    for (var i = 0; i < 4; i++) {
      let newx = x + roww[i];
      let newy = y + coll[i];
      let parent = getPathNo(x, y, m);
      if ( isValidCordinate(newx,newy,n,m) && !vis[newx][newy]) {
        let news = Math.min(s, score[newx][newy]);
        pq.push([news, newx, newy]);
        vis[newx][newy] = true;
        reverseMap[getPathNo(newx, newy, m)] = parent;
      }
      iterations += 1;
    }
    await waitFor(10);
    setCompute(iterations);
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
