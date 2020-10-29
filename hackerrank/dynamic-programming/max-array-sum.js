function maxSubsetSum(arr) {
  console.log(arr);
  if (!arr.length) return 0
  if (arr.length == 1) return Math.max(arr[0], 0)
  const max = []
  max[0] = Math.max(arr[0], 0)
  max[1] = Math.max(arr[1], max[0])
  for (let i = 2; i < arr.length; i++) {
    console.log(`=== ${arr[i]} ===`);
    console.log('max:', max);
    max[i] = Math.max(max[i - 1], arr[i] + max[i - 2])
    console.log('newMax:', max);
  }
  return max[max.length - 1]
}
