/*
Given a 2D array of mines, replace the question mark with the number of mines that immediately surround it. This includes the diagonals, meaning it is possible for it to be surrounded by 8 mines maximum.

The key is as follows:

An empty space: "-"
A mine: "#"
Number showing number of mines surrounding it: "?"


You will only be given 3x3 grids.
The question mark is not limited to the centre (there may be multiple question marks).

INPUT - always 3X3 array
OUTPUT - similar array but altered 
REQUIREMENTS
- need to find the question mark
- and then need to replace the question mark with the number of mines that suround it
  - so it's neigbors
- mines are #, empty spaces are - and target is ?
- there can be multiple question marks

QUESTIONS
- always 3x3 grid
- all elments are the strings as defined
- empty subarrays no
- empty outer array

ALGORITHM
- handle empty array
- have a find neighbors helper method
  - this will return a count of all the neigbors that === #
- map the given array and subarrays - need to trakc index
  - just return normal elment when it's not a ?
  - when it is a question mark return the helper method for neighbors count


SUBPROBLEMS
-> find neighbors
*/

function minesweeper(arr) {
  if (arr.length === 0) return null;
  return arr.map((subArr, rowIdx) => {
    return subArr.map((square, colIdx) => {
      if (square === '?') {
        return neighbors(arr, rowIdx, colIdx);
      } else {
        return square;
      }
    })
  })
}

function neighbors(arr, x, y) {
  let rows = [arr[x - 1], arr[x], arr[x + 1]];
  let colIdxs = [y - 1, y, y + 1];
  let results = [];

  rows.forEach(row => {
    if (row) {
      colIdxs.forEach(idx => results.push(row[idx]));
    }
  })
  results = results.filter(neighbor => neighbor === "#");
  return results.length;
}



console.log(minesweeper([
  ["-", "#", "-"],
  ["-", "?", "-"],
  ["-", "-", "-"]
]));

// [
//   ["-", "#", "-"],
//   ["-", "1", "-"],
//   ["-", "-", "-"]
// ]

console.log(minesweeper([
  ["-", "#", "-"],
  ["#", "-", "?"],
  ["#", "#", "-"]
]));

// [
//   ["-", "#", "-"],
//   ["#", "-", "2"],
//   ["#", "#", "-"]
// ]

console.log(minesweeper([
  ["-", "#", "#"],
  ["?", "#", ""],
  ["#", "?", "-"]
]));

// [
//   ["-", "#", "#"],
//   ["3", "#", ""],
//   ["#", "2", "-"]
// ]

console.log(minesweeper([
  ["-", "-", "#"],
  ["?", "-", "-"],
  ["-", "-", "-"]
]));

// [
//   ["-", "-", "#"],
//   ["0", "-", "-"],
//   ["-", "-", "-"]
// ]

// four corners
console.log(minesweeper([
  ["?", "#", "?"],
  ["#", "#", "#"],
  ["?", "#", "?"]
]));

// [
//   ["3", "#", "3"],
//   ["#", "#", "#"],
//   ["3", "#", "3"]
// ]


console.log(minesweeper([])); // null