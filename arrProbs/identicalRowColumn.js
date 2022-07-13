/*
Identical Row and Column?
Write a function that returns true if there exists a row that is identical to a column in a 2-D matrix, otherwise false.

Notes
Non-square matrices should return false.

To illustrate:

[
  [1, 2, 3, 4],
  [2, 4, 9, 8],
  [5, 9, 7, 7],
  [6, 8, 1, 0]
]

2nd row + 2nd column are identical: [2, 4, 9, 8]

INPUT - an array with subarrays
OUTPUT - boolean
REQUIREMENTS
- anticipating a square matrix
  - if not square return false (edge case)
- if there is a row that is identical to a column return true
  - there can be multiple instances of this or a single, both return true
  - if not any of these return false

QUESTIONS
- don't have to worry about NaN, Infinity,
- don't have to handle sparse arrays, frozen arrays, arrays with custom properties
- other primitives like strings
- we can anticpate that all arrays will contains the same data type (subarray)
- not anticipating objects in the subarrays (compare objects)

DATA STRUCTURES
- arrays

SUBPROBLEMS
-> helper method for bad input (if necessary)

-> transposing an array
  - set up a results array
    - find the length of one of the rows
    - send to results this many subarrays (data structure needed)
  - iterate over the given array
  - nested iteration over each element accessing the index
    - send that element to the subarray matching that index


-> arrayIncludesObject(deepCompare)



ALGORTIHM
- handle the edge case for an empty array
- handle the edge case for a non square (if necessary)

HIGHER LEVEL
- need to do a comparison between subarrays
  - we need to see if a row is equal to a column
- take the given array and transpose it (converts rows into columns)
  - our edge case of non square, will likely this
- two arrays one of rows, one of columns
- need to determine if any of the rows are equal to the columns
- iterate over the rows
- check to see if the columns includes that row (deepCompare)
  - if it does just return true
- at the end of iteration return false

*/

function transpose(arr) {
  let results = [];
  let subArrNum = arr[0].length;
  for (let i = 1; i <= subArrNum; i += 1) {
    results.push([]);
  }
  
  arr.forEach(subArr => {
    subArr.forEach((el, idx) => {
      results[idx].push(el);
    })
  })
  return results;
}

function deepCompare(o1, o2) {
  if (o1 === o2) return true;
  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
  if (Object.keys(o1).length !== Object.keys(o2).length) return false;

  let keys = Object.keys(o1);
  return keys.every(key => {
    return deepCompare(o1[key], o2[key]);
  })
}

function arrayIncludesObject(arr, obj) {
  return arr.some(el => deepCompare(el, obj));
}

function hasIdentical(arr) {
  if (arr.length === 0) return null;
  let transposed = transpose(arr);

  return arr.some(subArr => arrayIncludesObject(transposed, subArr));
  
}

// let sample = [
//   [4, 4, 4, 4],
//   [2, 4, 9, 8],
//   [5, 4, 7, 7],
//   [6, 4, 1, 0]
// ];



console.log(hasIdentical([
  [4, 4, 4, 4],
  [2, 4, 9, 8],
  [5, 4, 7, 7],
  [6, 4, 1, 0]
]), true)



console.log(hasIdentical([
  [4, 4, 9, 4],
  [2, 1, 9, 8],
  [5, 4, 7, 7],
  [6, 4, 1, 0]
]), false)

console.log(hasIdentical([
  [4, 4],
  [2, 1]
]), false)

console.log(hasIdentical([
  [4, 2],
  [2, 1]
]), true)

// multiple instances of true characteristics
console.log(hasIdentical([
  [4, 4, 4, 4],
  [2, 4, 9, 4],
  [4, 4, 4, 4],
  [6, 4, 1, 4]
]), true)

// edge case of a non square
console.log(hasIdentical([
  [4, 4, 4, 4],
  [2, 4, 9, 4],
  [4, 4, 4, 4]
]), false);

// edge case of a single row/column, row/column the same
console.log(hasIdentical([
  [4]
]), true)

// edge case of empty array
console.log(hasIdentical([]), null);

// diagonal returns false
console.log(hasIdentical([
  [4, 4, 4, 4],
  [2, 4, 9, 8],
  [5, 9, 4, 7],
  [6, 3, 1, 4]
]), false);

// negative numbers
console.log(hasIdentical([
  [-4, -2],
  [-2, 1]
]), true)

// decimals
console.log(hasIdentical([
  [4.7, 2.3],
  [2.3, 1]
]), true);

// example with other primitives (strings)
console.log(hasIdentical([
  ['a', 'b'],
  ['b', 'z']
]), true)

console.log(hasIdentical([
  ['a', 'b'],
  ['n', 'z']
]), false)
