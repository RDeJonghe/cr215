/*
INPUT - array of integers
OUTPUT - array of subarrays with integers (first empty)
REQUIREMENTS
- [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3]
- before digits start repeating, each digit is placed in its own subarray, then repetition happens
- need to find all distinct subsets
  - so each subset is different
  - represents all combinations of the given numbers
- this is a copy and add approach, each step you copy and add
- so you copy what you have and also add
- [1, 3, 5]
- start with []
- [] [1] copy and add first element
- [], [1], [5], [1, 5]
- this is the critical step you take what you have and send it to results
- and you take what you have (empty array and [1] and add the current element to it)

DATA STRUCTURES
- arrays and subarrays, on each step copying and adding these

ALGORITHM
- set an empty results array, with a subarray inside of it
  - [[]]
- iterate over given array
- on each iteration set the results = to itself plus the concatantion of adding the current
  element in as needed
- after iteration all elements will be add


SUBPROBLEM
-> adding current element in, given current element and an array of subarrays
- make sure not to mutate
- set up a results array
- iterate over the given array of subarrays
- on each iteration send to results the concatantion of that subarray plus the current element into
 it
*/

function insertCurrentElement(el, arr) {
  let results = [];
  arr.forEach(subarr => {
    results.push(subarr.concat(el));
  })
  return results;
}

function nSizedSubsets(arr, n) {
  let subsets = [[]];
  
  arr.forEach(el => {
    subsets = subsets.concat(insertCurrentElement(el, subsets));
  })
  return subsets.filter(subset => subset.length === n);
}





/*
~~~~~~~~~~~~~~~~~ SHWETANK SOLUTION ~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~ K LENGTH SUBARRRAYS ~~~~~~~~~~~~~~~~~~~~~~~
*/

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

function deepEquality(o1, o2) {
  if (o1 === o2) return true;
  if (Number.isNaN(o1) && Number.isNaN(o2)) return true;
  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
  if (Object.keys(o1).length !== Object.keys(o2).length) return false;

  let keys = Object.keys(o1);
  return keys.every(key => {
    return deepEquality(o1[key], o2[key]);
  })
}

let arr = [1,3,5];
let alternative = nSizedSubsets(arr, 2).sort();
let shwetank = kLengthSubarrays(arr, 2).sort();

let arr2 = [1,3,5,7,9,2,4,6,8];
let alternative2 = nSizedSubsets(arr, 4).sort();
let shwetank2 = kLengthSubarrays(arr, 4).sort();

console.log(deepEquality(alternative, shwetank))
console.log(deepEquality(alternative2, shwetank2))