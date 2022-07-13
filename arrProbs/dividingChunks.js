/*
Write a function that divides an array into chunks such that the sum of each chunk is <= n. Start from the left side of the array and move to the right.

The max of the array will always be smaller than or equal to n.
Use the greedy approach when solving the problem (e.g. fit as many elements you can into a chunk as long as you satisfy the sum constraint).

INPUT - array of integers and a target number
OUTPUT - array with subarrays of chunked integers
REQUIREMENTS
- key concept is 'chunking'
- divide array into chunks (subarrays) so that each chunk is less than or equal to the target number
  - subarrays sum can be equal or less
  - use greedy approach, and fit as many elements in as possible
- max of array is always smaller than or equal to n
  - no elements in array greater than target

DATA STRUCTURE - array and subarray (subarray is key, what and how is added is the crux of problem)

HIGH LEVEL ITERATION
- check if the current number when added to the sum of the current subarray is greater than the target number
  - if it's not just push it to the current subarray
  - if it is greater reset current subarray to an empty array
  - increment current subarry index to 1
  - push the current element to there

ALGORITHM
- set up a results array to handle the subarrays
- set up a first subarray set it with the first element insided it
  - by definition no elemnts are greater thant he given target num
- set current subarray index to 0
- iterate over each index of the array to access the numbers starting at the first element
- test if when added to the sum of the current subarray
  - if the total is less than the target number
    - just push to the current subarray index of results
  - otherwise
    - push an empty array to results
    - increment the subarray index
    - push this number in that made the total greater, it's the first element in the next chunk

SUBPROBLEMS
-> sum a subarray
*/

function divide(arr, targetNum) {
  if (arr.length === 0) return [];
  let results = [];
  let firstElement = arr[0];
  let firstSubArray = [firstElement];
  results.push(firstSubArray);
  let currentSubArrIdx = 0;

  for (let idx = 1; idx < arr.length; idx += 1) {
    let currentSubArr = results[currentSubArrIdx];
    let currentEl = arr[idx];

    if (totalLessWhenAddedToChunk(currentSubArr, currentEl, targetNum)) {
      results[currentSubArrIdx].push(currentEl);
    } else {
      results.push([]);
      currentSubArrIdx += 1;
      results[currentSubArrIdx].push(currentEl);
    }
  }
  return results;
}

function totalLessWhenAddedToChunk(subArr, currentEl, targetNum) {
  return sumSubArr(subArr) + currentEl <= targetNum;
}

function sumSubArr(subArr) {
  return subArr.reduce((total, num) => total + num, 0);
}



console.log(divide([1, 2, 3, 4, 1, 0, 2, 2], 5));
// [[1, 2], [3], [4, 1, 0], [2, 2]]

console.log(divide([1, 0, 1, 1, -1, 0, 0], 1));
// // [[1, 0], [1], [1, -1, 0, 0]]

console.log(divide([2, 1, 0, -1, 0, 0, 2, 1, 3], 3));
// // [[2, 1, 0, -1, 0, 0], [2, 1], [3]]

console.log(divide([2], 3)); // [[2]]

console.log(divide([], 3)); // []

// no combination taking place (chunking)
console.log(divide([2, 2, 2], 3)); // [[2], [2], [2]]