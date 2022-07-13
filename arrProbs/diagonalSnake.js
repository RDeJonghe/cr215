/* 10:10

The function is given a rectangular array of arrays of numbers. Make an array from these numbers in the order of connecting diagonals like a snake before the strike. Starting from the left-up corner:

First diagonal, going up: [0][0]
Second diagonal, going down: [0][1] -> [1][0]
Third diagonal, going up: [2][0] -> [1][1] -> [0][2]
etc, alternate between going up and going down
Last diagonal: [rows - 1][cols -1]


INPUT - an array with subarrays (is rectangular all rows same length)
OUTPUT - a single level array of the elements (numbers given)
REQUIREMENTS
- need to create a "snake" and capture elements that form the "snake"
- always start from top left corner
- do a diagonal snake pattern
- need to alternate by going up and down
- snake pattern moves
  - take start,
  - move one right
  - go one below start (this is diagonal) and take it
  - move straight down and take it
  - when in bottom row move up right one diagonal take it
  - move up right one diagonla take it now in top row
  - move down one take it
  - move down left one take it
  - move bottom right one take it finish

DATA STRUCTURES - clearly arrays

ALGORITHM

-> HIGH LEVEL
- the snake will follow the pattern as far as it can and then move direction until it ends up at the end
- another way to look at it is getting diagonals interspersed with direction changes
- take top left alwyas to start
- take a diagonal starting from there going back to edge of array in down left orientation
- so after the start, it's really just alternating diagonals
- we could have a get diagonal helper method to pull a diagonal
  - it would need a start row and column and a limit row and column
  - it could then get all of the possibilites that are on that diagonal until it hits the limit
- may need one for each diagonal direction up/down
  - that way could pay attention to order

SUBPROBLEMS
*/



// console.log('', diagonalSnake([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]), [1, 2, 4, 7, 5, 3, 6, 8, 9]);

// console.log('', diagonalSnake([[3], [2]]), [3, 2]);

// console.log('', diagonalSnake([[9]]), [9]);

// console.log('', diagonalSnake([]), []);

// console.log('', diagonalSnake([[9, 8, 7]]), [9, 8, 7]);

// console.log('', diagonalSnake([
//   [13, 5, 0, 9, 17], 
//   [30, 28, 2, 30, 7], 
//   [26, 6, 15, 19, 10]]), [13, 5, 30, 26, 28, 0, 9, 2, 6, 15, 30, 17, 7, 19, 10])


  // Test.assertSimilar(diagonalSnake([
  //   [36, 18, 23, 32, 41, 50], 
  //   [40, 108, 33, 1, 105, 46], 
  //   [18, 36, 23, 7, 5, 39], 
  //   [105, 31, 30, 30, 38, 40], 
  //   [29, 4, 57, 14, 91, 75], 
  //   [71, 84, 69, 72, 35, 5], 
  //   [24, 44, 8, 21, 46, 9], 
  //   [67, 11, 20, 57, 8, 55], 
  //   [17, 8, 88, 53, 67, 62]]), 

  // 0,0    0,1 1,0,    2,0 1,1, 0,2,     0,3, 1,2, 2,1, 3,0

  /*
  down diagonal
  - rows increment, columns decrement
  - until columns are zero

  up diagonal
  - rows decrement, columns increment
  - until rows are zero

  given a limit for row and column

  */
  

 function downDiagonal(arr, row, column) {
  const COLUMN_LIMIT = 0
  let results = [];
  while (column >= COLUMN_LIMIT) {
    results.push(arr[row][column]);
    row += 1;
    column -= 1;
  }
  return results;
}

function downDiagonalEnding(arr, row, column) {
  const COLUMN_LIMIT = 0
  let results = [];
  while (column >= COLUMN_LIMIT) {
    results.push(arr[row][column]);
    row += 1;
    column -= 1;
  }
  return [row, column + 1];
}

function upDiagonal(arr, row, column) {
  const ROW_LIMIT = 0
  let results = [];
  while (row >= ROW_LIMIT) {
    results.push(arr[row][column]);
    row -= 1;
    column += 1;
  }
  return results;
}

function upDiagonalEnding(arr, row, column) {
  const ROW_LIMIT = 0
  let results = [];
  while (row >= ROW_LIMIT) {
    results.push(arr[row][column]);
    row -= 1;
    column += 1;
  }
  return [row + 1, column];
}

let bigArr = [
[ 36,  18,  23,  32,  41,  50], 
[ 40, 108,  33,   1, 105,  46], 
[ 18,  36,  23,   7,   5,  39], 
[105,  31,  30,  30,  38,  40], 
[ 29,   4,  57,  14,  91,  75], 
[ 71,  84,  69,  72,  35,   5], 
[ 24,  44,   8,  21,  46,   9], 
[ 67,  11,  20,  57,   8,  55], 
[ 17,   8,  88,  53,  67,  62]
];

// 0,0 8,5
// while row <= 8 while column <= 5
// up diagonal then down diagonal feeding in row and column

// starting points
// 0,0 - 0,1 - 2,0 - 0,3 - 4,0 - 0,5, - 6,0 - 2,5 -- 8,0

// console.log(downDiagonalEnding(bigArr, 0, 3))

function diagonals(arr) {
let row = 0;
let column = 0;
let rowLimit = arr.length - 1;
let columnLimit = arr[0].length - 1;
console.log(columnLimit)
console.log(rowLimit)
let results = [];

while (row !== rowLimit && column !== columnLimit) {
  results = results.concat(upDiagonal(arr, row, column));
  let newUpStart = upDiagonalEnding(arr, row, column);
  row = newUpStart[0];
  column = newUpStart[1];

  results = results.concat(downDiagonal(arr, row, column));
  let newDownStart = downDiagonalEnding(arr, row, column);
  row = newDownStart[0];
  column = newDownStart[1];
}
console.log(`${row} is row and ${column} is column`)
return results;
}

console.log(diagonals(bigArr))


//[36, 18, 40, 18, 108, 23, 32, 33, 36, 105, 29, 31, 23, 1, 41, 50, 105, 7, 30, 4, 71, 24, 84, 57, 30, 5, 46, 39, 38, 14, 69, 44, 67, 17, 11, 8, 72, 91, 40, 75, 35, 21, 20, 8, 88, 57, 46, 5, 9, 8, 53, 67, 55, 62])