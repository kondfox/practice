'use strict'

//              0                                   if i == 0 || j == 0
// LCC[i, j] =  1 + LCC[i-1][j-1]                   if s1[i] == s2[j]
//              Math.max(LCC[i][j-1], LCC[i-1][j])  if s1[i] != s2[j]

function commonChild(s1, s2) {
  const [rs1, rs2] = reduceStringsToCommonChars(s1, s2);
  const LCC = longestCommonChildMatrix(rs1, rs2);
  return LCC[rs1.length][rs2.length];
}

function reduceStringsToCommonChars(s1, s2) {
  const s2s = new Set(s2);
  const cc = new Set([...new Set(s1)].filter(s => s2s.has(s)));
  const rs1 = [...s1].filter(s => cc.has(s));
  const rs2 = [...s2].filter(s => cc.has(s));
  return [rs1, rs2];
}

function initializeMatrix(l, m) {
  return new Array(l + 1).fill(0).map(e => new Array(m + 1).fill(0));
}

function longestCommonChildMatrix(s1, s2) {
  const l = s1.length;
  const m = s2.length;
  const LCC = initializeMatrix(l, m);
  
  for (let i = 0; i <= l; i++) {
    for (let j = 0; j <= m; j++) {
      if (i == 0 || j == 0) continue;
      if (s1[i - 1] == s2[j - 1]) {
        LCC[i][j] = 1 + LCC[i - 1][j - 1];
      } else {
        LCC[i][j] = Math.max(LCC[i][j - 1], LCC[i - 1][j]);
      }
    }
  }
  return LCC;
}

console.log(commonChild('WEWOUCUIDGCGTRMEZEPXZFEJWISRSBBSYXAYDFEJJDLEBVHHKS', 'FDAGCXGKCTKWNECHMRXZWMLRYUCOCZHJRRJBOAJOQJZZVUYXIC'), 'should be 15');
console.log(commonChild('SHINCHAN', 'NOHARAAA'), 'should be 3');
console.log(commonChild('OUDFRMYMAW', 'AWHYFCCMQX'), 'should be 2');
