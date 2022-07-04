/*
~~~~~~~~ DIFFERENCE, UNION, INTERSECTION ~~~~~~~~~~
- if needed can use deep equality within these to make them work with objects
- could be needed since comparison of contents is at heart of these
*/


/*
~~~~~~~~ DIFFERENCE ~~~~~~~~~~~
- return all of the elements in the first array that are not in any of the other arrays
  - so it's basically all unique elements in the first array that aren't in others
  - order from first array is preserved

ALGORITHM
- set up a results array
- set up a comparison array of all of the other arrays 
  - so this would be concat together all of the arrays from index 1 on
- index 0 is the first array we are keeping elements from
- iterate over the first array
  - if the current element is not in the big array of all others send it to results
- this will give what we need
*/


function difference(...arrs) {
  let firstArr = arrs[0];
  let otherArrs = arrs.slice(1).flat();
  let results = [];

  firstArr.forEach(el => {
    if (!otherArrs.includes(el)) results.push(el);
  })
  return results;
}

let arr1 = [0, 1, 2, 3, 4, 5, 6, 7];
let arr2 = [0, 2, 4, 6, 8];
let arr3 = [1, 3, 99];
let arr3a = [1, 3, 99];
let arr3b = [1, 3, 99];

// console.log(difference(arr1, arr2, arr3));

// edge case of returning empty array
// console.log(difference(arr3, arr3a, arr3b));


/*
~~~~~~~~ UNION ~~~~~~~~
- take all the elements from all the arrays and remove duplicates
- so it has every unique value

ALGORITHM
- all args will be in an array of subarrays
- set up a results array
- iterate over each subarray
- do a nested iteration over each element
- if the element doesn't exist in results send it
- return results
*/

function union(...arrs) {
  let results = [];
  arrs.forEach(subArr => {
    subArr.forEach(el => {
      if (!results.includes(el)) results.push(el);
    })
  })
  return results;
}

let arr4 = [1, 2, 3, 4, 5, 6, 7];
let arr5 = [1, 22, 3, 44, 5, 6, 77];
let arr6 = [2, 3.5, 4, 99];

// console.log(union(arr4, arr5, arr6))

/*
~~~~~~~~~ INTERSECTION ~~~~~~~~
- all common elements shared in all arrays
  - so for it to exist in results it has to exist in all arrays
- no duplicates

ALGORITHM
- given an array of subarrays
- set up a results array
- iterate over every element in every subarray
  - this is a nested iteration to check
- send to results if
  - that element is in every subarray
  - so use every to iterate over the subarrays
  - check to see if it includes that element
  - this will return the needed boolean
*/

function intersection(...arrs) {
  let results = [];

  arrs.forEach(subArr => {
    subArr.forEach(el => {
      if (arrs.every(arrSub => arrSub.includes(el)) && !results.includes(el)) {
        results.push(el);
      }
    })
  })
  return results;
}

let arr7 = [0, 1, 2, 3, 4, 5];
let arr8 = [1, 3, 5];
let arr9 = [0, 2, 3];

console.log(intersection(arr7, arr8, arr9));