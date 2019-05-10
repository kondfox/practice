'use strict'

const dijkstra = (graph, from, to) => {
  const distances = initialNodeDistances(Object.keys(graph), from);
  const nextNodes = createBinaryMinHeap();
  const previousNodes = {};
  let actual = from;

  while (actual !== to) {
    const updates = updateDistances(distances, actual, graph[actual]);
    updateNextNodes(nextNodes, updates);
    updatePreviousNodes(previousNodes, updates, actual);
    if (!nextNodes.peek()) return [];
    actual = nextNodes.poll().node;
  }

  return reconstructPath(previousNodes, from, to);
}

const reconstructPath = (previousNodes, from, to) => {
  let path = [];
  while (path[0] !== from) {
    path.unshift(to);
    to = previousNodes[to];
  }
  return path;
}

const updatePreviousNodes = (previousNodes, updates, actual) => {
  updates.new.forEach(n => previousNodes[n.node] = actual);
  updates.decreased.forEach(n => previousNodes[n.node] = actual);
  return previousNodes;
}

const updateNextNodes = (nextNodes, updates) => {
  updates.new.forEach(n => nextNodes.add(n));
  updates.decreased.forEach(n => nextNodes.decrease(n));
  return nextNodes;
}

const updateDistances = (distances, node, edges) => {
  const updates = { 'new': [], 'decreased': [], };
  
  for (let edge of edges) {
    const cost = distances[node] + edge.cost;
    if (cost < distances[edge.to]) {
      if (distances[edge.to] == Infinity) {
        updates.new.push(nodeDistance(edge.to, cost));
      } else {
        updates.decreased.push(nodeDistance(edge.to, cost));
      }
      distances[edge.to] = cost;
    }
  }
  return updates;
}

const initialNodeDistances = (nodes, from) => {
  return nodes.reduce((d, n) => { d[n] = n === from ? 0 : Infinity; return d; }, {});
}

const nodeDistance = (nodeName, distanceFromSource) => {
  return { 'node': nodeName, 'distance': distanceFromSource, };
}

const createBinaryMinHeap = () => {
  const heap = [];

  const leftChildIndex = (i) => { return i * 2 + 1; }
  const rightChildIndex = (i) => { return i * 2 + 2; }
  const parentIndex = (i) => { return Math.floor((i - 1) / 2); }

  const leftChild = (i) => { return heap[leftChildIndex(i)]; }
  const rightChild = (i) => { return heap[rightChildIndex(i)]; }
  const parent = (i) => { return heap[parentIndex(i)]; }

  const swap = (i, j) => {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  const heapifyUp = (i = heap.length - 1) => {
    while (parent(i) && heap[i].distance < parent(i).distance) {
      swap(i, parentIndex(i));
      i = parentIndex(i);
    }
  }

  const heapifyDown = (i = 0) => {
    while (leftChild(i)) {
      let lowerIndex = leftChildIndex(i);
      if (rightChild(i) && rightChild(i).distance < leftChild(i).distance) {
        lowerIndex = rightChildIndex(i);
      }
      if (heap[lowerIndex].distance > heap[i].distance) break;
      swap(i, lowerIndex);
      i = lowerIndex;
    }
  }

  const find = (node) => {
    for (let i = 0; i < heap.length; i++) {
      if (heap[i].node === node) return i;
    }
    return -1;
  }
  
  return {
    add: (node) => {
      heap.push(node);
      heapifyUp();
    },

    peek: () => {
      return heap[0];
    },

    poll: () => {
      const min = heap.shift();
      heap.unshift(heap.pop());
      heapifyDown();
      return min;
    },

    decrease: ({ node, distance }) => {
      const nodeIndex = find(node);
      if (nodeIndex < 0) return;
      heap[nodeIndex].distance = distance;
      heapifyUp(nodeIndex);
    },
    
  }
}

const graph = {
  'A': [
    { 'to': 'B', 'cost': 15 },
    { 'to': 'C', 'cost': 13 },
    { 'to': 'D', 'cost': 5 },
  ],
  'B': [
    { 'to': 'H', 'cost': 12 },
  ],
  'C': [
    { 'to': 'B', 'cost': 2 },
    { 'to': 'D', 'cost': 18 },
    { 'to': 'F', 'cost': 6 },
  ],
  'D': [
    { 'to': 'E', 'cost': 4 },
    { 'to': 'I', 'cost': 99 },
  ],
  'E': [
    { 'to': 'C', 'cost': 3 },
    { 'to': 'F', 'cost': 1 },
    { 'to': 'G', 'cost': 9 },
    { 'to': 'I', 'cost': 14 },
  ],
  'F': [
    { 'to': 'B', 'cost': 8 },
    { 'to': 'H', 'cost': 17 },
  ],
  'G': [
    { 'to': 'F', 'cost': 16 },
    { 'to': 'H', 'cost': 7 },
    { 'to': 'I', 'cost': 10 },
  ],
  'H': [],
  'I': [
    { 'to': 'H', 'cost': 11 },
  ],
}

console.log(dijkstra(graph, 'A', 'C'));