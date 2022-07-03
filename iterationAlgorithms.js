/*
PAIRS
- this came up on a 109 practice problem
- need to find all pair combinations in a subarray of integers
- could also be used to pair strings together
- this is getting all pairs when parsing from left to right
- careful with iteration start and stopping condtions
  - need to stop iteration a little early since we are getting pairs (don't want to pair with undefined)
*/

function pairs(arr) {
  let results = [];
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      results.push([arr[i], arr[j]]);
    }
  }
  return results;
}

let arr = [0, 1, 2, 3, 4];

let allPairs = pairs(arr);
console.log(allPairs);