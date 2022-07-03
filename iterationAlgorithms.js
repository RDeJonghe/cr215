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

