/* 7:46 7:53

Write a function that moves all the zeroes to the end of an array. Do this without returning a copy of the input array.

Notes
You must mutate the original array.
Keep the relative order of the non-zero elements the same.

INPUT - array
OUTPUT - array reordered
REQUIREMENTS
- need to move the zeros to end
  - have to mutate, no copies
- other elements don't change places

SUB PROBLEMS

ALGORITHMS
- do a custom sort and give each 0 a value that is high
- every other value gets the same value, say 1 that way they don't change spots since sort is stable
*/

function zeroValueEnd(a, b) {
  let aVal;
  let bVal;
  if (a === 0) {
    aVal = 0;
  } else {
    aVal = 1;
  }

  if (b === 0) {
    bVal = 0;
  } else {
    bVal = 1;
  }

  if (aVal < bVal) {
    return 1;
  }
  if (aVal > bVal) {
    return -1
  }
  return 0;
}

function zeroesToEnd(arr) {
  return arr.sort(zeroValueEnd);
}

console.log(zeroesToEnd([1, 2, 0, 0, 4, 0, 5]), [1, 2, 4, 5, 0, 0, 0]);

console.log(zeroesToEnd([0, 0, 2, 0, 5]), [2, 5, 0, 0, 0]);

console.log(zeroesToEnd([0, 0, -2, 0, -5]), [-2, -5, 0, 0, 0]);

console.log(zeroesToEnd([4, 4, 5]), [4, 4, 5]);

console.log(zeroesToEnd([0, 0]), [0, 0]);