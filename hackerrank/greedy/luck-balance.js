'use strict';

function luckBalance(k, contests) {
  const max = sumAllLucks(contests);
  const importants = contests.filter(c => c[1] === 1);
  const minImportants = sumKLeastImportant(importants, k);
  return max - minImportants;
}

function sumKLeastImportant(contests, k) {
  let remainingContests = [...contests];
  let minSum = 0;
  for (let i = 0; i < contests.length - k; i++) {
      const minIndex = findMinImportantIndex(remainingContests);
      if (minIndex === -1) return minSum;
      console.log('min', remainingContests[minIndex][0]);
      minSum += remainingContests[minIndex][0] * 2;
      remainingContests.splice(minIndex, 1);
  }
  return minSum;
}

function findMinImportantIndex(contests) {
  let minIndex = -1;
  let min = Number.MAX_VALUE;
  for (let i = 0; i < contests.length; i++) {
      if (contests[i][0] < min) {
          min = contests[i][0];
          minIndex = i;
      }
  }
  return minIndex;
}

function sumAllLucks(contests) {
  return contests.reduce((sum, c) => sum + c[0], 0);
}

const contests1 = [[5,1],[2, 1],[1,1],[8,1],[10,0],[5,0]];
console.log(luckBalance(3, contests1), 'should be 29');
const contests2 = [[13,1],[10,1],[9,1],[8,1],[13,1],[12,1],[18,1],[13,1]];
console.log(luckBalance(5, contests2), 'should be 42');