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


/*
~~~~~~~~ indexOfObject with deep compare ~~~~~~~~~
- used to find index of an Object
*/

function indexOfObject(arr, obj) {
  let targetIndex = -1;

  for (let i = 0; i < arr.length; i += 1) {
    if (deepCompare(arr[i], obj)) {
      targetIndex = i
      return targetIndex;
    }
  }
  return targetIndex;
}

let arr = [
  [2, 3, 4],
  [3, 4, 9],
  [2, 4, 1],
  [7, 3, 2],
  [3, 4, 9]
];

// console.log(indexOfObject(arr, [7, 3, 2]))

/*
~~~~~~~ DEEP DIFFERENCE ~~~~~~~~
- can be used to create a deep difference method that preserves anything in the first array that cannot be found in any of the remaining arrays
- this relies on array includes object
*/

function deepDifference(...args) {
  let firstArr = args[0];
  let remainingArr = args.slice(1).flat();
  let results = [];

  firstArr.forEach(el => {
    if (!arrayIncludesObject(remainingArr, el)) results.push(el);
  })
  return results;
}

let arr4 = [[2, 4], [6, 8], {a: 1}, {b: 2}];
let arr5 = [[2, 4], [22, 44]];
let arr6 = [{b: 2}, {c: 10}];

// console.log(deepDifference(arr4, arr5, arr6))

/*
~~~~~~~~~ DEEP UNION ~~~~~~~~~~
- deep compare can be used to make a deep union method
- array includes object is needed to do this
*/
function deepUnion(...arrs) {
  let results = [];
  arrs.forEach(subArr => {
    subArr.forEach(el => {
      if (!arrayIncludesObject(results, el)) results.push(el);
    })
  })
  return results;
}

/*
let arr4 = [[2, 4], [6, 8], {a: 1}, {b: 2}];
let arr5 = [[2, 4], [22, 44]];
let arr6 = [{b: 2}, {c: 10}];
*/
// console.log(deepUnion(arr4, arr5, arr6));

/*
~~~~~~~~~~~~~ DEEP INTERSECTION ~~~~~~~~~~~~~~~~
- this is tricky because of everything that needs to be checked
- adding deep equality increases complexity.
- be careful when dealing with the if statement to check if it's in every array argument
*/

function deepIntersection(...arrs) {
  let results = [];
  arrs.forEach(subArr => {
    subArr.forEach(el => {
      if (arrs.every(arrSub => arrayIncludesObject(arrSub, el)) && !arrayIncludesObject(results, el)) {
        results.push(el);
      }
    })
  })
  return results;
}

let arr10 = [[2, 4], [8, 9], {a: 1}];
let arr11 = [[77, 88], [2, 4], {a: 1}, {b: 1}];
let arr12 = [{a: 1}, [3, 5], [2, 4]];

console.log(deepIntersection(arr10, arr11, arr12));


/* ~~~~~~~~~~~~~ deepCompare analysis ~~~~~~~~~~~~~~~~~~
- just notes on each section of the algorithm
*/

function deepCompare(o1, o2) {

  if (o1 === o2) return true; // this handles primitives, also hanldes null


  if (Number.isNaN(o1) && Number.isNaN(o2)) return true; // this hanldes NaN since NaN not strictly equal to itself

  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false; // this takes out of contention comparison between object and non object, they are not equal

  if (Object.keys(o1).length !== Object.keys(o2).length) return false;
  // since we are now only looking at objects we can discard any that have a different length. Arrays also have keys these are the indexes

  let keys = Object.keys(o1); // objects are same size so we'll take keys from one of the objects and do a comparison with all of those

  return keys.every(key => { // so this is saying every/all values accessed by using the keys have to be equal

    return deepCompare(o1[key], o2[key]); // this is the recursive part, there is a comparison between both values for that key. So this will compare all values in a deep way

  });
};