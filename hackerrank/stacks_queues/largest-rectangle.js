function largestRectangle(houses) {
  const { stack, max } = processHouses(houses);
  const largest = processIncreasingHouses(stack, max);
  return largest;
}

function processIncreasingHouses(stack, max) {
  return stack.reduce(
    (res, { height, count }) => ({
      max: Math.max(height * (count + res.k), res.max),
      k: res.k + count,
    }),
    { max: max, k: 0 }
  ).max;
}

function processHouses(houses) {
  return houses.reduce(
    (res, h) => {
      const { shifts, newMax } = shiftBiggerHouses(res.stack, h, res.max);
      res.stack.unshift({ height: h, count: shifts });
      return { ...res, max: newMax };
    },
    { max: 0, stack: [] }
  );
}

function shiftBiggerHouses(stack, h, max) {
  let shifts = 1;
  let newMax = max;
  while (stack[0] && stack[0].height > h) {
    const { height, count } = stack.shift();
    newMax = Math.max(height * count, newMax);
    if (stack[0] && stack[0].height > h) {
      stack[0].count += count;
    }
    shifts = count + 1;
  }
  return { shifts, newMax };
}

console.log(
  // largestRectangle([6320, 6020, 6098, 1332, 7263, 672, 9472, 2838, 3401, 9494])
  largestRectangle([1, 2, 3, 4, 5])
  // largestRectangle([8979, 4570, 6436, 5083, 7780, 3269, 5400, 7579, 2324, 2116])
);
