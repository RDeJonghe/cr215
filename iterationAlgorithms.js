/*
~~~~~~~~~~~~~~~~~~ PAIRS ~~~~~~~~~~~~~~~~~~~~~~
- this came up on a 109 practice problem
- need to find all pair combinations in a subarray of integers
- could also be used to pair strings together
- this is getting all pairs when parsing from left to right
- careful with iteration start and stopping condtions
  - need to stop iteration a little early since we are getting pairs (don't want to pair with undefined)
- this could also be used on a string (see example) and you would just get pairs from the string with bracket notation
*/

function pairs(arr) {
  let results = [];
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      results.push([arr[i], arr[j]]);
    }
  }
  return results;
}

let arr1 = [0, 1, 2, 3, 4];
let arr2 = ['back', 'once', 'again', 'renegade'];

let str1 = 'abcd';

// let allPairs = pairs(arr1);
// console.log(allPairs);
// let strPairs = pairs(arr2);
// console.log(strPairs);
// let letterPairs = pairs(str1);
// console.log(letterPairs);

/*
~~~~~~~~~~~~~~~~~~ EXPANDER ~~~~~~~~~~~~~~~~~~~~~~
- can be used for strings or for arrays
- different than group size
  - group size starts at an index and increases an index and always takes the same group
- expander will start at the same index and increase the size of the group it's taking
  - so expander is kind of complementary / opposite of group size
  - typically this would start at index 0, but you could always give it a start index if you wanted
- can be used with both arrays and strings
*/

function expander(arr) {
  let results = [];
  for (let endSlice = 1; endSlice <= arr.length; endSlice += 1) {
    results.push(arr.slice(0, endSlice));
  }
  return results;
}

// let arr3 = [0, 1, 2, 3, 4, 5];
// let expanded1 = expander(arr3);
// console.log(expanded1);
// let str2 = 'abcdefg';
// let expanded2 = expander(str2);
// console.log(expanded2)

// with the below modification can start from the middle if you like

function expanderStart(arr, startSlice) {
  let results = [];
  for (let endSlice = startSlice + 1; endSlice <= arr.length; endSlice += 1) {
    results.push(arr.slice(startSlice, endSlice));
  }
  return results;
}

// console.log(expanderStart(arr3, 2))

/*
~~~~~~~~~~~~~~ GROUP SIZE ~~~~~~~~~~~~~
- so the start index increases and it takes the same size every time
- so opposite of expander
- can be used with arrays or strings
*/

function groupSize(arr, size) {
  let results = [];
  for (let startSlice = 0; startSlice <= arr.length - size; startSlice += 1) {
    results.push(arr.slice(startSlice, startSlice + size));
  }
  return results;
}

let arr4 = [0, 1, 2, 3, 4, 5];
let str3 = 'abcdefg';

// console.log(groupSize(arr4, 3))
// console.log(groupSize(arr4, 2))
// console.log(groupSize(arr4, 4))

// console.log(groupSize(str3, 3))


/*
~~~~~~~~~~~~~ ALL SUBSTRINGS / SUBARRAYS ~~~~~~~~~~~~~~~


*/


/*
~~~~~~~~~~~~ NEIGHBORS ~~~~~~~~~~~~~
- algorithm to find all neighbors of a particular "coordinate"
- includes the coordinate itself
- coordinate is really just x,y to pinpoint a row and column
  - these should be zero indexed for simplicity
- difficult part is handling undefined since for elements on edge of matrix all neighbors aren't accessible
  - this can be done with conditional logic
- also a key featrue is iteration, to iterate over the different possiblilites of the matrix
- a neigbor also includes diagonal
- basic algorithm assumes square grid (but if undefined is handled maybe this isn't necessary)
*/

let bigGrid = [
  ['a', 'b', 'c', 'd', 'e', 'f'],
  ['g', 'h', 'i', 'j', 'k', 'l'],
  ['m', 'n', 'o', 'p', 'q', 'r'],
  ['s', 't', 'u', 'v', 'w', 'x'],
  ['y', 'z', '1', '2', '3', '4'],
  ['5', '6', '7', '8', '9', '$']
];

