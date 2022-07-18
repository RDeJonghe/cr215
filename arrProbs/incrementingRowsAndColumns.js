/*
Incrementing Rows and Columns
Write a function that takes in three parameters: r, c, i, where:

r and c are the number of rows and columns to initialize a zero matrix.
i represents the list of incrementing operations (+1).
And returns the resulting matrix after applying all the increment operations. Each increment operation will add 1 to the rows or columns specified in the incrementing list.

The 2D matrix is 0-indexed.
The matrix created will have at least one row and one column.
All increment operations will be exactly +1.

To illustrate:

console.log(final(3, 3, ["2r", "2c", "1r", "0c"]));

# Initialize a 3 x 3 matrix of zeroes.

[
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

# Apply "2r" (increment index 2 row).

[
  [0, 0, 0],
  [0, 0, 0],
  [1, 1, 1]
]

# Apply "2c" (increment index 2 column).

[
  [0, 0, 1],
  [0, 0, 1],
  [1, 1, 2]
]

# Apply "1r" (increment index 1 row).

[
  [0, 0, 1],
  [1, 1, 2],
  [1, 1, 2]
]

# Apply "0c" (increment index 0 column).
# This is the result you should return.

[
  [1, 0, 1],
  [2, 1, 2],
  [2, 1, 2]
]


INPUT - 2 numbers and an array of strings
OUTPUT - an array of subarrays with numbers
REQUIREMENTS
- r and c are rows and columns, so how many rows and columns there should be
- array is a list of incrementing operations, so it's where all the +1 will occur
- when incremented the entire row or column is inceremented, so every element of that row/column is incremented
- matrix always has one row or one column
- everything happens by zero indexing
- all start out with a value of zero

QUESTIONS
- will given array always follow format? yes
- will numbers arguments always be integers over 0 yes
- will there always be valid columns/rows given? - yes

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- arrays/subarrays, creating a grid/matrix

APPROACHES/HIGH LEVEL
1. create a matrix and set to zero every element, do iteration over the incrementers, checking condtionally the value and then incrementing with transformation and also using transpose to handle the columns
2. similar, but not use transpose, iterate over every row and just happen to increment the correct column by index, so a double iteration to increment

ALGORITHM
- create the matrix grid all set to 0
- iterate over the array of incrementer strings
  - parse this to get a number and to get a letter
  - conditionally check the letter and call an incrementer helper method
- incrementer helper method will take the grid, the number and the letter for row or column
  - if a row, just goes through and maps that subarray row to + 1
  - if a column, transposes, maps, transposes

SUBPROBLEMS
-> create a matrix
-> transpose
-> increment(number, letter, grid)

ALGORITHM 2ND SOLUTION
- create a grid
- iterate over the the array of strings
- for each string
  - parse the string to index and indicator
- if it's a row, set the grid = mapping it
- if it's a column use for each and a nested for each and just increment that column

*/

function createGrid(row, col) {
  let results = [];
  for (let i = 1; i <= row; i += 1) {
    let subArr = [];
    for (let j = 1; j <= col; j+= 1) {
      subArr.push(0);
    }
    results.push(subArr);
  }
  return results;
}

function final(row, col, arr) {
  let grid = createGrid(row, col);
  arr.forEach(str => {
    let targetIdx = Number(str[0]);
    let indicator = str[1];

    if (indicator === 'r') {
      grid = grid.map((subArr, rowIdx) => {
        if (rowIdx === targetIdx) {
          return subArr.map(num => num += 1);
        } else {
          return subArr;
        }
      })
    } else {
      grid.forEach((subArr, rowIdx) => {
        subArr.forEach((num, colIdx) => {
          if (colIdx === targetIdx) {
            grid[rowIdx][colIdx] += 1;
          }
        })
      })
    }
  })
  return grid;
}


// console.log(final(3,3, []))

console.log(final(2, 2, ["0r", "0r", "0r", "1c"]));
// /*[
//   [3, 4],
//   [0, 1]
// ]*/

console.log(final(2, 2, ["0c"]));
// /*[
//   [1, 0],
//   [1, 0]
// ]*/

console.log(final(3, 3, ["0c", "1c", "1c", "2c", "2c", "2c"]));
// /*[
//     [1, 2, 3],
//     [1, 2, 3],
//     [1, 2, 3]
// ]*/

console.log(final(3, 3, []));
// /*[
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]
// ]*/

console.log(final(2, 3, ["0r", "0r", "0r", "1c"]));
// /*[
//   [3, 4, 3],
//   [0, 1, 0]
// ]*/


// first solution
// function createGrid(row, col) {
  //   let results = [];
  //   for (let i = 1; i <= row; i += 1) {
  //     let subArr = [];
  //     for (let j = 1; j <= col; j+= 1) {
  //       subArr.push(0);
  //     }
  //     results.push(subArr);
  //   }
  //   return results;
  // }
  
  // function transpose(arr) {
  //   let results = [];
  //   let colNum = arr[0].length;
  //   for (let i = 1; i <= colNum; i += 1) {
  //     results.push([]);
  //   }
  
  //   arr.forEach(row => {
  //     row.forEach((el, colIdx) => results[colIdx].push(el));
  //   })
  
  //   return results;
  // }
  
  // function incrementer(grid, str) {
  //   let idxNum = Number(str[0]);
  //   let letter = str[1];
  
  //   if (letter === 'r') {
  //     grid = grid.map((subArr, rowIdx) => {
  //       if (rowIdx === idxNum) {
  //         return subArr.map(num => num += 1);
  //       } else {
  //         return subArr;
  //       }
  //     })
  //   } else {
  //     grid = transpose(grid);
  //     grid = grid.map((subArr, colIdx) => {
  //       if (colIdx === idxNum) {
  //         return subArr.map(num => num += 1);
  //       } else {
  //         return subArr;
  //       }
  //     })
  //     grid = transpose(grid);
  //   }
  //   return grid;
  // }
  
  // function final(row, col, arr) {
  //   let grid = createGrid(row, col);
    
  //   arr.forEach(str => {
  //     grid = incrementer(grid, str);
  //   })
  
  //   return grid
  // }
  
  