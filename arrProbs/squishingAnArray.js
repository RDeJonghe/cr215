[1, 2, 3, 4, 5]/* 8:34 9:14
Write a function that squishes an array from the left or the right.

Squishing from the left is to successively sum the first two elements of an array (shortening the array in the process).

Squishing from the right is to successively sum the last two elements of an array.

Include the original array as the first element in either squish.

Return an empty array if the input is an empty array.

INPUT - array and a string
OUTPUT - an array of subarrays
REQUIREMENTS
- need to "squish" and array from the left or right
- to "squish" need to successively sum elements (can happen from the left or right - so first two or last two)
  - when you squish an array shortening process happens
  - all squishing results are tracked in the results array as subarrays
- first element in results is the unsquished array, after that squishing happens
   - next subarray is one lement shorter, the first element in that array is the combo of first two elements from previous array
  - this process happens all the way down to a subarray with one element

QUESTIONS
- do we have to handle empty arrays - yes
- will the array always consist of numbers - yes
- do we have to handle decimals and negative numbers - yes
- do we have to handle string numbers - no
- do we need to handle sparse arrays, arrays with custom properties or frozen arrays no
- will the second argurment always be left or right lowercase - yes

DATA STRUCTURES - array

ALGORITHM
- handle case of empty array
- handle case of single element array (if necessary)
- set up an empty results array
- have to iterate the number of times that there are elements
  - get the length of the array to perform number of iterations
- on first iteration just send the entire array to results
- need to use a copy of the given array since it will be mutated on each iteration
- every other iteration we need to squish
  - squish is a subproblem
  - take the return value of squish and send to results
  - squish will mutate so the next iteration will use the proper array
- after all iterations there will be the correct array

SUBPROBLEM
-> squish
- given an array and a direction l/r
- conditionally check if it's l or r
- need to combine the two ending elements and sum them and save this
- then pop push element off depending on l/r
- then reassign first/last el to the sum
- return this new array
*/

function sumTargetElements(arr, direction) {
  let firstTwoSum;
  let lastTwoSum;

  if (direction === 'left') {
    firstTwoSum = arr.slice(0, 2).reduce((total, num) => total + num, 0);
    arr.shift();
    arr[0] = firstTwoSum;
  }

  if (direction === 'right') {
    lastTwoSum = arr.slice(arr.length - 2).reduce((total, num) => total + num, 0);
    arr.pop();
    arr[arr.length - 1] = lastTwoSum
  }

  return arr;
}

function squish(arr, direction) {
  if (arr.length === 0) return arr;
  if (arr.length === 1) return [arr];

  let results = [];
  let numIterations = arr.length;

  let arrCopy = [...arr];
  for (let i = 1; i <= numIterations; i += 1) {
    if (i === 1) {
      results.push([...arrCopy]);
    } else {
      sumTargetElements(arrCopy, direction);
      results.push([...arrCopy]);
    }
  }
  return results;
}



// generic cases
console.log('1',squish([1, 2, 3, 4, 5], "left"), [[1, 2, 3, 4, 5], [3, 3, 4, 5], [6, 4, 5], [10, 5], [15]]);
console.log('a',squish([1, 2, 3, 4, 5], "right"), [[1, 2, 3, 4, 5], [1, 2, 3, 9], [1, 2, 12], [1, 14], [15]]);

// negative numbers
console.log('b',squish([-1, -2, -3], "right"), [[-1, -2, -3], [-1, -5], [-6]]);
console.log('c',squish([-1, -2, -3], "left"), [[-1, -2, -3], [-3, -3], [-6]]);

// decimal numbers
console.log('d',squish([1.5, 2.5, 3.5], "right"), [[1.5, 2.5, 3.5], [1.5, 6], [7.5]]);
console.log('e',squish([1.5, 2.5, 3.5], "left"), [[1.5, 2.5, 3.5], [4, 3.5], [7.5]]);

// one element array given - return one element subarray
console.log('f',squish([1], "left"), [[1]]);
console.log('g',squish([1], "right"), [[1]]);

// empty array
console.log('h',squish([], "right"), []);
console.log('i',squish([], "left"), []);

// given
console.log('2',squish([1, 2, 3, 4, 5], "right"), [[1, 2, 3, 4, 5], [1, 2, 3, 9], [1, 2, 12], [1, 14], [15]]);

console.log('3',squish([1, 0, 2, -3], "left"), [[1, 0, 2, -3], [1, 2, -3], [3, -3], [0]]);

console.log('4',squish([1, 0, 2, -3], "right"), [[1, 0, 2, -3], [1, 0, -1], [1, -1], [0]]);

