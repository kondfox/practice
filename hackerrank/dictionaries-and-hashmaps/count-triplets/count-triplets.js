'use strict';

const fs = require('fs');
const testFile = 'count-triplets-test2.txt';

function countTriplets(arr, r) {
  const k = 3;
  const counters = initCounters(k);

  for (let n of arr) {
    const divisor = n / r;

    for (let i = k - 1; i > 0; i--) {
      const prevCount = counters[i - 1][divisor];
      if (Number.isInteger(divisor) && prevCount) {
        counters[i][n] = counters[i][n] ? counters[i][n] + prevCount : prevCount;
      }
    }

    counters[0][n] = counters[0][n] ? ++counters[0][n] : 1;
  }

  const sum = Object.values(counters[k - 1]).reduce((sum, n) => sum + n, 0);
  return sum;
}

function initCounters(k) {
  const counters = {};
  for (let i = 0; i < k; i++) {
    counters[i] = {};
  }
  return counters;
}

function main() {

    const nr = fs.readFileSync(testFile).toString().replace(/\n/g, ' ').split(' ');

    const n = parseInt(nr.shift());

    const r = parseInt(nr.shift());

    const arr = nr.map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    console.log(ans);
}

main();