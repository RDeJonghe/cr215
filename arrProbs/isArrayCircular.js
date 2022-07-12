/* 10:13
is the Array Circular?
Write a function that determines if an array is circular. An array is circular if its subarrays can be reordered such that each subarray's last element is equal to the next subarray's first element.

For example, the array [[1, 1, 1], [9, 2, 3, 4], [4, 1], [1, 2, 5, 7, 9]] is circular because we can re-arrange the elements to create the following array:

[[9, 2, 3, 4], [4, 1], [1, 1, 1], [1, 2, 5, 7, 9]]

Notes
In a circular re-ordering, the last subarray's last element must be identical to the first subarray's first element.
Subarrays will contain at least one element.

INPUT - an array of subarrays
OUTPUT - boolean
REQUIREMENTS
- array has to be "circular"
  - circular if each subarray's last element is equal to the next subarrays first element
  - there has to be a relationship between the last element of a subarray, and the first element of the next subarray - these have to be equal
- subarrays will contain at least one element
  - this isn't really circular because there's no relationship

QUESTIONS
- empty array?
- are all elments in the subarrays primitives? - yes
- are all elements in subarrays positive numbers - no
  - strings, negative numbers

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- arrays
- an array with the different possibilities of ordering subarrays
  - have to consider all posibilites of reording
[[9, 8], [6, 9, 1], [8, 4, 2], [1, 9], [2, 1, 6]]
[9,8  691, 842, 216, 19]
[9,8 691 216 842...]
- each row would represent a unique reording of the elements (elemnts just happen to be subarrays)

ALGORITHM
- handle edge case of empty array or one element array - return false
- build a data structure (array) of all combinations of elements
  - so each row in the data structure would represnet a unique ordering of these elements
- perform selection on this, checking to see if the row is "circular"
  - alternative - check with some - check that at least one row is "circular"
    - it will return the boolean we need
  - circular is a helper mehtod that checks the relationship between elements in consec arrays

[9, 8], [6, 9, 1], [8, 4, 2], [1, ,99], [2, 1, 6]

- take all the first and last numbers from each subarray and store these in a data structure
  - except from the very first and very last subarray - those only get last and first, 
- [9, 8, 6, 1, 8, 2, 1, 9, 2, 6]
- []
[3,1 1,1 ,2,2, 6,6, 8,8, 8 4]
- all of these need a corresponding pair, except for one number - have a partner that also wouldn't correspond - so 2 individual numbers don't have to match
- the idea is to split this into a represenation of the original groups
- then you could do a good analysis of the comparison betweeen first and alst elements
- always sizes of 2

- take all the first and last
- sort these
- find the total length / 2 -> this is the number of pairs
- set up an object, count each number as the key set it's value to the count
- get the values array for this
  - check every count has to be greater than 1 except for 2

SUBPROBLEMS
-> building an array with the differnt combinations of elements
- ['a', 'b', 'c', 'd] -> [a, b d c], [a d b c]...


-> circular helper method

- we can have a count that has a value of 1 twice
- we cannot have anyother count with an odd value
*/

function validCounts(arr) {
  let onesCount = arr.reduce((total, num) => {
    if (num === 1) {
      return total += 1;
    } else {
      return total;
    }
  }, 0)
  
  let otherOddsCount = arr.reduce((total, num) => {
    if (num === 1) {
      return total;
    } else if (num % 2 === 0) {
      return total;
    } else {
      return total += 1;
    }
  }, 0)

  return (
    otherOddsCount === 0 &&
    onesCount <= 2
  );
}

function isCircular(arr) {
  if (arr.length <= 1) return false;
  let circularElements = firstAndLast(arr);
  circularElements.sort((a,b) => a - b);

  let elementCounts = countElements(circularElements);
  
  let countsArr = Object.values(elementCounts);

  return validCounts(countsArr);
}

function firstAndLast(arr) {
  let results = [];
  arr.forEach(subArr => {
    results.push(subArr[0], subArr[subArr.length - 1]);
  })
  return results;
}

function countElements(arr) {
  let results = {};
  arr.forEach(el => {
    if (results[el]) {
      results[el] += 1;
    } else {
      results[el] = 1;
    }
  })
  return results;
}

console.log(isCircular([[9, 8], [6, 9, 1], [8, 4, 2], [1, 9], [2, 1, 6]]), true)
// // Can be reordered: [[9, 8], [8, 4, 2], [2, 1, 6], [6, 9, 1], [1, 9]]

console.log(isCircular([[1, 1], [1, 2]]), false);

// // already circular
console.log(isCircular([[2, 1], [1, 2]]), true);

console.log(isCircular([[2, 1], [1, 2], [2, 1], [1, 3, 1], [1, 4, 4]]), false);
// // one element
console.log(isCircular([[1, 1]]), false);
// // empty array
console.log(isCircular([]), false);
// // test negative numbers
console.log(isCircular([[-2, -1], [-1, -2]]), true);
// // failing negative
// console.log(isCircular([[-2, -1], [-3, -2]]), false);
// // test strings
console.log(isCircular([['a', 'b'], ['c', 'd'], ['b', 'c']]), true); // ab, bc, cd
// // fail strings
console.log(isCircular([['a', 'b'], ['c', 'd'], ['f', 'c']]), false);
// // all same
console.log(isCircular([[1, 1], [1, 1], [1, 1]]), true);
// // all different
console.log(isCircular([[1, 9], [11, 7], [8, 6]]), false);
