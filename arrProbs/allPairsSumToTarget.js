/*
Create a function that returns all pairs of numbers in an array that sum to a target. Sort the pairs in ascending order with respect to the smaller number, then order each pair in this order: [smaller, larger].

If no pairs are found, return an empty array [].
You are only allowed to use each number once in a pair.

INPUT - an array and an integer
OUTPUT - an array with subarrays
REQUIREMENTS
- find all pairs of numbers in the array that sum to the target
- target number is the second argument
- sort the  eleements within the subarrays in ascending order of smaller, larger
- the subarrays themselves are sorted by the first number present, in ascending

DATA STRUCTURES - arrays

SUBPROBLEMS
-> find all pairs
- set up a results array
- iterate over every number - stop one before the end (last number can't make a pair with a subsquent number)
  - do a nested iteration sarting one past the current outer iteration



ALGORTIHM
- handle the edge case of an empty array
- find all pairs, have an array of subarray pairs
- given these pairs
  - perform selection, only find the pairs that sum to the target
  - have to sum (simple)
- given the seelcted pairs
  - map this and sort the subarrays in ascending order by number (helper sort function)
- then sort the subarrays themselves by the first element
*/


function numAsc(a, b) {
  return Number(a) - Number(b);
}

function firstNumAsc(a, b) {
  let aNum = a[0];
  let bNum = b[0];
  
  return aNum - bNum;
}

function makePairs(arr) {
  let results = [];
  for (let firstIdx = 0; firstIdx < arr.length - 1; firstIdx += 1) {
    for (let secIdx = firstIdx + 1; secIdx < arr.length; secIdx += 1) {
      results.push([arr[firstIdx], arr[secIdx]])
    }
  }
  return results.map(pair => pair.sort(numAsc));
}


function allPairs(arr, total) {
  if (arr.length === 0) return null;

  let allPairs = makePairs(arr);
  let targetPairs = allPairs.filter(subArr => {
    return subArr.reduce((sum, num) => sum + num, 0) === total;
  })

  return targetPairs.sort(firstNumAsc);
}


console.log(allPairs([2, 4, 5, 3], 7), [[2, 5], [3, 4]])
// // 2 + 5 = 7, 3 + 4 = 7

console.log(allPairs([5, 3, 9, 2, 1], 3), [[1, 2]])

console.log(allPairs([4, 5, 1, 3, 6, 8], 9), [[1, 8], [3, 6], [4, 5]])
// // Sorted: 1 < 3 < 4; each pair is ordered [smaller, larger]

// // no pairs sum to the target
console.log(allPairs([2, 4, 5, 3], 70), []);

// // target of 0 no pairs sum to zero
console.log(allPairs([2, 4, 5, 3], 0), []);

// // negative numbers
console.log(allPairs([-2, -4, -5, -3], -7), [[-2, -5], [-3, -4]]);

// // decimal numbers
console.log(allPairs([2.2, 2.2, 5.7, 3.9], 4.4), [[2.2, 2.2]]);

// // empty array given
console.log(allPairs([], 4), null);

// // pairs that are the same, show up in results twice, next to each other
console.log(allPairs([2, 5, 2, 5], 7), [[2, 5], [2, 5], [2, 5], [2, 5]]);
