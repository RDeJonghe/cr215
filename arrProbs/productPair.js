/* NOT FINISHED

https://edabit.com/challenge/S69CGXXeNp7J89ZLy



Mubashir needs your help in the simple task of multiplication of elements in a given array.

Create a function that takes an array of integers arr and a positive integer k and returns the minimum and maximum possible product of k elements taken from the array. If enough elements are not available in the array, return null.

INPUT - array, and positive integer
OUTPUT - array of two number or null
REQUIREMENTS
- need to multiply certain elements
- need to find the minimum and maximum products of that many elements from the array
  - product means just multiply all together
  - so need to. find all groups of that size, find the products, and then find min and max
- resutls are shown small then large in array

QUESTIONS
- decimal numbers - no
- sparse, custom, frozen arrays - no
- string numbers - no

DATA STRUCTURES - array

SUBPROBLEMS
-> create groups helper method
  - this is all possible groups of this size
  - so need to itearate over the first eleemnt
  - 

-> product helper - given an arr reutrn product of all nums

ALGORITHM
- return null if length of array is less than second arg
- create all groups of that particular size given (helper)
- this will give an array of subarray groups
- transform this to a product, so each subarray is made into a product (helper)
- set resutls array
- sned to min and max the array of products, send these to results
*/

function groupSize(arr, size) {
  let results = [];
  for (let idx = 0; idx <= arr.length - size; idx += 1) {
    results.push(arr.slice(idx, idx + size));
  }
  return results;
}

function product(arr) {
  return arr.reduce((total, num) => total * num, 1);
}

function productPair(arr, size) {
  if (arr.length < size) return null;
  let groups = groupSize(arr, size);
  let products = groups.map(subArr => product(subArr));
  return groups;
}


/*
- need to get all combinations of numbers of a certain size - so in an array the different combos from all over the array
- 
*/

function getTriplets(arr) {
  let results = [];
  for (let i = 0; i < arr.length - 2; i += 1) {
    for (let j = i + 1; j < arr.length - 1; j += 1) {
      for (let k = i + 2; k < arr.length; k += 1) {
        results.push([arr[i], arr[k], arr[j]]);
      }
    }
  }
  return results;
}

console.log(getTriplets([1, -2, -3, 4, 6, 7]))

// console.log(productPair([1, -2, -3, 4, 6, 7], 1), [-3, 7]);

// console.log(productPair([1, -2, -3, 4, 6, 7], 2), [-21, 42]);
// // -3*7, 6*7

// console.log(productPair([1, -2, -3, 4, 6, 7], 3), [-126, 168]);
// // -3*6*7, 4*6*7

// console.log(productPair([1, -2, -3, 4, 6, 7], 7), null);
// // There are only 6 elements in the array

// // empty array
// console.log(productPair([], 7), null);

// // same num of elements as number given, so same result one group min/max same
// console.log(productPair([1, 2, 3], 3), [6, 6]);





// ETHANS SOLUTION

/*
Example: arr = [1, 2, 3, 4, 5], k = 3

3-element combinations:          1            2          3
                               /   \         / \         |
2-element combinations:      2      3       3   4        4
                           / | \   / \     / \   \       |
1-element combinations:   3  4  5 4   5   4   5   5      5

Compute combinations vertically:

[1, 2, 3],
[1, 2, 4],
[1, 2, 5],
[1, 3, 4],
...
[3, 4, 5]
2:00
Here’s my algorithm:
**Goal**: Compute all the combinations in an array of a given size.
**Assumption**: `k` <= `length(array)`

Given an `array` and combination size `k`:

- [Base Case] If `k` is 1 -> return all 1-element combinations
  - Transform each value in `array` to a 1-element combination
- [Recursive Case]
  - Initialize `combinations` to empty array
  - Iterate over the first `length(array) - k + 1` elements in `array` with the `element` and `index`:
    - Form a slice of the `rest` of the elements from `index + 1` to the end
    - Recursively compute all `k - 1` sized `newCombinations` from the `rest` of the elements
    - For each new combinations, prepend the `element`
    - Append those `newCombinations` to the `combinations`
  - Return `combinations`
2:01
product_pair.js 
// productPair
*/
​
function productPair(arr, k) {
  if (k > arr.length) return null;
  const products = getCombinations(arr, k).map(arrayProduct);
  return [Math.min(...products), Math.max(...products)];
}
​
function getCombinations(array, k) {
  if (k === 1) {
    return array.map((element) => [element]);
  }
​
  const combinations = [];
​
  for (let start = 0; start < array.length - k + 1; start++) {
    const startElement = array[start];
    const newCombinations = getCombinations(array.slice(start + 1), k - 1);
    newCombinations.forEach((combination) => combination.unshift(startElement));
    combinations.push(...newCombinations);
  }
​
  return combinations;
}
​
function arrayProduct(array) {
  return array.reduce((product, number) => product * number);
}
​
module.exports = { productPair, getCombinations };



// shwetank solution
function getNBitNumbers(n) {
  const binaryStringArray = [];
  const N = Math.pow(2, n) - 1; // total n bit binary numbers
  for(let decimalNumber = 0; decimalNumber <= N; decimalNumber++){
    const binaryString = decimalNumber.toString(2);
    const numPaddedZeros = n - binaryString.length;
    const paddedZeros = '0'.repeat(numPaddedZeros);
    const paddedBinaryString = paddedZeros + binaryString;
    binaryStringArray.push(paddedBinaryString);
  }
  return binaryStringArray;
}

function isSumEqual(binaryString, k) {
  const binaryNumberArray = [...binaryString].map(Number);
  const sumOfOnes = binaryNumberArray.reduce((sum, elem) => {
    return sum + elem;
    }, 0);
 return sumOfOnes === k;
}

function getMappedSubarray(array, binaryString) {
  return array.filter((_, idx) => binaryString[idx] === '1');
}

function kLengthSubarrays(array, k) {
  const n = array.length;
  const nBitNumbers = getNBitNumbers(n);
  const nBitNumbersWithKOnes = nBitNumbers.filter(str => {
    return isSumEqual(str, k);
  });
  const subarrays = nBitNumbersWithKOnes.map(binaryString => {
    return getMappedSubarray(array, binaryString);
  });
 return subarrays;
}