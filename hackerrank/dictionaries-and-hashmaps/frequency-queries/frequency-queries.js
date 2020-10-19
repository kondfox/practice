'use strict';

function freqQuery(queries) {
  const ops = {
    1: (f, fi, e) => {
      f[e] = f[e] ? ++f[e] : 1;
      fi[f[e]] = fi[f[e]] ? ++fi[f[e]] : 1;
      if (f[e] != 1) --fi[f[e] - 1];
    },
    2: (f, fi, e) => {
      if (!f[e]) return;
      --f[e];
      --fi[f[e] + 1];
      ++fi[f[e]];
    },
    3: (f, fi, e) => fi[e] > 0,
  }
  let f = {};
  let fi = {};
  let arr = [];
  for (let [op, val] of queries) {
    const r = ops[op](f, fi, val);
    if (op == 3) arr.push(Number(r));
    console.log(fi);
  }
  return arr;
}

const queries = [[1,1], [2,2], [3,2], [1,1], [1,1], [2,1], [3,2]];
console.log(freqQuery(queries));

