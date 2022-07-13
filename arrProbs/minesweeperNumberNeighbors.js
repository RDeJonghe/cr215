/*
Minesweeper Number of Neighbouring Mines
Create a function that takes an array representation of a Minesweeper board, and returns another board where the value of each cell is the amount of its neighbouring mines.

The 0 represents an empty space . The 1 represents a mine.

You will have to replace each mine with a 9 and each empty space with the number of adjacent mines, the output will look like this:

Since in the output the numbers 0-8 are used to determine the amount of adjacent mines, the number 9 will be used to identify the mines instead.
A wikipedia page explaining how Minesweeper works is available in the Resources tab.
*/

function neighborsMineCount(arr, x, y) {
  let rows = [arr[x - 1], arr[x], arr[x + 1]];
  let colIdxs = [y - 1, y, y + 1];
  let results = [];

  rows.forEach(row => {
    if (row) {
      colIdxs.forEach(idx => results.push(row[idx]));
    }
  })
  results = results.filter(el => el !== undefined);
  return results.reduce((total, num) => {
    if (num === 1) {
      return total + num;
    } else {
      return total;
    }
  }, 0);
}

function mineCounts(grid) {
  return grid.map((subarr, rowidx) => {
    return subarr.map((space, colIdx) => {
      if (space === 1) {
        return 9;
      } else {
        return neighborsMineCount(grid, rowidx, colIdx);
      }
    })
  })
}


let grid = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
];

console.log(mineCounts(grid))

/*
[
  [1, 9, 2, 1],
  [2, 3, 9, 2],
  [3, 9, 4, 9],
  [9, 9, 3, 1],
]
*/