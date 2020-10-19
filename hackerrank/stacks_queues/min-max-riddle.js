function riddle(arr) {
  const maxWindows = maxWindowsWhereNumbersAreMin(arr);
  console.log("maxWindows", maxWindows);
  const maxValues = windowsWithMaxValues(maxWindows);
  console.log("maxValues", maxValues);
  const maximums = buildMaximums(maxValues);
  return maximums;
}

function buildMaximums(maxValues) {
  const maximums = Object.entries(maxValues).reduce((m, [i, v]) => {
    m[i - 1] = v;
    return m;
  }, []);
  let current = 0;
  for (let i = maximums.length - 1; i >= 0; i--) {
    if (maximums[i]) {
      current = Math.max(current, maximums[i]);
    }
    maximums[i] = current;
  }
  return maximums;
}

function windowsWithMaxValues(maxWindows) {
  return Object.entries(maxWindows).reduce((m, [value, count]) => {
    m[count] = Math.max(m[count] || 0, value);
    return m;
  }, {});
}

function maxWindowsWhereNumbersAreMin(arr) {
  arr.push(0);
  const { maxWindows } = arr.reduce(
    (m, n) => {
      // console.log(`=== ${n} ===`);
      if (m.stack[0] && n == m.stack[0].value) {
        m.stack[0].count += 1;
        // console.log(m);
        return m;
      }
      let c = 0;
      while (m.stack[0] && m.stack[0].value > n) {
        const { value, count } = m.stack.shift();
        m.maxWindows[value] = Math.max(m.maxWindows[value] || 0, count + c);
        c += count;
      }
      m.stack.unshift({ value: n, count: c + 1 });
      // console.log(m);
      return m;
    },
    { stack: [], maxWindows: {} }
  );

  return maxWindows;
}

console.log(
  riddle([
    789168277,
    694294362,
    532144299,
    20472621,
    316665904,
    59654039,
    685958445,
    925819184,
    371690486,
    285650353,
    522515445,
    624800694,
    396417773,
    467681822,
    964079876,
    355847868,
    424895284,
    50621903,
    728094833,
    535436067,
    221600465,
    832169804,
    641711594,
    518285605,
    235027997,
    904664230,
    223080251,
    337085579,
    5125280,
    448775176,
    831453463,
    550142629,
    822686012,
    555190916,
    911857735,
    144603739,
    751265137,
    274554418,
    450666269,
    984349810,
    716998518,
    949717950,
    313190920,
    600769443,
    140712186,
    218387168,
    416515873,
    194487510,
    149671312,
    241556542,
    575727819,
    873823206,
  ])
);

// console.log(riddle([2, 6, 1, 12]), " should be ", [12, 2, 1, 1]);
// console.log(riddle([1, 2, 3, 5, 1, 13, 3]), " should be ", [
//   13,
//   3,
//   2,
//   1,
//   1,
//   1,
//   1,
// ]);
// console.log(riddle([3, 5, 4, 7, 6, 2]), " should be ", [7, 6, 4, 4, 3, 2]);
