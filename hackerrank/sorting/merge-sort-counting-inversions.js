'use strict'

function countInversions(arr) {
  let sumInversions = 0;
  let arrsToMerge = arr.map(e => [e]);
  
  while (arrsToMerge.length > 1) {
    let nextArrsToMerge = [];
    for (let i = 0; i < arrsToMerge.length; i += 2) {
      const {mergedArr, inversions} = merge(arrsToMerge[i], arrsToMerge[i + 1]);
      nextArrsToMerge.push(mergedArr);
      sumInversions += inversions;
    }
    arrsToMerge = nextArrsToMerge;
  }
  return sumInversions;
}

function merge(arr1, arr2) {
  let mergeParams = {
    mergedArr: [],
    inversions: 0,
  };

  if (arr2 == undefined) {
    mergeParams.mergedArr = arr1;
    return mergeParams;
  }

  for (let i = 0, j = 0; i < arr1.length || j < arr2.length;) {
    if (i == arr1.length) {
      mergeParams.mergedArr.push(arr2[j++]);
    } else if (j == arr2.length || arr1[i] <= arr2[j]) {
      mergeParams.mergedArr.push(arr1[i++]);
    } else {
      mergeParams.mergedArr.push(arr2[j++]);
      mergeParams.inversions += arr1.length - i;
    }
  }

  return mergeParams;
}

console.log(countInversions([1, 1, 1, 2, 2]), ' should be 0');
console.log(countInversions([2, 1, 3, 1, 2]), ' should be 4');
console.log(countInversions([3, 2, 1]), ' should be 3');
console.log(countInversions([7, 5, 3, 1]), ' should be 6');
