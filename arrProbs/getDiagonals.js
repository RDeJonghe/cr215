/*
PROBLEM DESCRIPTION
- return just the diagonals of a square matrix
- matrix will always be square
- matrix subarrays will may consist of primitives or other objects
  - the subarrays will be of consistent data type design, will not be a mix of data types
  - so a single matrix will store consistent data / not a mix- result array will be two subarrays of each diagonal
- result array will be two subarrays of each diagonal
  - diagonal starting at top left should be listed first
  - diagonal starting at top left should be listed in order of elements from top left to bottom right
  - diagonal starting at bottom left should have its elments listed from bottom left to top right

- example:
let matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

getDiagonals(matrix1) => returns [[1, 5, 9], [7, 5, 3]]

OWN PRACTICE PROBLEM - get just the diagonals in a square matrix
- matrix will always be square
- result array will be two subarrays of each diagonal
  - diagonal starting at top left should be listed first
  - diagonal starting at top left should be listed in order of elements from top left to bottom right
  - diagonal starting at bottom left should have its elments listed from bottom left to top right

INPUT - a matrix
OUTPUT - an array with two subarrays which hold the elements that make up each diagonal. Diagonal starting from top level and going to bottom right is the first element in the result array

REQUIREMENTS
- given a square matrix
- find the diagonals of the matrix
- diagonals need to be listed in a certain order

DATA STRUCTURES - arrays

SUBPROBLEMS
-> find diagonal
- determine length of array, this will be used for iteration (it's a square)
- set up results array
- iterate over the index numbers
- for each number just grab [idx][idx] from the matrix, it's incrementing [0][0], [1][1], etc.
- return this

ALGORITHM
- handle edge cases for empty and single element, return null
- set up results array
- need to find a diagonal given a matrix (subproblem)
  - need to also find the bottom diagonal, can reverse, so just send in to helper reversed
- send to results the return of this helper method
*/

function findSingleDiagonal(matrix) {
  let results = [];
  let idxLimit = matrix.length;
  for (let idx = 0; idx < idxLimit; idx += 1) {
    results.push(matrix[idx][idx]);
  }
  return results;
}

function getDiagonals(matrix) {
  if (matrix.length <= 1) return null;

  let topLeftDiagonal = findSingleDiagonal(matrix);
  let bottomLeftDiagonal = findSingleDiagonal([...matrix].reverse());

  return [topLeftDiagonal, bottomLeftDiagonal];
}



let matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(getDiagonals(matrix1), [[1, 5, 9], [7, 5, 3]]);

let matrix2 = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['g', 'h', 'i']
];
console.log(getDiagonals(matrix2), [['a', 'e', 'i'], ['g', 'e', 'c']]);

// empty array given return null
console.log(getDiagonals([]), null);

// single element no diagonals
console.log(getDiagonals([[1]]), null);

// small matrix
let matrix3 = [
  [1, 2],
  [3, 4]
];
console.log(getDiagonals(matrix3), [[1, 4], [3, 2]]);

// all same element
let matrix4 = [
  [1,1,1],
  [1,1,1],
  [1,1,1]
];
console.log(getDiagonals(matrix4), [[1,1,1], [1,1,1]]);

// large matrix
let matrix5 = [
  [1,2,3,4,5,6],
  [1,2,3,4,5,6],
  [1,2,3,4,5,6],
  [1,2,3,4,5,6],
  [1,2,3,4,5,6],
  [1,2,3,4,5,6],
];
console.log(getDiagonals(matrix5), [[1,2,3,4,5,6], [1,2,3,4,5,6]]);

// matrix with subarrays
let matrix6 = [
  [[1,9], [2, 8]],
  [[3, 7], [4, 6]]
];
console.log(getDiagonals(matrix6), [[[1, 9], [4, 6]], [[3, 7], [2, 8]]])