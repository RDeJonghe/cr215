/* 12:53 1:29
Create a function that returns the lowest neighbor of a given (x, y) coordinate element in a 2D array. The function will be passed three parameters.

 arr,  x,  y
arr will be a 2D array holding integer values and will always be symmetrical in size (e.g. 2x2, 3x3, 4x4).
x will hold the row coordinate, while y will hold the column coordinate.
You will have to check the horizontal, vertical and diagonal neighbor elements. If there isn't any lower neighbors, return the value of the given (x, y) coordinate.

INPUT - array
OUTPUT - number
REQUIREMENTS
- need to find the lowest "neighbor" of a coordinate (x, y) in an array
- coordinate is a specific element identified in the array
- array is always a square
- x is row and y is column
- need to consider all neighbors including diagonal
- find the lowest one, return that value
- if there isn't one, just return the x,y value given
- coordinates are zero indexed

QUESTIONS
- do we ahve to work with Infinity, NaN? No.

DATA STRUCTURES - array

SUB PROBLEM
-> find all neighbors of a coordinate
- set up a row variable and a column variable
- set up a rows array and a columns array to hold possibilities
  - so row - 1, row, row + 1, column - 1, column, column + 1
- set up a results array
  - iterate over the rows and access that row
    - if it's undefined do nothing
    - if it's accessible also access the column and push to results
  - this will give an array of all of those values, including original
  - some undefined values may go over, these are okay, we won't need these
    - sort it in ascending order, undefined will be at the end,
    - or just map for typeof is number to remove

ALGORITHM
- handle edge case of empty array
- need to find all of the neighboors of the coordinate
  - helper method, return an array
- of these in the array find the smallest


*/

function neighborsForCoordinate(arr, x, y) {
  let rows = [arr[x - 1], arr[x], arr[x + 1]];
  let columnsIdx = [y - 1, y, y + 1];
  let results = [];


  rows.forEach(row => {
    if (row) {
      columnsIdx.forEach(idx => {
        if (row[idx]) {
          results.push(row[idx]);
        }
      })
    }
  })
  return results;
}

function lowestElement(arr, x, y) {
  if (arr.length === 0) return null;
  let neighbors = neighborsForCoordinate(arr, x, y);
  return Math.min(...neighbors);
}

console.log(lowestElement([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], 1, 1), 1); // ➞ 1

/*
[
  [1, 2, 3]
  [4, 5, 6]  // (1, 1) holds the integer 5. Check the surrounding neighbors.
  [7, 8, 9]
]
*/

console.log(lowestElement([
  [9, 8, 7],
  [0, -1, -3],
  [-5, -9, 54]
], 0, 0), -1); //➞ -1

/*
[
  [9, 8, 7]   // (0, 0) holds the integer 9. Check the surrounding neighbors.
  [0, -1, -3]
  [-5, -9, 54]
]
*/

// edge case, coordinate is the lowest
console.log(lowestElement([
  [1, 20, 30],
  [40, 50, 60],
  [70, 80, 90]
], 0, 0), 1); // ➞ 1

// edge case coordinate is a tie
console.log(lowestElement([
  [1, 1, 30],
  [40, 50, 60],
  [70, 80, 90]
], 0, 0), 1); // ➞ 1

// edge case multiple lowest with same value tie
console.log(lowestElement([
  [1, 1, 3],
  [1, 5, 6],
  [7, 8, 9]
], 1, 1), 1); // ➞ 1

// edge case smaller grid
console.log(lowestElement([
  [1, 2],
  [4, 5]
], 1, 1), 1); // ➞ 1

// edge case larger grid
console.log(lowestElement([
  [1, 2, 3, 98],
  [4, 5, 6, 99],
  [7, 8, 9, 10],
  [11, 12, 13, 14]
], 3, 1), 7); // ➞ 7

// edge case decimals
console.log(lowestElement([
  [1.7, 2.2, 3.9],
  [4.8, 5.2, 6.8],
  [7.2, 8.3, 9.9]
], 1, 1), 1.7); // ➞ 1.7

// edge case empty array
console.log(lowestElement([]), null); // null

// edge cases smallest grid possible, returns itself
console.log(lowestElement([[99]], 0, 0), 99); // 99

// edge case all same number
console.log(lowestElement([
  [1, 1],
  [1, 1]
], 1, 1), 1); // ➞ 1

// edge case, last coordinate
console.log(lowestElement([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
], 2, 2), 5); // ➞ 5