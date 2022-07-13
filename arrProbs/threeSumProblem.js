// 8:41 9:19
/*
Three Sum Problem
Write a function that returns all sets of three elements that sum to 0.

Examples

Notes
The original array may contain duplicate numbers.
Each three-element subarray in your output should be distinct.
Subarrays should be ordered by the first element of the subarray.
Subarrays themselves should be ordered the same as the original array.
Return an empty array if no three elements sum to zero.
Return an empty array if there are fewer than three elements.

INPUT  - array of numbers
OUTPUT - array of subarrys, each subarray contains 3 elements
REQUIREMENTS
- can have duplicate numbers
- output arrays have to be unique, so no duplicate subarrays
  - what if the numbers are the same, but in a different order, count as unique
- subarrays should be ordered asc by first element
- subarrays themselves should also be ordered (sorted)
- need to find all of the subarrays that sum to zero
- empty array for fewer than three elements or if none sum to zero

EXAMPLES/EDGE CASES

DATA STRUCTURES - arrays
INTERMEDIATE DATA STRUCTURE - need to find all the groups of three, so groups of three

ALGORITHM
- handle edge cases of arrays being to small
- get all groups of three
  - these are pre sorted
- perform selection on these choosing only those that sum to zero
- this will give the candidates
- from here select unique subarrays, no duplicates
  - use array equality and send unique to results

SUBPROBLEM
-> gropus of three (triplets)
- 3 nested iterations that will grab an element from an array and store it in a subarray, this will give combos of 3
  - sort asc numerically, the groups so when it goes to data structure it's ready

-> array equality for arrays with primitives
*/

function triplets(arr) {
  let results = [];
  for (let i = 0; i < arr.length - 2; i += 1) {
    for (let j = i + 1; j < arr.length - 1; j += 1) {
      for (let k = j + 1; k < arr.length; k += 1) {
        let triplet = [arr[i], arr[j], arr[k]];
        triplet.sort((a, b) => a - b);
        results.push(triplet);
      }
    }
  }
  return results;
}

function uniqueSubArrs(mainArr) {
  let results = [];
  mainArr.forEach(subArr => {
    if (!arrayIncludesArray(results, subArr)) results.push(subArr);
  })
  return results;
}

function arrayEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  for (let idx = 0; idx < arr1.length; idx += 1) {
    if (arr1[idx] !== arr2[idx]) return false;
  }
  return true;
}

function arrayIncludesArray(mainArr, targetArr) {
  return mainArr.some(subArr => arrayEquals(subArr, targetArr));
}

function firstElementAsc(a, b) {
  let aEl = a[0];
  let bEl = b[0];

  if (aEl < bEl) {
    return -1;
  }
  if (aEl > bEl) {
    return 1;
  }
  return 0;
}

function groupsOfThreeSumToZero(arr) {
  if (arr.length < 3) return [];
  let groupsOfThree = triplets(arr);
  let groupsSumToZero = groupsOfThree.filter(group => {
    let sum = group.reduce((total, num) => total + num, 0);
    return sum === 0;
  })

  let uniqueGroups = uniqueSubArrs(groupsSumToZero);

  return uniqueGroups.sort(firstElementAsc);
}




// // one group of three
console.log('1', groupsOfThreeSumToZero([0, -2, 2]), [[-2,0,2]]);
// // no duplicates
console.log('1b', groupsOfThreeSumToZero([0, -2, 2, 0, -2, 2]), [[-2,0,2]]);
// // two groups of three
console.log('2', groupsOfThreeSumToZero([0, -1, 1, 6, -3, -3]), [[-3, -3, 6], [-1,0,1]]);
// // three groups of three
console.log('3', groupsOfThreeSumToZero([-1, 1, 0, 2, 0, 4, -2, 10, -5, -5], [[ -5, 1, 4 ], [ -5, -5, 10 ]]));
// // decimals
console.log('4', groupsOfThreeSumToZero([-2.5, 0, 2.5]), [-2.5, 0, 2.5]);
// // failing case, none sum to zero pos
console.log('5', groupsOfThreeSumToZero([10, 21, 45, 12, 98, 34]), []);
// // failing case, none sum to zero neg
console.log('6', groupsOfThreeSumToZero([-10, -20, -3, -78]), []);
// // failing case, not enough elements
console.log('7', groupsOfThreeSumToZero([-2, 2]), []);














console.log(groupsOfThreeSumToZero([0, 1, -1, -1, 2]), [[0, 1, -1], [-1, -1, 2]]);

console.log(groupsOfThreeSumToZero([0, 0, 0, 5, -5]), [[0, 0, 0], [0, 5, -5]]);

console.log(groupsOfThreeSumToZero([1, 2, 3]), []);

console.log(groupsOfThreeSumToZero([1]), []);