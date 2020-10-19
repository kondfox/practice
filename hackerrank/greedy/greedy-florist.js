'use strict';

function getMinimumCost(k, c) {
  let cost = 0;
  c.sort((a, b) => a - b);
  let buyCounter = 0;
  let prevBuys = 0;
  while (c.length) {
      console.log(c);
      if (c.length > k) {
          for (let i = c.length - 1; i > c.length - k - 1; i--) {
              cost += c[i] * (1 + prevBuys);
          }
          prevBuys++;
          c = c.slice(0, c.length - k);
      } else {
          for (let i = 0; i < c.length; i++) {
              cost += c[i] * (1 + prevBuys);
          }
          c = [];
      }
  }
  return cost;
}

function buy(k, flowers, prevBuys) {
  let cost = 0;
  for (let i = 0; i < Math.min(k, flowers.length); i++) {
      cost += (prevBuys + 1) * flowers[i];
  }
  return cost;
}

function firstBuy(k, c) {
  let cost = 0;
  for (let i = c.length - 1; i > c.length - k - 1; i--) {
      cost += c[i];
  }
  return cost;
}


const c1 = [390225,426456,688267,800389,990107,439248,240638,15991,874479,568754,729927,980985,132244,488186,5037,721765,251885,28458,23710,281490,30935,897665,768945,337228,533277,959855,927447,941485,24242,684459,312855,716170,512600,608266,779912,950103,211756,665028,642996,262173,789020,932421,390745,433434,350262,463568,668809,305781,815771,550800];
console.log(getMinimumCost(3, c1), 'should be 163578911');