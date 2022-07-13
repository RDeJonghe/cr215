/* 8:01 8:10
Puzzle Pieces
Write a function that takes two arrays and adds the first element in the first array with the first element in the second array, the second element in the first array with the second element in the second array, etc, etc. Return true if all element combinations add up to the same number. Otherwise, return false.

Notes
Each array will have at least one element.
Return false if both arrays are of different length.

INPUT - array of integers
OUTPUT - boolean
REQUIREMENTS
- need to add corresponding elements together and save all the results of the addition
- if all of the results are the same number then return true, otherwise return false

SUBPROBLEMS

ALGORITHM
- handle edge case of empty arrays and different length
- iterate over one array with map and index
  - just return the result of adding current el with current el from other array
- this will give an array of sums
- target val is first element
- check if every val is equal to that

*/

function puzzlePieces(arr1, arr2) {
  if (arr1.length === 0 || arr2.length === 0) return null;
  if (arr1.length !== arr2.length) return false;

  let sums = arr1.map((num, idx) => {
    return num + arr2[idx];
  })
  let targetNum = sums[0];
  return sums.every(num => targetNum === num);
}

console.log(puzzlePieces([1, 2, 3, 4], [4, 3, 2, 1]), true);
// 1 + 4 = 5;  2 + 3 = 5;  3 + 2 = 5;  4 + 1 = 5
// Both arrays sum to [5, 5, 5, 5]

console.log(puzzlePieces([1, 8, 5, 0, -1, 7], [0, -7, -4, 1, 2, -6]), true);

// failing case
console.log(puzzlePieces([1, 2], [-1, -1]), false);

// arrays of different lengths
console.log(puzzlePieces([9, 8, 7], [7, 8, 9, 10]), false);

// decimal numbers
console.log(puzzlePieces([1.5, 2, 1.6], [1.5, 1, 9, 1.4]), true); // all add to 3

// exact same numbers in arrays true
console.log(puzzlePieces([1, 1, 1, 1], [1, 1, 1, 1]), true);

// empty arrays null
console.log(puzzlePieces([], []), null);