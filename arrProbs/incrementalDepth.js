/* 5:28 5:41
Create a function that can nest a flat array to represent an incremental depth level sequence.

The elements do not matter to the function, you should increment by index.
Expect the array length to be from 2-20.

INPUT - array
OUTPUT - nested array

REQUIREMENTS
- need to nest each element, nesting continues in depth
- increment from by the index

ALGORITHM
- find the length of the array - 1, this is how many subarrays you need to make
- set up a results array with the last element in it
- start a loop up to the target subarray number
  - set a current subarr = [currentIdx [results]]
  - set results to this
  - each time new index will be added in

  - set a counter = length of array - 2 (last element starts in results)
  - break counter at 0 (0 element)
  - set results to [last element]
  - start the loop
  - set a currentSubarr = [currentiDx[results]]
  - set results equal to this
  - after iteration all elements should be in it

*/

function incrementalDepth(arr) {
  let counter = arr.length - 2;
  let results = [arr[arr.length - 1]];
  for (let i = counter; i >= 0; i -= 1) {
    let currentSubArr = [arr[i], results];
    results = currentSubArr;
  }
  return results;
}


console.log(incrementalDepth([1, 2])); // [1, [2]]

console.log(incrementalDepth([1, 2, 3, 4, 5])); // [1, [2, [3, [4, [5]]]]]

console.log(incrementalDepth([1, 3, 2, 6])); // [1, [3, [2, [6]]]]

console.log(incrementalDepth(["dog", "cat", "cow"])); // ["dog", ["cat", ["cow"]]]

