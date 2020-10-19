'use strict';

function sherlockAndAnagrams(s) {
  let substrings = {};
  let anagramCount = 0;

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      const sub = s.substring(i, j).split('').sort((a, b) => a.localeCompare(b)).join('');
      
      if (substrings[sub]) {
        anagramCount += substrings[sub]++;
      } else {
        substrings[sub] = 1;
      }
    }
  }
  return anagramCount;
}

const s = 'kkkk';
console.log(sherlockAndAnagrams(s));

