/* 7:16 7:44
Write a function that pairs the first number in an array with the last, the second number with the second to last, etc.

Examples

Notes
If the array has an odd length, repeat the middle element twice for the last pair.
Return an empty array if the input is an empty array.

INPUT - array of numbers
OUTPUT - an array with subarrays
REQUIREMENTS
- need to pair the first number with the last number of the array, these go in a subarray (first subarray) in the order first/last
- then move inward and take second number and second to last number and these go in a subarray in results, this is the second subarray
- this continues until the middle is reached
- for an even length array the middle is two elements next to each other and they get taken in the same fashion
- the middle appears at the end of results
- for an odd element array the middle number is taken twice and put in a subarray

QUESTIONS
- will array always contain integer/numbers?

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- taking the array and splitting it in two and accessing each half
  - we'd have to deal with odd and even lengths but its a good way to visualize the problem
  - odd
  [1, 2, 3, 4, 5, 6, 7]
  [1, 2, 3] [5,6 7] (4 is taken into account)
  [5,6,7]
  - removed item (odd one out) is just doubled and added at the end
  - reverse the second array and then indexes align for pairing
  - even
  [1, 2, 3, 4, 5, 6] -> [1,2,3] [4,5,6] ([6,5,4])

ALGORITHM
- handle edge case of empty array
- call helper method to get two halves
  - [firstHalf, secondHalf], set variables equal to this
- set up an empty results array
- iterate over the first half with index
  - send to results in a subarray elements from 1st and 2nd based off of index
- return results


SUBPROBLEMS
-> split the array in 2
- if the array length is odd
  - identify the middle char this is key / index
  - Math.floor (length / 2)
  - save this element for later
  - slice from 0 to target index (first half)
  - slice from targetIndex + 1
  - push into each of these data structures the saved middle element
  - return [firstHalf, secondHalf]
- else (array even)
  - middle length / 2
  - just slice the same and return the same
*/

function twoHalves(arr) {
  let middleIdx = Math.floor(arr.length / 2);;
  let middleEl = arr[middleIdx];
  let firstHalf = arr.slice(0, middleIdx);
  let secondHalf = arr.slice(middleIdx + 1);
  secondHalf.reverse();

  if (arr.length % 2 === 1) {
    middleIdx = 
    ;

    firstHalf.push(middleEl);
    secondHalf.push(middleEl);
  } else {
    middleIdx = arr.length / 2;
    firstHalf = arr.slice(0, middleIdx);
    secondHalf = arr.slice(middleIdx);
    secondHalf.reverse();
  }

  return [firstHalf, secondHalf];
}

function pairs(arr) {
  if (arr.length === 0) return [];

  let halves = twoHalves(arr);
  let firstHalf = halves[0];
  let secondHalf = halves[1];
  let results = [];

  firstHalf.forEach((el, idx) => {
    results.push([el, secondHalf[idx]]);
  })

  return results;
}

// twoHalves([1, 2, 3, 4, 5, 6])

// // odd length 4 twice
// console.log(pairs([1, 2, 3, 4, 5, 6, 7]), [[1, 7], [2, 6], [3, 5], [4, 4]]);

// // even length case
// console.log(pairs([1, 2, 3, 4, 5, 6]), [[1, 6], [2, 5], [3, 4]]);

// // odd length
// console.log(pairs([5, 9, 8, 1, 2]), [[5, 2], [9, 1], [8, 8]]);

// // empty array
// console.log(pairs([]), []);

// // length of 1 
// console.log(pairs([1]), [[1, 1]]);

// // length of 2
console.log(pairs([1,2]), [[1,2]]);

/*

*/