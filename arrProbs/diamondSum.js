/* 9:11 9:54
Given an nxn grid of consecutive numbers, return the grid's Diamond Sum. The diamond sum is defined as the sum of the numbers making up the diagonals between adjacent sides.

Examples
diamondSum(1) ➞ 1

[1]
diamondSum(3) ➞ 20

[
  [1, _, 3],
  [_, 5, _],
  [7, _, 9]
]

// The numbers behind the underscores make up the Diamond Sum.
// 2 + 4 + 6 + 8 = 20
diamondSum(5) ➞ 104

[
  [1, 2, _, 4, 5],
  [6, _, 8, _, 10],
  [_, 12, 13, 14, _],
  [16, _, 18, _, 20],
  [21, 22, _, 24, 25]
]

// 3 + 7 + 9 + 11 + 15 + 17 + 19 + 23 = 104
Notes
n is always an odd number.

INPUT - an odd integer
OUTPUT - an integer
REQUIREMENTS
- need to find the sum of the diamond integers in a matrix
- matrix is always square
- diamond is "diagonal between adjacent sides"
  - always starts and ends in middle
  - moves outward toward last index and then inward
- need to identify diamond numbers and then sum them

DATA STRUCTURES - array

SUB PROBLEMS
-> create matrix of consecutive numbers
- set up a results array
- set up a counter = 1
- push n number of subarrays in there
  - when pushing each subarray do a nested iteration also up to that number
  - send the counter to the subarray before sending the subarray over

-> sum a half (given an array of subarrays)
- for the second half just reverse order of subarrays so indexes line up
  - set a left and right idx identifier = to the middle of that size to start at middle index
  - iterate the number of rows there are
  - conditioanl logic, if both iterators are the same just send one result to results
  - subract one from the left, add one to the right
  - then access that subarray and send that element to results
- after itrration will have all of the results numbers for the half


ALGORITHM
- handle edge cases for 0, and even number
- handle case of 1, just return 1
- need to create a martrix of consec numbers, this is the first task
- given the matrix
  - split into a first half and a second half, exclude the middle row
  - just take the first and last elements off of the middle row
- helper method to sum a half, identify the elements
- take first half, middle, second half and sum them all

-> sum a half (given an array of subarrays)
- for the second half just reverse order of subarrays so indexes line up
  - set a left and right idx identifier = to the middle of that size to start at middle index
  - iterate the number of rows there are
  - conditioanl logic, if both iterators are the same just send one result to results
  - subract one from the left, add one to the right
  - then access that subarray and send that element to results
- after itrration will have all of the results numbers for the half

*/

function sumHalf(half, originalArr) {
  let middle = Math.floor(originalArr.length / 2);
  let leftIdx = middle;
  let rightIdx = middle;
  let results = [];

  half.forEach(subArr => {
    if (leftIdx === rightIdx) {
      results.push(subArr[leftIdx]);
    } else {
      results.push(subArr[leftIdx], subArr[rightIdx])
    }
    leftIdx -= 1;
    rightIdx += 1;
  })
  return results.reduce((total, num) => total + num, 0);
}


function createConsecMatrix(num) {
  let results = [];
  let numToInsert = 1;

  for (let i = 0; i < num; i += 1) {
    let subArr = [];
    for (let j = 0; j < num; j += 1) {
      subArr.push(numToInsert);
      numToInsert += 1;
    }
    results.push(subArr);
  }
  return results;
}

function diamondSum(num) {
  if (num < 1 || num % 2 === 0) return null;
  if (num === 1) return 1;

  let matrix = createConsecMatrix(num);
  let middle = Math.floor(matrix.length / 2);
  let firstHalf = matrix.slice(0, middle);
  let middleRow = matrix.slice(middle, middle + 1).flat();
  let secondHalf = matrix.slice(middle + 1);

  let firstSum = sumHalf(firstHalf, matrix);
  let middleSum = middleRow[0] + middleRow[middleRow.length - 1];
  let secondSum = sumHalf(secondHalf.reverse(), matrix);


  return firstSum + middleSum + secondSum;

}

let matrix = [
  [ 1, 2, 3, 4, 5 ],
  [ 6, 7, 8, 9, 10 ],
  [ 11, 12, 13, 14, 15 ],
  [ 16, 17, 18, 19, 20 ],
  [ 21, 22, 23, 24, 25 ]
];

let firstHalf = [
  [ 1, 2, 3, 4, 5 ],
  [ 6, 7, 8, 9, 10 ]
]

// console.log(sumHalf(firstHalf, matrix));
console.log('1 ', diamondSum(1), 1);
console.log('2 ', diamondSum(3), 20);
console.log('3 ', diamondSum(5), 104);

// // even number
console.log('4 ', diamondSum(4), null);
// zero
console.log('5 ', diamondSum(0), null);
