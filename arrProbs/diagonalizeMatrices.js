/* 3:17 3:50

Write a function that diagonally orders numbers in a n x n matrix, depending on which of the four corners you originate from: upper-left (ul), upper-right (ur), lower-left (ll), lower-right (lr).

INPUT - an integer and a string indicating start position
OUTPUT - an array of arrays / square matrix
REQUIREMENTS
- will start in a particular corner indicated by ul, ur, ll, lr
- numbers span out from this starting point in different directions
- always starts with 0
  - rows, columns increment by 1
  - diagonal increments by 2
- first arg is size of matrix
  - so number of rows and columns 

- for ul and ur
  - these are just reversed of each other
- for ll and lr
  - also a reverse relationship

- if ul is the standard (most apparent numbering)
  -> ur is map reverse

  -> lr is just reverse

  -> lr is reverse map reverse

- so where to start the count and fill these?

EXAMPLES/EDGE CASES
- matrix of 0, matrix of 1
- bad input

DATA STRUCTURE
- array

SUBPROBLEMS
-> creating the standard array
  - need to set up the nested data structure
  - set a number counter to 0
  - set an index counter to 0 to track the subarray
    - while less than the given number
  - set a nested iteration to the same count number, this is for every element
    - push into the subarray the number counter
  - on outer iteration each time reset the number counter to itself minus one number smaller than itself
  - this will increment


-> reversing based off of starting point
  -> ur is map reverse
  -> lr is just reverse
  -> lr is reverse map reverse


ALGORITHM
- handle edge cases for bad input / small grid if necessary
- set an empty result for outer array
- push here the number given of empty arrays, this will give the structure

*/ 

function standardArr(num) {
  let results = [];
  for (let i = 1; i <= num; i += 1) {
    results.push([]);
  }
  
  let numberIncrementer = 0;
  for (let subArrIdx = 0; subArrIdx < num; subArrIdx += 1) {
    for (let elIdx = 0; elIdx < num; elIdx += 1) {
      results[subArrIdx].push(numberIncrementer);
      numberIncrementer += 1;
    }
    numberIncrementer = subArrIdx + 1;
  }
  return results;
}

function reorganizeStandard(arr, position) {
  if (position === "ul") return arr;
  if (position === "ur") return arr.map(subArr => subArr.reverse());
  if (position === "ll") return arr.reverse();
  if (position === "lr") return arr.reverse().map(subArr => subArr.reverse());
}

function diagonalize(num, start) {
  if (num === 0) return [];
  if (num < 0) return null;
  let standard = standardArr(num);
  let diagonalized = reorganizeStandard(standard, start);
  return diagonalized;
}

console.log(diagonalize(3, "ul"));
/*
[
  [0, 1, 2],
  [1, 2, 3],
  [2, 3, 4]
]
*/

console.log(diagonalize(4, "ur"));
/*
[
  [3, 2, 1, 0],
  [4, 3, 2, 1],
  [5, 4, 3, 2],
  [6, 5, 4, 3]
]
*/

console.log(diagonalize(3, "ll"));
/*
[
  [2, 3, 4],
  [1, 2, 3],
  [0, 1, 2]
]
*/

console.log(diagonalize(5, "lr"));
/*
[
  [8, 7, 6, 5, 4],
  [7, 6, 5, 4, 3],
  [6, 5, 4, 3, 2],
  [5, 4, 3, 2, 1],
  [4, 3, 2, 1, 0]
]
*/

// edge case for small matrix
console.log(diagonalize(0, "lr")); // []
// console.log(diagonalize(1, "lr")) // [[0]]

// edge case for bad INPUT
console.log(diagonalize(-3, "lr")); // null 

