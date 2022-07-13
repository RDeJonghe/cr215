/* 7:31 7:41
Given an array, write a function to calculate it's depth. Assume that a normal array has a depth of 1.

INPUT - array, can have nested arrays
OUTPUT - number
REQUIREMENTS
- have to find depth of array
- normal array is a depth of one
  - one nested array in there would be a depth of 2
  - each deeper nesting adds a depth of 1

QUESTIONS
- arrays won't have multiple nesting [[1,2], [3,4]]? No

DATA STRUCTURES - arrays

SUBPROBLEMS
- has a subarray
  - returns boolean
  - iterates over all elements and checks if there is an array present

ALGORITHMS
- can check to see if any of the elements is an array
  - this could be used in a loop or to tell when done
  - can also handle the case of no nesting right away
- set a counter to 1 - 1 represents the normal depth
- while has an array
  - set the array to flat with a depth of one
  - increment the counter
- return the counter


*/

function hasArrayElement(topLevelArr) {
  return topLevelArr.some(el => Array.isArray(el));
}

function depth(arr) {
  let counter = 1;
  while (hasArrayElement(arr)) {
    arr = arr.flat();
    counter += 1;
  }
  return counter;
}


console.log(depth([])); // 1 empty array still has depth of one

console.log(depth([1, 2, 3, 4])); // 1

console.log(depth([1, [2, 3, 4]])); // 2

console.log(depth([1, [2, [3, 4]]])); // 3

console.log(depth([1, [2, [3, [4]]]])); // 4