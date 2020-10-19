'use strict';

const leftChildIndex = i => i * 2 + 1;
const rightChildIndex = i => i * 2 + 2;
const parentIndex = i => Math.floor((i + 1) / 2) - 1;
const leftChild = (arr, i) => arr[leftChildIndex(i)];
const rightChild = (arr, i) => arr[rightChildIndex(i)];
const parent = (arr, i) => arr[parentIndex(i)];
const treeHeight = nodes => Math.ceil(Math.log2(nodes + 1));
const hasLeftChild = (arr, i) => arr[leftChildIndex(i)] > -1;
const hasRightChild = (arr, i) => arr[rightChildIndex(i)] > -1;

function swapNodes(indexes, queries) {
    const tree = constructTree(indexes);
    return queries.map(q => inOrder(executeQuery(tree, q)));
}

function executeQuery(tree, q) {
    let i = 1;
    while (q * i < treeHeight(tree.length)) {
        swapLevel(tree, q * i++);
    }
    return tree;
}

function swapLevel(tree, level) {
    const startIndex = Math.pow(2, level) - 1;
    for (let i = startIndex; i < tree.length;) {
        const swapArrSize = Math.pow(2, treeHeight(i + 1) - level - 1);
        const firstArr = tree.slice(i, i + swapArrSize);
        const secondArr = tree.slice(i + swapArrSize, i + 2 * swapArrSize);
        tree.splice(i, swapArrSize, ...secondArr);
        tree.splice(i + swapArrSize, swapArrSize, ...firstArr);
        i += swapArrSize * 2
    }
    return tree;
}

function inOrder(tree, inOrderArr = [], done = {}, i = 0) {
  if (tree.length === 1) return tree;
  if (i === 0 && done[leftChildIndex(i)] && done[rightChildIndex(i)]) {
    return inOrderArr;
  }
  if (hasLeftChild(tree, i) && !done[leftChildIndex(i)]) {
    return inOrder(tree, inOrderArr, done, leftChildIndex(i));
  } else {
    const isUndoneRightChild = hasRightChild(tree, i) && !done[rightChildIndex(i)];
    const nextIndex = isUndoneRightChild ? rightChildIndex(i) : parentIndex(i);
    const newInOrderArr = done[i] ? inOrderArr : [...inOrderArr, tree[i]];
    const newDone = done[i] ? done : Object.assign(done, { [i]: 1 });
    return inOrder(tree, newInOrderArr, newDone, nextIndex);
  }
}

function constructTree(indexes) {
    const tree = [1];
    for (let i = 0, j = 1; i < indexes.length; j += 2) {
        if (parent(tree, j) > -1) { tree.push(...indexes[i++]); }
        else { tree.push(-1, -1); }
    }
    return tree;
}

const indexes = [
  [2, 3],
  [4, -1],
  [5, -1],
  [6, -1],
  [7, 8],
  [-1, 9],
  [-1, -1],
  [10, 11],
  [-1, -1],
  [-1, -1],
  [-1, -1]
];
const queries = [2, 4];
console.log(swapNodes(indexes, queries));
// console.log(inOrder([1,2,3,4,-1,5,-1]));
// console.log(inOrder([1,2,3,-1,4,-1,5,-1,-1,6,-1,-1,-1,7,8,-1,-1,-1,-1,-1,9,-1,-1,-1,-1,-1,-1,-1,-1,10,11]));