function allNeighbors(grid, x, y) {
  let rows = [grid[x - 1], grid[x], grid[x + 1]];
  let columnIdxs = [y - 1, y, y + 1];
  let results = [];

  rows.forEach(row => {
    if (row) { // tests undefined so error isn't thrown undefined[idx] prevents
      columnIdxs.forEach(idx => {
        if (row[idx]) { // tests for undefined so they aren't sent to results
          results.push(row[idx]);
        }
      })
    }
  })
  return results;
}

// console.log(allNeighbors(bigGrid, 3, 5));

/*
~~~~~~~~~~ ALTERNATE NEIGHBORS ~~~~~~~~~~~~
- this actually looks a lot simpler, just get everything and then filter
- useful to understand how it works
- less conditional logic
- but have to remove undefined from results
*/

function alternateNeighbors(grid, x, y) {
  let rows = [grid[x - 1], grid[x], grid[x + 1]];
  let columnIdxs = [y - 1, y, y + 1];
  let results = [];

  rows.forEach(row => {
    if (row) {
      columnIdxs.forEach(idx => results.push(row[idx]));
    }
  })

  return results.filter(neighbor => neighbor !== undefined);
}

// console.log(alternateNeighbors(bigGrid, 5, 5))


/*
~~~~~ ALTERNATE NEIGHBORS DOESN'T INCLUDED GIVEN COORDINATE ~~~~~~~
- basically same alternative, but you can remove the given coordinate if not needed, not 'technically' a neighbor
- so just need to filter it out, or remove it otherwise
- this is pretty tricky, especially when considering duplicate values, can't just filter in case there are duplicates
- can work on this more
*/

/*
~~~~~~~~~~~~~ TWO ARRAYS OF PRIMITIVES EQUAL ~~~~~~~~~~~~~~~~
- this can be an alternative to deep equality if the array is made up of primitives
- basically iterate and compare element by element using strict equality
*/

function primitiveArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let idx = 0; idx < arr1.length; idx += 1) {
    if (arr1[idx] !== arr2[idx]) return false;
  }
  return true;
}

let nums1 = [1, 2, 3, 4];
let nums2 = [1, 2, 3, 4];
let chars3 = ['z', 'y', 'x'];
let chars4 = ['z', 'y', 'x'];
let chars5 = ['z', 'y', 'x', 'w'];

// console.log(primitiveArraysEqual(nums1, nums2)); // true
// console.log(primitiveArraysEqual(nums1, chars3)); // false
// console.log(primitiveArraysEqual(chars3, chars4)); // true
// console.log(primitiveArraysEqual(chars5, chars4)); // false


/*
~~~~~~~~~~~~~ DIAGONALIZE / RUBIK'S CUBE ~~~~~~~~~~~~~~~~
- not really iteration but manipulation of an array
- shows how to really reorganize an array
- useful for mental represenation of what can be done
- good to be aware of in case something like this is needed
- really just combos of map and reverse
- so a "standard" array organized in a standard way
- then this can be reorganized based off of the starting point
- needs a starting position
  - upper left, upper right, lower left, lower right
  - with this info can then reorganize it
- note in example deep copies are made so it is a fresh array each time
*/

let standardArr = [
  ['a', 'b', 'c', 'd'],
  ['e', 'f', 'g', 'h'],
  ['i', 'j', 'k', 'l'],
  ['m', 'n', 'o', 'p']
];

let standardArr2 = [
  [0, 1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
  [3, 4, 5, 6, 7],
  [4, 5, 6, 7, 8]
]

function diagonalizeRubiksCube(arr, position) {
  if (position === "ul") return arr;
  if (position === "ur") return arr.map(subArr => subArr.reverse());
  if (position === "ll") return arr.reverse();
  if (position === "lr") return arr.reverse().map(subArr => subArr.reverse());
}

let positions = ["ul", "ur", "ll", "lr"];

positions.forEach(position => {
  let stringified = JSON.stringify(standardArr2);
  let deep = JSON.parse(stringified);
  // console.log(diagonalizeRubiksCube(deep, position));
});
