function swapNodes(indexes, queries) {
  const tree = constructTree(indexes);
  return queries.map((q) => inOrder(swap(tree, q)));
}

function swap(tree, q) {
  const queue = [tree[0]];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node.level % q == 0) {
      const temp = node.left;
      node.left = node.right;
      node.right = temp;
    }
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return tree;
}

function* idGenerator() {
  for (let i = 0; i < 1024; i++) {
    yield i;
  }
}

function inOrder(tree) {
  const nodes = Object.keys(tree).length;
  const traversal = [];
  const done = {};
  let i = 0;
  while (traversal.length < nodes) {
    if (tree[i].left && !done[tree[i].left.id]) {
      i = tree[i].left.id;
    } else if (tree[i].right && !done[tree[i].right.id]) {
      traversal.push(tree[i].val);
      done[i] = 1;
      i = tree[i].right.id;
    } else {
      if (!done[i]) {
        traversal.push(tree[i].val);
        done[i] = 1;
      }
      i = tree[i].parent;
    }
  }
  return traversal;
}

function constructTree(indexes) {
  const idGen = idGenerator();
  const tree = {};
  let node = { id: idGen.next().value, val: 1, level: 1 };
  tree[node.id] = node;
  const nodes = [node];
  for (let i = 0; i < indexes.length; i++) {
    const parent = nodes.shift();
    const [left, right] = indexes[i];
    const lN = addNode(tree, nodes, parent, left, "left", idGen);
    const rN = addNode(tree, nodes, parent, right, "right", idGen);
  }
  return tree;
}

function addNode(tree, nodes, parent, value, side, idGen) {
  const node = { val: value, parent: parent.id, level: parent.level + 1 };
  if (value > -1) {
    nodes.push(node);
    node.id = idGen.next().value;
    tree[node.id] = node;
    parent[side] = node;
  }
  return node;
}

const n = [
  [2, 3],
  [4, 5],
  [6, -1],
  [-1, 7],
  [8, 9],
  [10, 11],
  [12, 13],
  [-1, 14],
  [-1, -1],
  [15, -1],
  [16, 17],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
];
const q = [2, 3];
console.log(swapNodes(n, q));
