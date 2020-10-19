function poisonousPlants(p) {
  let min = p[0];
  let max = 0;
  let stack = [{ val: p[0], day: 0 }];
  // console.log(`min: ${min}, max: ${max}`);
  // console.log("stack:", stack);
  for (let i = 1; i < p.length; i++) {
    // console.log(`=== ${p[i]} ===`);
    let day = 1;
    while (stack.length && p[i] <= stack[0].val) {
      const prev = stack.shift();
      day = Math.max(day, prev.day) + 1;
    }
    if (p[i] <= min) {
      min = p[i];
      day = 0;
    }
    if (stack.length && stack[0].day === day) {
      stack.shift();
    }
    max = Math.max(max, day);
    stack.unshift({ val: p[i], day });
    // console.log(`min: ${min}, max: ${max}`);
    // console.log("stack:", stack);
  }
  return max;
}

console.log(poisonousPlants([3, 2, 5, 4]), "should be 2");
console.log(poisonousPlants([6, 5, 8, 4, 7, 10, 9]), "should be 2");
console.log(poisonousPlants([4, 3, 7, 5, 6, 4, 2]), "should be 3");
console.log(poisonousPlants([3, 7, 1, 2, 4, 8, 2, 7, 10]), "should be 2");
console.log(
  poisonousPlants([
    403,
    1048,
    15780,
    14489,
    15889,
    18627,
    13629,
    13706,
    16849,
    13202,
    10192,
    17323,
    4904,
    6951,
    16954,
    5568,
    4185,
    7929,
    8860,
    14945,
    3764,
    4972,
    13476,
    14330,
    1174,
    18952,
    10087,
    10863,
    9543,
    12802,
    1607,
    9354,
    13127,
    920,
  ]),
  "should be 10"
);
