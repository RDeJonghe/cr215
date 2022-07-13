/*
Split the List into Groups of Consecutive Numbers

The function is given two parameters: an array of integers and the group’s length. Determine if it is possible to split all numbers from the array into groups of the specified length such that there are consecutive numbers in each group, return true / false.

INPUT - array of integers and a group length
OUTPUT - boolean
REQUIREMENTS
- need to put all the numbers in groups so that the have the group length and all numbers are consecutive

DATA STRUCTURES
- intermediate data structures
[5, 6, 3, 4] -> [3,4,5,6]
-> [[3,4], [5,6]]

[1, 2, 3, 6, 2, 3, 4, 7, 8] -> [1,2,2,3,3,4,6,7,8]
-> [1,2,3], [2,3,4], [6,7,8]

[1, 3, 4, 5]
-> [1], [3,4], [5]

ALGORITHM
- make copy and sort
- need to take those numbers and then remove from consideration
  - this is difficult because it removes something while iterating
  - this changes the length of the array which can change iteration
- set a results array
- set a iteration for the n number of times
  - call a create consecSubArr method
  - send this to results
  - iterate over this also and remvoe those elements from consideration
- this will give results with consec subarrays
  - just need to test the length, and also the length of the subarrays, these should match the target

- create consecSubArr
  - given an array, and a number
  - set a results array this is the subarr that will go with outer method
  - put the first element in there
  - while the length is less than the number
  - iterate over the rest and add them into the array only if they are one more than the last element in that array


*/

function createConsecSubArr(arr, target) {
  let results = [arr[0]];

  for (let i = 1; i < arr.length; i += 1) {
    let lastNum = results[results.length - 1];
    let currentNum = arr[i];
    if (currentNum - lastNum === 1) {
      results.push(currentNum);
    }
    if (results.length === 3) return results;
  }
  return results;
}

function deleteUsedNumbers(subArr, arrCopy) {
  subArr.forEach(numToDelete => {
    let indexToDelete = arrCopy.findIndex(arrNum => {
      return arrNum === numToDelete;
    })
    arrCopy.splice(indexToDelete, 1);
  })
}

function consecutiveNums(arr, target) {
  if (target === 1) return true;
  if (arr.length % target !== 0) return false;
  let arrCopy = [...arr];

  let results = [];

  for (let counter = 1; counter <= target; counter += 1) {
    let subArr = createConsecSubArr(arrCopy, target);
    results.push(subArr);
    deleteUsedNumbers(subArr, arrCopy);
  }
  
  return (
    results.length === target &&
    results.every(subArr => subArr.length === target)
  );
}

console.log(consecutiveNums([1, 3, 5], 1), true); // true
// // It is always possible to create groups of length 1.

console.log(consecutiveNums([5, 6, 3, 4], 2), true); // true
// // Two groups of length 2: [3, 4], [5, 6]

console.log(consecutiveNums([1, 3, 4, 5], 2), false); // false
// // It is possible to make one group of length 2, but not a second one.

console.log(consecutiveNums([1, 2, 3, 6, 2, 3, 4, 7, 8], 3), true); // true
// // [1, 2, 3], [2, 3, 4], [6, 7, 8]

console.log(consecutiveNums([1, 2, 3, 4, 5], 4), false); // false
// // The list length is not divisible by the group’s length.

