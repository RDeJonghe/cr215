/*
Diamond Shaped Array
Create a function that returns an array that expands by 1 from 1 to the value of the input, and then reduces back to 1. Items in the arrays will be the same as the length of the arrays.

INPUT - number can be odd or even
OUTPUT - array of subarrays of differing length
REQUIREMENTS
- result subarrays will always begin and end with [1]
- the number given is the "middle subarray" - will have as many elements as that number
  - it will also occupy the corresponding position in the subarray
  - so it's like a "magic" number

ALGORITHM
- set up empty results array
- set a middle = the number
- set stopping condintion -> num * 2 minus 1, this will give correct number of iterations
- set a counter = 1, this is what will be incremented to get the number we need
  - and decremented after the middle
- helper method
  - given a number (this will be the counter)
  - set up results array
  - push to results that number that number of times

*/

function arrayOfNumNumTimes(num) {
  let results = [];
  for (let i = 1; i <= num; i += 1) {
    results.push(num);
  }
  return results;
}

function diamondArrays(num) {
  let middle = num;
  let stopIteration = (num * 2) - 1;
  let insertionNum = 1;
  let results = [];

  for (let i = 1; i <= stopIteration; i += 1) {
    results.push(arrayOfNumNumTimes(insertionNum));

    if (i < middle) {
      insertionNum += 1;
    } else {
      insertionNum -= 1;
    }
  }
  return results;
}

console.log(diamondArrays(1)); //➞ [[1]]

console.log(diamondArrays(2)); //➞ [[1], [2, 2], [1]]

console.log(diamondArrays(5)); //➞ [[1], [2, 2], [3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5, 5], [4, 4, 4, 4], [3, 3, 3], [2, 2], [1]]

console.log(diamondArrays(6)); //➞ [[1], [2, 2], [3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5, 5], [6,6,6,6,6,6], [5,5,5,5,5] [4, 4, 4, 4], [3, 3, 3], [2, 2], [1]]