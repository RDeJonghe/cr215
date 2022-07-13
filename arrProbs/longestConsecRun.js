/* 3:14 3:39
A consecutive-run is a list of adjacent, consecutive integers. This list can be either increasing or decreasing. Create a function that takes an array of numbers and returns the length of the longest consecutive-run.

If there aren't any consecutive runs (there is a gap between each integer), return 1.

INPUT - array of numbers
OUTPUT - number
REQUIREMENTS
- consecutive - numbers have to be next to each other and need to be the next incremental number
- can go up or down, what is important is that they are condsecutive
- 

QUESTIONS
- will inputs always be whole numbers - yes
- negative numbers - handle negatives
- consecutive - can go up or down
- two longest, just return the length doesn't matter if more than one

DATA STRUCTURES - array

ALGORITHM
- handle edge cases
- data in question is consecutive
- so can take all subarrays of consecutive numbers
  - helper method
- with this array of subarrays can now perform selection
- all numbers consecutive (helper)
- this will give all of the candidates
- map to the length
- if array is empty return 1
- choose the longest length from this array

SUBPROBLEMS
-> all subarrays of consectutive numbers, expand index from start upwards
-> all numbers consecutive greater also need a smaller can check with or
  - given an array iterate over each number starting with second number
  - check that this number is exactly one greater than the previous number
    - if not break iteration and return false
  - if at end of iteration return true
  - do same for a smaller but just check that it's exactly one smaller
*/

function allNumsConsecLarger(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] - arr[i - 1] !== 1) return false;
  }
  return true;
}

function allNumsConsecSmaller(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] - arr[i - 1] !== -1) return false;
  }
  return true;
}

function isConsecutive(arr) {
  return allNumsConsecLarger(arr) || allNumsConsecSmaller(arr);
}

function consecSubArrs(arr) {
  let results = [];
  for (let idx = 0; idx < arr.length; idx += 1) {
    for (let secIdx = idx + 1; secIdx <= arr.length; secIdx += 1) {
      results.push(arr.slice(idx, secIdx));
    }
  }
  return results;
}

function longestRun(arr) {
  if (arr.length === 0) return 0;

  let numberGroups = consecSubArrs(arr);
  let consecNumberGroups = numberGroups.filter(subArr => {
    return isConsecutive(subArr);
  })
  let consecLengths = consecNumberGroups.map(group => group.length);

  return Math.max(...consecLengths);
}



console.log(longestRun([1, 2, 3, 5, 6, 7, 8, 9]), 5);
// // Two consecutive runs: [1, 2, 3] and [5, 6, 7, 8, 9] (longest).

// // negative numbers
console.log(longestRun([-1, -2, -3, -5, -6, -7, -8, -9]), 5);
// // Two consecutive runs: [-1, -2, -3] and [-5, -6, -7, -8, -9] (longest).

// // empty array
console.log(longestRun([]), 0); // 0

// // increase and decrease in same, just takes longest
console.log(longestRun([10,9,8,1,11,12,13,14,15]), 5)

// // decrease is now longest
console.log(longestRun([10,9,8,7,6,12,13,14,15]), 5)

// // one element array
console.log(longestRun([10]), 1);

// // all same number - no consec return 1
console.log(longestRun([1,1,1,1,1]), 1);

// // all different - no consec return 1
console.log(longestRun([1,5,11,51,19]), 1);

// // given by problem

console.log(longestRun([1, 2, 3, 10, 11, 15]), 3);
// // Longest consecutive-run: [1, 2, 3].

console.log(longestRun([5, 4, 2, 1]), 2);
// // Longest consecutive-run: [5, 4] and [2, 1].

console.log(longestRun([3, 5, 7, 10, 15]), 1);
// // No consecutive runs, so we return 1.