/*

Create a function that takes a 5x5 2D array and returns true if it has at least one Bingo, and false if it doesn't.

Notes
Only check for diagnols, horizontals and verticals.

INPUT - array, square matrix
OUTPUT BOOLEAN
REQUIREMENTS - need to check if a row, column or diagonal is all "x"

ALGORTIHM
- can do a row check with every, and type of
- can build a diagonal
  - set results
  - iterate with indexes
  - access [0][0], [1][1] on each iteration and check results
  - then check if this array is all x's
- do bacwards diagonal with [0][-1], 0,-2 so the second inded is - of plus one of index

- can check columns by transposing and then using the row check
*/

function checkDiagonal(arr) {
  let forwardDiagonal = [];
  let backwardDiagonal = [];

  arr.forEach((row, idx) => {
    forwardDiagonal.push(arr[idx][idx]);
    backwardDiagonal.push(arr[idx][arr.length - (idx + 1)]);
  })
  
  let diagonals = [forwardDiagonal, backwardDiagonal];
  return diagonals.some(subArr => {
    return subArr.every(marker => marker === 'x');
  })
}

function checkRow(arr) {
  return arr.some(row => {
    return row.every(marker => marker === 'x');
  })
}

function transpose(arr) {
  let results = [];
  for (let i = 1; i <= arr[0].length; i += 1) {
    results.push([]);
  }

  arr.forEach(row => {
    row.forEach((el, idx) => results[idx].push(el));
  })
  console.log(results)
  return results;
}

function bingoCheck(arr) {
  return (
    checkRow(arr) ||
    checkRow(transpose(arr)) ||
    checkDiagonal(arr)
  );
}

console.log(bingoCheck([
  [45, "x", 31, 74, 87],
  [64, "x", 47, 32, 90],
  [37, "x", 68, 83, 54],
  [67, "x", 98, 39, 44],
  [21, "x", 24, 30, 52]
]), true);

console.log(bingoCheck([
  ["x", 43, 31, 74, 87],
  [64, "x", 47, 32, 90],
  [37, 65, "x", 83, 54],
  [67, 98, 39, "x", 44],
  [21, 59, 24, 30, "x"]
]), true);

console.log(bingoCheck([
  ["x", "x", "x", "x", "x"],
  [64, 12, 47, 32, 90],
  [37, 16, 68, 83, 54],
  [67, 19, 98, 39, 44],
  [21, 75, 24, 30, 52]
]), true);

console.log(bingoCheck([
  [45, "x", 31, 74, 87],
  [64, 78, 47, "x", 90],
  [37, "x", 68, 83, 54],
  [67, "x", 98, "x", 44],
  [21, "x", 24, 30, 52]
]), false);
