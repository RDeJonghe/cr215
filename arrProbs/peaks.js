/* 12:07 1:09
Write a function that returns the positions and the values of the "peaks" of a numeric array.
For example, the array [0, 1, 2, 5, 1, 0] has a peak at position 3 with a value of 5. 
Therefore the return value should be { pos: [3], peak: [5] }

INPUT - array of numbers
OUTPUT - objcet, with values of arrays of numbers (indexes and actual values form array)
REQUIREMENTS
- need to find the "peaks" of numeric array
  - "peak" is high point in the array, so there is incrementation up to it
  - there can be more than one peak
- the position is just the index value for that peak
- for plateaus count as a peak, return first index
- not all numbers have to be consecutive, they don't have to follow a linear path, they can jump up or down
- "peak" -> any place where an number is greater than the previous number and the following number is equal to it or less than it
  - if a peak is followed by all the same numbers then it's not a peak
    - have to identify this
  - and it has to have at least one number after it less than it
  - it can have numbers after it that are equal, but somewhere after it it also has to have a number less than it

QUESTIONS
- peak is a single value that is greater than the values next to it (high point)
- plateaus are not peaks since they are not a high point [1,2,2,1] 2 is not a peak it's a plateau
- do we have to hanlde sparse arrays, arrays with custom properties or frozen arrays?
- empty array, no string numbers ('1')
- negative numbers? or decimal numbers?

DATA STRUCTURES - arrays

SUBPROBLEMS
-> isAPeak - element, index, array itself
  - first half (every thing previous to the index)
  - second half (everything after it)
  - do a compariosn between the current element and values before and after it
    - [empty arrays] for first and last chars

ALGORITHM
- set up results object with key/val pairs
- handle edge case of empty array
- hanlde edge cases where all elements are the same (if necessary)
- iterate over the array of numbers, consider index track it
  - on each iteration we want to test if its a peak or not
  - helper method isAPeak will return a boolean
    - value itself will be sent, the portion of the array after that index
      - slice the array from the index + 1 -> that will give the helper the trailing poriton of. the array
      - send portion of the array previous to it
      - we can do a comparsion
  - if true, send to corresponding key arrays the index and the value


SUBPROBLEMS
-> isAPeak - element, index, array itself
  - first half just take previous value (if index is 0 handle that, no value)
    - test to see if the current value is greater
  - second half (everything after it)
  - do a compariosn between the current element and values after it
    - we need to check that the array contains
      - the next number HAS to be equal or less than the current
      - AND at least one element after that has to be less than it (in a consecutive way)
        - check number by number
          - find one number consecutively that is less than the peak/plateua number
            - if a number is greater before this is found FAIL IT


*/

function pickPeaks(arr) {
  let results = {pos: [], peaks: []};
  if (arr.length === 0) return results;

  arr.forEach((num, idx) => {
    if (isAPeak(num, idx, arr)) {
      results['pos'].push(idx);
      results['peaks'].push(num);
    }
  })
  return results;
}

function greaterThanPrevious(previousNum, num) {
  if (previousNum === undefined) return false;

  return num > previousNum;
}

function hasSmallerNumberAfter(num, arr) {
  if (arr === []) return false;

  for (let i = 0; i < arr.length; i += 1) {
    if (i === 0 && arr[i] > num) return false;

    let compareNumber;

    if (arr[i - 1] === undefined) {
      compareNumber = num;
    } else {
      compareNumber = arr[i - 1]
    }

    if (arr[i] > compareNumber) return false;
    if (arr[i] < compareNumber) return true;
  }
  return false;
}

function isAPeak(num, idx, arr) {
  let previousNum = arr[idx - 1];
  let secondHalf = arr.slice(idx + 1);

  return greaterThanPrevious(previousNum, num) && hasSmallerNumberAfter(num, secondHalf);
  
}


// // general case
console.log(pickPeaks([1,2,3,6,4,1,2,3,2,1])); //  { pos: [3,7], peaks: [6,3] }

// // plateau 
console.log(pickPeaks([1,2,3,6,4,1,2,3,3,1])); //  { pos: [3,7], peaks: [6,3] }

// // no mountain
console.log(pickPeaks([1,1,1,1,1])); // { pos: [], peaks: [] }

// // really high plateau
console.log(pickPeaks([9,9,9,9,9])) // { pos: [], peaks: [] }

// // empty array
console.log(pickPeaks([])) // { pos: [], peaks: [] }

// // negative numbers
console.log(pickPeaks([-3, -1, -2])); //  { pos: [1], peaks: [-1] }

// negative number plateau
console.log(pickPeaks([-3, -1, -1, -2])); //  { pos: [1], peaks: [-1] }

// // not peaks, can't tell
console.log(pickPeaks([9,9,9,9,10])) // { pos: [], peaks: [] }
console.log(pickPeaks([10,9,9,9,9])) // { pos: [], peaks: [] }
