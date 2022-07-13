/*
Create a function which converts an ordered number array into a array of ranges (represented as strings). Note how some arrays have some numbers missing.

If there are no numbers consecutive to a number in the array, represent it as only the string version of that number (see example #4).
Return an empty array if the given array is empty.

INPUT - array of numbers
OUTPUT - array of strings
REQUIREMENTS
- need to create an array of ranges as strings
- range is consecutive numbers so consecutive numbers are represented by beginning num and end num with a dash
- have to handle stand alone numbers not in ranges, those are represented as is
- numbers in the range are always in asc order
- empty array if empty

QUESTIONS
- decimal numbers - no
- negative numbers - yes
- sparse, custom, frozen - no

DATA STRUCTURES - array

ALGORITHM
- take array of numbers and iterate over it separating out these into an appropriate range
  - overall strategy is to set an empty results array and set subarrays as needed to store single numbers or ranges. After the subarrays are filled, these can be converted into ranges
  - the appropriate numbers will end up in the subarray
- set empty results array (should handle edge case naturally)
- set a current subarray index to zero
- set subArr equal to having the first element in it
- iterate over the given array starting at the first number
  - if this number is exactly one greater than the previous number
    - send it to the current subarray using the current subarray index
    - this just means it's the next consec number
  - if it's not
    - set the subarray back to empty
    - increment the subarray index by one
    - send this number to the subarray using the new index
    - it's the start of a new range or a standalone
- after this data structure is complete its just transformation
  - iterate over every subarray
  - if length is one just convert to string
  - else take first and last num from subarray and concat together with dash

SUBPROBLEMS

*/

function numbersToRanges(arr) {
  if (arr.length === 0) return [];
  let results = [];
  let firstElement = arr[0]
  let currentSubArr = [firstElement];
  results.push(currentSubArr);
  let currentSubArrIdx = 0;

  for (let idx = 1; idx < arr.length; idx += 1) {
    let currentElement = arr[idx];
    let previousElement = arr[idx - 1];

    if (currentElement - previousElement === 1) {
      results[currentSubArrIdx].push(currentElement);
    } else {
      currentSubArr = [];
      currentSubArrIdx += 1;
      results.push(currentSubArr);
      results[currentSubArrIdx].push(currentElement)
    }
  }
  return results.map(subArr => makeRange(subArr));
}

function makeRange(arr) {
  if (arr.length === 1) {
    return String(arr[0]);
  }
  else {
    return String(arr[0]) + '-' + String(arr[arr.length - 1]);
  }
}

// stand alone number and range
console.log(numbersToRanges([1, 3, 4, 5, 6, 7, 8])); // ["1", "3-8"]

// // standard one range
console.log(numbersToRanges([3, 4, 5, 6, 7, 8])); // ["3-8"]

// // standard two ranges
console.log(numbersToRanges([3, 4, 5, 6, 7, 8, 10, 11, 12])); // ["3-8", "10-12"]

// // stand alone only
console.log(numbersToRanges([3, 5, 7])); // ["3", "5", "7"]

// // negative numbers
console.log(numbersToRanges([-9, -8, -7])); // ["-9--7"]

// // single num
console.log(numbersToRanges([3])); // ["3"]

// // empty array
console.log(numbersToRanges([])); // []

console.log(numbersToRanges([1, 2, 3, 4, 5])); // ["1-5"]

console.log(numbersToRanges([3, 4, 5, 10, 11, 12])); // ["3-5", "10-12"]

console.log(numbersToRanges([1, 2, 3, 4, 99, 100])); // ["1-4", "99-100"]
