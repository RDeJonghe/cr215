/* 4:50 5:12
Given a grid of numbers, return a grid of the Spotlight Sum of each number. The spotlight sum can be defined as the total of all numbers immediately surrounding the number on the grid, including the number in the total.

Note that all numbers have a spotlight sum, including numbers on the edges.
All inputs will be valid grid (all rows will have the same length).

INPUT - grid of numbers (array), all rows have same length
OUTPUT - also a grid of numbers, but values changed
REQUIREMENTS
- find the spotlight sum of each number
- spotlight sum is just the sum of all numbers surrounding it, including itself and diagonals

EXAMPLES/EDGE CASES

DATA STRUCTURES - arrays

SUBPROBLEMS
-> find all neighbors (array of numbers)
- take this array and return the sum

ALGORTIHM
- handle edge case of empty array
- iterate over the given array with map
  - we want to transform the subarray
- iterate over every element in the subarray with map
  - we need the coordinates (it's row and column to do this)
  - this will also be transformed and returned
  - both will return a new array, both will give that return value
- on each iteration over the element return a helper method
  - helper method is for all neigbors and to sum these
- after iteration we will have the correct transformed elements

*/

function neighborsSum(arr, rowIdx, colIdx) {
  let rows = [arr[rowIdx - 1], arr[rowIdx], arr[rowIdx + 1]];
  let columnIdxs = [colIdx - 1, colIdx, colIdx + 1];
  let results = [];

  rows.forEach(row => {
    if (row) {
      columnIdxs.forEach(idx => results.push(row[idx]));
    }
  })
  results = results.filter(num => num !== undefined);
  return results.reduce((total, num) => total + num, 0);
}


function spotlightMap(arr) {
  if (arr.length === 0) return [];

  return arr.map((subArr, rowIdx) => {
    return subArr.map((_, colIdx) => {
      return neighborsSum(arr, rowIdx, colIdx);
    })
  })
}

// let grid = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]

console.log(spotlightMap([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]));
/*[
  [12, 21, 16],
  [27, 45, 33],
  [24, 39, 28]
]*/

console.log(spotlightMap([
  [2, 6, 1, 3, 7],
  [8, 5, 9, 4, 0]
]));
// /*[
//   [21, 31, 28, 24, 14],
//   [21, 31, 28, 24, 14]
// ]*/

// // single num in subarray
console.log(spotlightMap([[3]])); // [[3]]

// // emtpy array
console.log(spotlightMap([])); // []

// // negative numbers
console.log(spotlightMap([
  [-1, -2, -3],
  [-4, -5, -6],
  [-7, -8, -9]
]))

// /*[ these are all negative for this result
//   [12, 21, 16],
//   [27, 45, 33],
//   [24, 39, 28]
// ]*/

// // decimal numbers
console.log(spotlightMap([
  [1.1, 2.1],
  [3.1, 4.1]
]));

// /*[
//   [10.4, 10.4],
//   [10.4, 10.4]
// ]*/
