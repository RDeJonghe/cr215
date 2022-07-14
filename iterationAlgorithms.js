/*

~~~~~~~~~~~~~~~~~ ROTATE ~~~~~~~~~~~~~~~~~~~~
- algorithm for rotate here



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
- algorithm to find all substrings or subarrays
  - named allSubStructures here to be generic
- iterate through indexes
- it works in a consecutive manner incrementing the start index and end index
- will find all the substrings and subarrays this way, consecutively
*/

function allSubStructures(dataStructure) {
  let results = [];
  for (let startIdx = 0; startIdx < dataStructure.length; startIdx += 1) {
    for (let endIdx = startIdx + 1; endIdx <= dataStructure.length; endIdx += 1) {
      results.push(dataStructure.slice(startIdx, endIdx));
    }
  }
  return results;
}

console.log(allSubStructures('hello'));
console.log(allSubStructures([0,1,2,3,4]));


/*
~~~~~~~~~~~ EACH SLICE ~~~~~~~~~~~~
- allows you to get groups of a certain size, but without overlapping
- so the start index "jupms" that size to the next needed start index
- this could be used with string or array, it's just slicing based off of index

ALGORITHM
- take both a data structure and the size of the slice as the argument
- set up an empty reults array
- set start slice to 0
- create a loop, while start slice is less than length of data structure
- on each iteration send a slice in that is from start slice to start slice plus size
  - this will give correct index, correct end index needs to be incremented like that each time
- increment start slice by the group size each iteration
  - this makes it "jump" and not overlap
*/

function eachSlice(dataStructure, sliceSize) {
  let results = [];

  for (let startSlice = 0; startSlice < dataStructure.length; startSlice += sliceSize) {
    results.push(dataStructure.slice(startSlice, startSlice + sliceSize));
  }
  return results;
}

// console.log(eachSlice('abcdefghi', 2));
// console.log(eachSlice('abcdefghi', 4));
// console.log(eachSlice([1,2,3,4,5,6,7,8,9], 3));
// console.log(eachSlice([1,2,3,4,5,6,7,8,9], 2));

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
~~~~~~~~~~~~~~ TWO OBJECTS WITH PRIMITIVE EQUAL ~~~~~~~~~~~~~~~~
- can check the length of the keys of both first, if these are not equal then return false
- after, given that they have the same length of keys can do a key by key comparison
- get the keys for one object and iterate over every key
  - access the value of this key for both objects and compare
  - if they are not equal return false
  - if all the keys are equal after iteration return true
*/

function objectsEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  let keys = Object.keys(obj1);

  return keys.every(key => {
    return obj1[key] === obj2[key];
  })
}

let obj1 = {a:1, b:2, c:'hello', d:3.5};
let obj2 = {a:1, b:2, c:'hello', d:3.5};
let obj3 = {a:1, c:'hello', b:2, d:3.5};
let obj4 = {A:1, c:'hello', b:2, d:3.5};

// console.log(objectsEqual(obj1, obj2));
// console.log(objectsEqual(obj1, obj3));
// console.log(objectsEqual(obj1, obj4));

/*
~~~~~~~~~~~~~ DIAMOND NUMS ~~~~~~~~~~~~~~
- a tricky iteration problem since it involves incrementing and decrementing indexes
- also need conditional logic to handle this appropriately
- has to do with accessing a "diamond" in an odd rowed square matrix
- good example of testing iteration skills
- the "diamond numbers" are the ones represented by __ so you iterate and pull all of these
- probably better to do it with iteration and test iteration rather than breaking it into halves like i previously tried
- overall the takeaways are
  - can conditionally increment/decrement the indexes
  - this is all based on the relation to the middle of the matrix
  - only works with odd squared matrices - even ones won't have a diamond since there is no middle space

[
  [01, 02, __, 04, 05],
  [06, __, 08, __, 10],
  [__, 12, 13, 14, __],
  [16, __, 18, __, 20],
  [21, 22, __, 24, 25]
]

*/

function diamondElements(oddMatrix) {
  let middle = Math.floor(oddMatrix.length / 2);
  let leftIdx = middle;
  let rightIdx = middle;
  let results = [];

  oddMatrix.forEach((subArr, subArrIdx) => {
    if (leftIdx === rightIdx) {
      results.push(subArr[leftIdx])
    } else {
      results.push(subArr[leftIdx], subArr[rightIdx]);
    }

    if (subArrIdx < middle) {
      leftIdx -= 1;
      rightIdx += 1;
    } else {
      leftIdx += 1;
      rightIdx -= 1;
    }
  })
  return results;
}

let matrix = [
  [ 1, 2, 3, 4, 5 ],
  [ 6, 7, 8, 9, 10 ],
  [ 11, 12, 13, 14, 15 ],
  [ 16, 17, 18, 19, 20 ],
  [ 21, 22, 23, 24, 25 ]
];

