function flippingBits(N) {
  const flipped = N ^ (Math.pow(2, 32) - 1);
  return flipped < 0 ? flipped + Math.pow(2, 32) : flipped;
}

console.log(flippingBits(4294967295), "should be 0");
