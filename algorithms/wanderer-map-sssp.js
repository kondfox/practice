'use strict';

const findShortestPath = (map, from, to) => {
  const edgeList = generateEdgeList(map);
  const previousNodes = bfs(edgeList, node(...from), node(...to));
  const shortestPath = reconstractPath(previousNodes, node(...from), node(...to));
  return shortestPath;
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
  return [[-1, 0], [1, 0], [0, -1], [0, 1]]
    .map(i => (map[x + i[0]] && map[x + i[0]][y + i[1]]) ? node(x + i[0], y + i[1]) : null)
    .filter(c => c);
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
  return Object.keys(edgeList).reduce((prev, node) => { prev[node] = null; return prev; }, {});
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

console.log(findNeighbours(1, 1, map));


// const sp = findShortestPath(map, [0, 0], [3, 7]);
// console.log(sp);
