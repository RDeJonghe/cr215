/* 6:43 7:01
Given a 2D array of some suspended blocks (represented as hastags), return another 2D array which shows the end result once gravity is switched on.

Each block falls individually, meaning there are no rigid objects. Think about it like falling sand in Minecraft as opposed to the rigid blocks in Tetris.

INPUT - array of arrays, elements are strings in subarray
OUTPUT - a similarly nested array, elements change though
REQUIREMENTS
- arrays have blocks (# is a block)
- gravity gets turned on and the blocks fall
  - each block falls as far as it can (not ridgid), each block is independent
- result is where blocks end up

EXAMPLES EDGE CASES

DATA STRUCTURES - arrays

SUBPROBLEMS
- transpose
  - set up a results array
  - iterate over as many indexes as elements in first subarray
  - push that many [] subArrays
- iterate over each subarray in main array
  - iterate over each index
  - push to result subarray of that index the current element

ALGORITHM
- given the array of subarrays
- transpose so that the columns become rows
  - this will make each column accessible individually
- sort the columns so the "-" comes before "#"
  - "-" has a char Code of 45, "#" has 35
  - so sort in descending order
- transpose this back to original
*/

function transpose(arr) {
  let results = [];
  let numElementsSubArr = arr[0].length;
  for (let i = 1; i <= numElementsSubArr; i += 1) {
    results.push([])
  };
  arr.forEach(subArr => {
    subArr.forEach((el, idx) => {
      results[idx].push(el);
    })
  })
  return results;
}

function byBlock(a, b) {
  let aCode = a.charCodeAt();
  let bCode = b.charCodeAt();

  if (aCode < bCode) {
    return 1;
  }
  if (aCode > bCode) {
    return -1;
  }
  return 0;
}

function switchGravityOn(arr) {
  let transposedArr = transpose(arr);
  transposedArr.map(subArr => subArr.sort(byBlock));
  let gravityOn = transpose(transposedArr);
  return gravityOn;
}

// console.log(transpose(
//   [
//     ["-", "#", "#", "-"],
//     ["-", "-", "-", "-"],
//     ["-", "-", "-", "-"],
//     ["-", "-", "-", "-"]
//   ]
// ))

console.log(switchGravityOn([
  ["-", "#", "#", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"]
])); 
/*
➞ [
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "#", "#", "-"]
]
*/

console.log(switchGravityOn([
  ["-", "#", "#", "-"],
  ["-", "-", "#", "-"],
  ["-", "-", "-", "-"],
])); 
/*➞ [
  ["-", "-", "-", "-"],
  ["-", "-", "#", "-"],
  ["-", "#", "#", "-"]
]
*/

console.log(switchGravityOn([
  ["-", "#", "#", "#", "#", "-"],
  ["#", "-", "-", "#", "#", "-"],
  ["-", "#", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-"]
])); 
/*➞ [
  ["-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-"],
  ["-", "#", "-", "#", "#", "-"],
  ["#", "#", "#", "#", "#", "-"]
]
*/

// no blocks
console.log(switchGravityOn([
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"]
])); 

// all blocks
console.log(switchGravityOn([
  ["#", "#", "#"],
  ["#", "#", "#"]
]));