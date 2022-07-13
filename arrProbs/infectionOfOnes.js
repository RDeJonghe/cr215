/* 4:45 5:08
Write a function that replaces every row and column that contains at least one 1 into a row/column that is filled entirely with 1s.

Examples

Notes
You must mutate the original array.
Input matrices will have at least row and one column.

INPUT - array matrix, square
OUTPUT - modified array

REQUIREMENTS
- if any row or colum contains a 1, that row or column must be filled entirely with ones

QUESTIONS
- is a square matrix - yes

DATA STRUCTURES - array

ALGORITHM
- set up row indices array
- need to find the indices of all the ones
- iterate over all of the rows
  - if any of the rows contains a one send that index to the results

- set up column indexes array
  - iterate over each element tracking index
  - if that element is a 1 send the index to the colum indexes array

- iterate over the row indices array
  - reference the arr[row] and just fill with ones, they are all ones

- iterate over every element tracking index
  - if the column indices array includes that index
  - reassign that element to 1
SUBPROBLEMS

*/

function rowIndices(arr) {
  let results = [];
  arr.forEach((subArr, idx) => {
    if (subArr.includes(1)) results.push(idx);
  })
  return results;
}

function columnIndices(arr) {
  let results = [];
  arr.forEach(subArr => {
    subArr.forEach((num, colIdx) => {
      if (num === 1) results.push(colIdx);
    })
  })
  return results;
}

// let sample = [
//   [1, 0, 1],
//   [0, 0, 1],
//   [0, 0, 0]
// ]

// console.log(columnIndices(sample))

function onesInfection(arr) {
  let rowIdxs = rowIndices(arr);
  let colIdxs = columnIndices(arr);

  rowIdxs.forEach(rowIdx => {
    arr[rowIdx].fill(1);
  })

  arr.forEach((row, rowIdx) => {
    row.forEach((_, colIdx) => {
      if (colIdxs.includes(colIdx)) arr[rowIdx][colIdx] = 1;
    })
  })

  return arr;
}

console.log(onesInfection([
  [0, 0, 1],
  [0, 0, 0],
  [0, 0, 0]
]));
//  [
//   [1, 1, 1],
//   [0, 0, 1],
//   [0, 0, 1]
// ]

// no ones, same array will be returned
console.log(onesInfection([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]));

// all ones same array will be returned
console.log(onesInfection([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
]));

// single will return same
console.log(onesInfection([
  [1]
]));
// will return same
console.log(onesInfection([
  [0]
]));

// will return all ones since every row has a one
console.log(onesInfection([
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0]
]));

// will return all ones since every column has a one
console.log(onesInfection([
  [1, 1, 1],
  [0, 0, 0],
  [0, 0, 0]
]));

// middle will return a plus sign
console.log(onesInfection([
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]));


console.log(onesInfection([
  [1, 0, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]
]));
//  [
//   [1, 1, 1, 1],
//   [1, 1, 1, 1],
//   [1, 1, 1, 0]
// ]

console.log(onesInfection([
  [0, 1, 0, 1],
  [0, 0, 0, 0],
  [0, 1, 0, 0]
]));
//  [
//   [1, 1, 1, 1],
//   [0, 1, 0, 1],
//   [1, 1, 1, 1]
// ]

