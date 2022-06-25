/*
~~~~~~~~~~~~ DEEP COMPARE DISCUSSION ~~~~~~~~~~~~~~~~

=> DEEP EQUALITY - very useful form making a custom includes, count and unique methods for objects
  - so just having this makes everything else easier

- Deep compare is a very useful tool to have, it allows you to compare objects and arrays in an easy manner once deep compare is set up

- Deep compare makes so many other things easier
  - checking to see if an array exists as an array in another array
  - checking to see if an object exists in another array
  - making a unique array of objects/arrays
  - counting arrays / objects

- With deep comapre you can do a lot of what you normally do with primitives with objects and arrays

- It will be useful to memorize this algorithm since so much depends on it, that way if something is needed I know exactly what to do

NOTE: deep compare even works if keys aren't in same order for objects

*/

/*
~~~~~~~~~~ DEEP COMPARE ALGORITHM ~~~~~~~~~~~~~~~

- there are 3 algorithms here, 
  - original from codewars
  - slight modifications with syntax
  - NaN added
  - probably the middle is the most useful but could use NaN one

*/

function deepCompareCodeWarsOriginal(o1, o2) {
  if (o1 === o2) return true;
  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
  if (Object.keys(o1).length !== Object.keys(o2).length) return false;
  var keys = Object.keys(o1);
  return keys.every(function(key) {
    return deepCompare(o1[key], o2[key]);
  });
};

// ~~~~ deep compare with arrow syntax and let instead of var ~~~~

function deepCompareSlightChanges(o1, o2) {
  if (o1 === o2) return true;
  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
  if (Object.keys(o1).length !== Object.keys(o2).length) return false;
  let keys = Object.keys(o1);
  return keys.every(key => {
    return deepCompare(o1[key], o2[key]);
  });
};

// ~~~~ NaN added, not really that frequent but hey

function deepCompare(o1, o2) {
  if (o1 === o2) return true;
  if (Number.isNaN(o1) && Number.isNaN(o2)) return true;
  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
  if (Object.keys(o1).length !== Object.keys(o2).length) return false;
  let keys = Object.keys(o1);
  return keys.every(key => {
    return deepCompare(o1[key], o2[key]);
  });
};

// ~~~~ deepCompare example 1 ~~~~~

// console.log(deepCompare([2, 4, 6.7, 'hello'], [2, 4, 6.7, 'hello']));

// ~~~~~ deepCompare example 2 keys don't have to be in same order ~~~~~

// console.log(deepCompare({a: 1, b: 2}, {b: 2, a: 1}));


/*
~~~~~~~~ deepCompare to check if an array includes another object (good for both array and objects as second arg)
*/

function arrayIncludesObject(mainArray, objectToCheck) {
  for (let subObject of mainArray) {
    if (deepCompare(subObject, objectToCheck)) return true;
  }
  return false;
}

// using with array

let mainArr1 = [
  [2, 4, 6],
  [8, 10, 12]
];

// console.log(arrayIncludesObject(mainArr1, [2, 4, 6]))
// console.log(arrayIncludesObject(mainArr1, [-2, -4, -6]))


// using with object

let mainArr2 = [
  {a: 1, b: 2},
  {z: 99, y: 98},
];

// console.log(arrayIncludesObject(mainArr2, {b:2, a: 1}));
// console.log(arrayIncludesObject(mainArr2, {b:22, a: 1}));


/*
~~~~~~~~~~~~~~~ count ~~~~~~~~~~~~~~~~~~~~~

- a valueable use for deepCompare is to count, can count how many of an object appears in another object
- so an example would be arrays in an array or objects in an array. also it could be how many objects are stored as keys (by converting to an array and counting those)
- the deep compare could be used with primitives too - although not a lot of reason to do that if the algorithm isn't already built

*/
// => counting arrays in another array

function countObjectsInArray(mainArray, objectToCount) {
  let counter = 0;
  mainArray.forEach(nestedObj => {
    if (deepCompare(objectToCount, nestedObj)) counter += 1;
  })
  return counter;
}

let mainArr3 = [
  [1, 2, 3],
  [4, 5, 6],
  [1, 2, 3],
  [1, 2, 3]
];

// console.log(countObjectsInArray(mainArr3, [1, 2, 3]))
// console.log(countObjectsInArray(mainArr3, [4, 5, 6]))
// console.log(countObjectsInArray(mainArr3, [12, 23, 33]))

// => using same helper method countObjectsInArray but with objects

let mainArr4 = [
  {a: 1, b: 2},
  {c: 3, d: 4},
  {a: 1, b: 2},
  {b: 2, a: 1},
];

// console.log(countObjectsInArray(mainArr4, {a: 1, b: 2}));

// => can also use this to count values for objects like this:

let mainObj1 = {
  first: {a: 1, b: 2},
  second: {c: 3, d: 4},
  third: {a: 1, b: 2},
}

let values = Object.values(mainObj1);

// console.log(countObjectsInArray(values, {a: 1, b: 2}))

/*
~~~~~~~~~~~~~~~~~ unique ~~~~~~~~~~~~~~~~~~~~
- deep equality also makes creating a unique array of objects easy
- need the arrayIncludesObject helper method to check results as you are making 
it
  -> so for unique it's like it's easier to just set up deepCompare first, then arrayIncludesObject, with those two then unique is simple, withouth those two then unique is more difficult.

*/

function unique(array) {
  let results = [];
  array.forEach(obj => {
    if (!arrayIncludesObject(results, obj)) {
      results.push(obj);
    }
  })
  return results;
}

let mainArr5 = [
  {a: 1, b: 2},
  {c: 3, d: 4},
  {a: 1, b: 2},
  {b: 2, a: 1},
];

let mainArr6 = [
  [1, 2, 3],
  [4, 5, 6],
  [1, 2, 3],
  [1, 2, 3]
];

// console.log(unique(mainArr5))
// console.log(unique(mainArr6))
