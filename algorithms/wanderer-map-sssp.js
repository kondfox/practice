'use strict';

const findShortestPath = (map, from, to) => {
  from = node(...from);
  to = node(...to);

  const edgeList = generateEdgeList(map);
  const previousNodes = bfs(edgeList, from, to);
  const shortestPath = reconstractPath(previousNodes, from, to);

  return shortestPath;
}

const reconstractPath = (previousNodes, from, to) => {
  let path = [];
  let actual = to;

  while (actual !== from) {
    path.unshift(actual);
    actual = previousNodes[actual];
  }

  return path;
}

const bfs = (edgeList, from, to) => {
  let toVisit = [];
  let previousNodes = initializePreviousNodes(edgeList);
  previousNodes[from] = from;
  let actual = from;
  
  while (actual !== to) {
    const unvisitedNeighbours = edgeList[actual].filter(n => !previousNodes[n]);
    toVisit.push(...unvisitedNeighbours);
    unvisitedNeighbours.forEach(n => previousNodes[n] = actual);
    actual = toVisit.shift();
  }

  return previousNodes;
}

const initializePreviousNodes = (edgeList) => {
  return Object.keys(edgeList)
          .reduce((prev, node) => {
            prev[node] = null;
            return prev;
          }, {});
}

const generateEdgeList = (map) => {
  let edgeList = {};
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      edgeList[node(i, j)] = findNeighbours(i, j, map);
    }
  }
  return edgeList;
}

const node = (x, y) => {
  return `[${x}, ${y}]`;
}

const findNeighbours = (x, y, map) => {
  let neighbours = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if ((Math.abs(i) ^ Math.abs(j)) && map[x + i] && map[x + i][y + j]) {
        neighbours.push(node(x + i, y + j));
      }
    }
  }
  return neighbours;
}

const map = [
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 1]
];

const sp = findShortestPath(map, [0, 0], [3, 7]);
console.log(sp);
