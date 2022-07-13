/* 4:41 4:58
You're given a 2D array / matrix of a crop field. Each crop needs to be hydrated. Each water source hydrates the 8 tiles around it. With "w" representing a water source, and "c" representing a crop, is every crop hydrated?

"w" on its own should return true, and "c" on its own should return false.

INPUT - array of subarrays
OUTPUT - boolean
REQUIREMENTS
- given a 2d matrix square of a crop field
- all crops need access to water
- water is able to reach it neighbors
- need to tell if every crop has access to water

QUESTIONS
- do we need to worry about case? No
- all strings will be w or c? Yes
- subarrays will never be empty? Yes
- main array can be empty? Yes
- matrix will always be a square? Yes?

DATA STRUCTURES - array

SUBPROBLEMS
- get all neighbors

ALGORITHM
- handle edge case of emtpy array
- iterate over each subArray - use idx here this is rowIdx
- then iterate over each element/crop - use idx this is colIdx
  - iteration needs to break if we want to return false
  - can like do every/every for both iterations
  - test to see if the crop is watered by checking neighbors
    - neighbors helper method returns array of all neigbors
    - does neighbors include 'w' return this
*/

function allNeighbors(arr, rowIdx, colIdx) {
  let rows = [arr[rowIdx - 1], arr[rowIdx], arr[rowIdx + 1]];
  let colIdxs = [colIdx - 1, colIdx, colIdx + 1];
  let results = [];

  rows.forEach(row => {
    if (row) {
      colIdxs.forEach(idx => results.push(row[idx]));
    }
  })
  return results.filter(el => el !== undefined);
}

function cropHydrated(arr) {
  if (arr.length === 0) return null;

  return arr.every((row, rowIdx) => {
    return row.every((crop, colIdx) => {
      return allNeighbors(arr, rowIdx, colIdx).includes('w');
    })
  })
}

// passing case
console.log('1', cropHydrated([
  [ "w", "c" ],
  [ "w", "c" ],
  [ "c", "c" ]
]), true);

// failing case
console.log('2', cropHydrated([
  [ "c", "c", "c", "c" ],
  [ "w", "c", "c", "c" ],
  [ "c", "c", "c", "c" ],
  [ "c", "w", "c", "c" ]
]), false);

// no water
console.log('3', cropHydrated([
  [ "c", "c", "c" ],
  [ "c", "c", "c" ],
  [ "c", "c", "c" ]
]), false);

// all water
console.log('4', cropHydrated([
  [ "w", "w", "w" ],
  [ "w", "w", "w" ],
  [ "w", "w", "w" ]
]), true);

// perfect reach
console.log('5', cropHydrated([
  [ "c", "c", "c" ],
  [ "c", "w", "c" ],
  [ "c", "c", "c" ]
]), true);

// four corners
console.log('6', cropHydrated([
  [ "w", "c", "c", "w" ],
  [ "c", "c", "c", "c" ],
  [ "c", "c", "c", "c" ],
  [ "w", "c", "c", "w" ]
]), true);

// no crop field
console.log('6', cropHydrated([]), null);