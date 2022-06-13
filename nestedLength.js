/*
The .length property on an array will return the number of elements in the array. For example, the array below contains 2 elements:

[1, [2, 3]]
// 2 elements, number 1 and array [2, 3]
Suppose we instead wanted to know the total number of non-nested items in the nested array. In the above case, [1, [2, 3]] contains 3 non-nested items, 1, 2 and 3.

Write a function that returns the total number of non-nested items in a nested array.

An empty array should return 0.

INPUT - an array with nested arrays
OUTPUT - number
REQUIREMENTS
- have to count the number of elements (not nested) in array
- nested arrays don't count but the actual elements inside do
- if array is empty return 0
- arrays only contain other arrays or integers

EXAMPLES/EDGE CASES
- empty array

SUBPROBLEMS
-> test if an array contains another array
  - iterate over every elements
  - if the current element is an array return true
  - after iteration return false

ALGORITHM
- need to test if an array contains another array (subproblem)
- can set up a loop, while the array contains another array
- reassign the array to the flat version of itself
- iteration will break when there are no subarrays and the conditional tests to false
- this flattens it one at a time until no more left
- just find the length of this array

*/

function hasArrayAsElement(arr) {
  for (let element of arr) {
    if (Array.isArray(element)) {
      return true;
    }
  }
  return false;
}

function getLength(arr) {
  while (hasArrayAsElement(arr)) {
    arr = arr.flat();
  }
  return arr.length;
}

console.log(getLength([1, [2,3]]) === 3);
console.log(getLength([1, [2, [3, 4]]]) === 4)
console.log(getLength([1, [2, [3, [4, [5, 6]]]]]) === 6);
console.log(getLength([1, 7, 8]) === 3);
console.log(getLength([2]) === 1);
console.log(getLength([2, [3], 4, [7]]) === 4);
console.log(getLength([2, [3, [5, 7]], 4, [7]]) === 6);
console.log(getLength([2, [3, [4, [5]]], [9]]) === 5);
console.log(getLength([]) === 0);