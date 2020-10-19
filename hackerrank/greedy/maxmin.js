'use strict';

function maxMin(k, arr) {
  arr.sort((a, b) => a - b);
  if (arr.length == k) return arr.slice(-1) - arr[0];

  let minUnfairness = Number.MAX_VALUE;
  for (let i = 0; i < arr.length - k + 1; i++) {
      const subarr = arr.slice(i, i + k);
      console.log(subarr);
      
      const unfairness = subarr.slice(-1) - subarr[0];
      if (unfairness < minUnfairness) {
          minUnfairness = unfairness;
      }
  }
  return minUnfairness;
}

console.log(maxMin(3, [100,200,300,350,400,401,402]));
