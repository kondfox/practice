function alternatingCharacters(s) {
  const alternatings = s.match(/A{2,}|B{2,}/g);
  if (alternatings == null) return 0;
  return alternatings.reduce((sum, e) => sum + e.length - 1, 0);
}

console.log(alternatingCharacters('AAAA'), ' should be 3');
console.log(alternatingCharacters('BBBBB'), ' should be 4');
console.log(alternatingCharacters('ABABABAB'), ' should be 0');
console.log(alternatingCharacters('BABABA'), ' should be 0');
console.log(alternatingCharacters('AAABBB'), ' should be 4');
