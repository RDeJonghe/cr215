/*
Column With Maximum Sum
Given an array of numbers and a value for n, split the numbers into n-sized groups. If we imagine that these groups are stacked on top of each other (see below), return the column number that has the greatest sum. If two or more columns have the same sum, return the one with the smallest column number.

Example
nums = [4, 14, 12, 7, 14, 16, 5, 13, 7, 16, 11, 19]
n = 4
Gives the array:

[[4, 14, 12,  7],
[14, 16, 5, 13],
[7, 16, 11, 19]]

// 1, 2, 3, 4 (column)
// 25, 46, 28, 39 (sum)
You would return 2, as the 2nd column has the greatest sum.

Notes
Nums will always divide into equal-length groups.

INPUT - an array of numbers and a group size number
OUTPUT - number
REQUIREMENTS
- the numbers array needs to always divide into equal length groups
  - so subarrays will always be of equal length
- the groups stack into a matrix, so need to be able to access columns
- so for each column we need to sum it
- then of these find the column with the greatest sum
  - columns count in order from 1 up... not zero indexed columns, start with 1

EXAMPLES/EDGE CASES

DATA STRUCTURES - array

SUB PROBLEM
- create matrix
  - set empty results array
  - iterate, stop when index < length - group size
  - start index at 0,
  - slice from that index to group size and send to results
  - increment index by group size

- transpose
  - set up a results array
  - push to this subarrays, as many as there are with length of one of the subarrays
  - iterate over given array and subarray, send to results each element according to its index

ALGORITHM
- given an array and a group size create a matrix, each group size is it's own row
- now sum the columns
  - this is transpose helper method, rows become columns
- given the transposed array
  - transform this to the sum of each of these subarrays, along with it's index
  - so each subarray will be mapped to [sum, idx]
- sort these by sum decreasing
- return the indx of the first subarray PLUS one (not zero indexed)
*/

function createMatrix(arr, size) {
  let results = [];
  for (let startIdx = 0; startIdx <= arr.length - size; startIdx += size) {
    results.push(arr.slice(startIdx, startIdx + size));
  }
  return results;
}

function transpose(arr) {
  let results = [];
  let numSubArrs = arr[0].length;
  for (let i = 1; i <= numSubArrs; i += 1) {
    results.push([]);
  }
  
  arr.forEach(subArr => {
    subArr.forEach((element, idx) => {
      results[idx].push(element);
    })
  })
  return results;
}

function descSumSort(a, b) {
  let aSum = a[0];
  let bSum = b[0];

  if (aSum < bSum) {
    return 1;
  }
  if (aSum > bSum) {
    return -1;
  }
  return 0;
}

function maxSumColumn(arr, size) {
  let columns = transpose(createMatrix(arr, size));

  columns = columns.map((column, idx) => {
    let sum = column.reduce((total, num) => total + num, 0);
    return [sum, idx + 1];
  })

  columns.sort(descSumSort);

  let highestColumn = columns[0][1];

  return highestColumn;
}

// console.log(createMatrix([4, 14, 12, 7, 14, 16, 5, 13, 7, 16, 11, 19], 4))

// let sampleArr = [ [ 4, 14, 12, 7 ], [ 14, 16, 5, 13 ], [ 7, 16, 11, 19 ] ];

// console.log(transpose(sampleArr))

// generic case
console.log(maxSumColumn([4, 14, 12, 7, 14, 16, 5, 13, 7, 16, 11, 19], 4), 2);

// // negative numbers
console.log(maxSumColumn([-1, -2, -1, -4, -1, -6], 2), 1); // first column has greatest sum (-3 greater than the other sum)

// // decimal numbers
console.log(maxSumColumn([1.5, 2.5, 1.5, 4.5, 1.5, 6.5], 2), 2); // second column greates

// // 2 columns with same sum - return first
console.log(maxSumColumn([1.5, 1.5, 1.5, 1.5, 1.5, 1.5], 2), 1); // both have same sum but first column is returned because it occurs first

// // one big group, in that case column with highest number wins
console.log(maxSumColumn([12, 4, 5, 3], 4), 1); // this is one group of four, each column is it's own value