/* 2:12

The function is given a list of lists of certain length n. Each element in the list is a cell marked by the list index from 0 to n - 1. Each cell contains keys - as list of integers - to other cells in the list. The cell 0 is open; that is where you find first keys to other cells. Open those cells and find new keys again. Go open other cells with new keys. Keep on repeating opening new cells while you discover new keys. Given the keys placement in different cells, determine if it is possible to open all cells, return true / false.

It is possible that a cell contains keys to already open cells. This is fine; just try to open as many cells as possible.

INPUT - an array of subarrays, subarrays contain numbers, can have multiple elements
OUTPUT - boolean
REQUIREMENTS
- each element is a cell (subarray represents a cell)
  - each cell can be of a different size
- each cell is indexed
- each cell contains keys (as in keys to a jail cell) - these are integers and they represents keys to other cells in the list
  - inside a cell there can be keys that can open other cells and the key number will correpsond to the index in the array for each cell - relationship between key cell/element index of outer array that holds the cells
- Cell 0 is always open,
  - that's where you find keys to other cells
- you need to be able to open all those other cells
- once you open a cell you can collect the keys found in that cell and use them to open subsequent cells
- determine if you can get to the end and open all of the cells

EXAMPLES/EDGE CASES
- note the relationship between key and subarray index

QUESTIONS 
- deal with string numbers?
- all elements in subarrays iwll be numbers greater or equal to zero, no decimal numbers
- we can be assured that no sparse arrays, no custom properties

DATA STRUCTURES - arrays
- note the relationship between key and subarray index (elements of one array reference the position of an array)

ALGORITHM
- need to consectuively move through the subarrays collecting the elemnents which represent their index position, if you can access all. of these with the elements gained return true, if at any time you don't have access return false

- set up a keys array to store keys, just use the first element in the given data structure
- take the portion of the array excluding the first subarray, these are the cells that need to be opened
  - this action changes the index, what would be the 1 index is now zero
  - when accessing be sure to add one to the index to make it align with original data structure
- iterate over the cells with index (index + 1)
  - choose a tool that can break iteration early
  - on each iteration check the keys array and see if the keys array includes that index
    - if it doesn't return false, you don't have the key to access it
    - if it does, send those keys within that cell to the keys array for future use
- at the end of iteration return true, all cells have been accessed

SUBPROBLEMS
*/

function openAll(jailArr) {
  if (jailArr.length == 0) return null;
  let keysArr = jailArr[0];
  let cellsArr = jailArr.slice(1);
  let cellIdx = 1;

  for (let cell of cellsArr) {
    if (keysArr.includes(cellIdx)) {
      keysArr = keysArr.concat(cell);
      cellIdx += 1;
    } else {
      return false;
    }
  }
  return true;
}

// // simple general case
console.log(openAll([[1], [0]])); // true
// // Cell_0 has a key to cell_1. It is possible to open all two cells.

console.log(openAll([[1], [2], [3], []])); // true
// // The placement allows to open all cells in a row.

console.log(openAll([[1, 3], [3, 0, 1], [2], [0]])); // false
// It is not possible to open cell_2.

console.log(openAll([[2, 1], [1], [2], [4], [0, 1]])); // false, "open only 0, 1, 2"
// // It is possible to open only cells 0, 1, 2. Cells 3, 4 stay closed.

// // no key in the first cell
console.log(openAll([[], [2], []])); // false

// // no cells
console.log(openAll([])); // null

// // all keys in the first cell
console.log(openAll([[1,2,3], [], [], []])); // true