// console.log(diamondElements(matrix)); // [3, 7, 9, 11, 15, 17, 19, 23]


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

/*
~~~~~~~~ REMOVE COLUMN FROM ARRAY OF SUBARRAYS ~~~~~~~~~~
- remove a column from an array, return array with removed column
- subarrays will all have the same length
- can transpose, remove it as a row and then transpose back
  - could likely also do this with iteration and splicing every element out from the subarray, but just for the sake of using transpose can do it this way

*/

let remove1 = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
let remove2 = [
  [1,2,3,4,5,6],
  [6,5,4,3,2,1]
];
let remove3 = [
  [1,6],
  [2,5],
  [3,4],
  [4,3],
  [5,2],
  [6,1]
];

function transposeHelper(arr) {
  let colNum = arr[0].length;
  let results = [];
  for (let i = 1; i <= colNum; i += 1) {
    results.push([]);
  }

  arr.forEach(row => {
    row.forEach((el, idx) => results[idx].push(el));
  })
  return results;
}

function removeColumn(arr, colNum) {
  if (colNum >= arr[0].length) return null;
  let transposed = transposeHelper(arr);
  transposed.splice(colNum, 1);
  let removed = transposeHelper(transposed);
  return removed;
}

// THIS IS THE OPTION WITHOUT TRANSPOSE, DEEP COPY
function removeColumnFromSubArr(array, colNum) {
  let stringified = JSON.stringify(array);
  let arr = JSON.parse(stringified);
  if (colNum > arr[0].length) return null;

  arr.forEach(subArr => {
    subArr.splice(colNum, 1);
  })

  return arr;
}

// console.log(removeColumn(remove1, 0));

/*
~~~~~~~~~~~~~~~~ TRIPLETS ~~~~~~~~~~~~~~~~~~~~~~
- iteration algorithm to get combos of 3, but aren't consecutive
- so it's going around picking all the different elements from all the different places to get all combos of 3
- valuable to see another way to iterate over these
*/

function triplets(arr) {
  let results = [];
  for (let i = 0; i < arr.length - 2; i += 1) {
    for (let j = i + 1; j < arr.length - 1; j += 1) {
      for (let k = j + 1; k < arr.length; k += 1) {
        results.push([arr[i], arr[j], arr[k]]);
      }
    }
  }
  return results;
}

let arrForTriplets = [1, 2, 3, 4, 5];

console.log(triplets(arrForTriplets));

/*
~~~~~~ CHUNKING ~~~~~~~~
- when you iterate over an array consecutively and make "chunks" or groups that meet certain criteria
- this is built dynamically, in that when an element cannot be added to a group because it breaks critieria it then becomes part of the next group
- so there are the chunks and the criteria
- elements get added to a chunk as long as it meets criteria, when it no longer does that element becomes part of the next chunk
- this can be displayed easily with numbers and a sum

ALGORITHM
- strategy is to first set the first element into the first chunk, it's starts there by default
- results will have that subarray with the first element in it so it's a nested data structure
- iteration begins on index 1
- set current chunk index to 0
- on each iteration test the criteria of combining the current element to the current chunk
  - if it can be added sucessfully just add it
  - if it can't be added
    - create a new chunk (subarray)
    - send it to the new chunk
- after iteration all chunks should be made

NOTE - testing the criteria in the conditional statement can be done with a helper method. Just put all in one place here, easier if it's done with a helper method.
*/

function chunk(arr, targetNum) {
  let results = [[arr[0]]];
  let currentChunkIdx = 0;
  
  for (let idx = 1; idx < arr.length; idx += 1) {
    let currentChunk = results[currentChunkIdx];
    let currentNum = arr[idx];
    if (currentChunk.reduce((total, num) => total + num, 0) + currentNum <= targetNum) {
      results[currentChunkIdx].push(currentNum);
    } else {
      results.push([]);
      currentChunkIdx += 1;
      results[currentChunkIdx].push(currentNum);
    }
  }
  return results;
}

console.log(chunk([1, 2, 3, 4, 1, 0, 2, 2], 5));
// [[1, 2], [3], [4, 1, 0], [2, 2]]
console.log(chunk([1, 0, 1, 1, -1, 0, 0], 1));
// // // [[1, 0], [1], [1, -1, 0, 0]]
console.log(chunk([2, 1, 0, -1, 0, 0, 2, 1, 3], 3));
// // [[2, 1, 0, -1, 0, 0], [2, 1], [3]]
console.log(chunk([2], 3)); // [[2]]
// no combination taking place (chunking)
console.log(chunk([2, 2, 2], 3)); // [[2], [2], [2]]