/*
~~~~~~~~~~~~~~ SHALLOW COMPARE ~~~~~~~~~~~~~~~
- this depends on array of primitives or objects with primitives
- if they all contain primitives then a item by item comparison is possible
- then you can get a lot of the benefit of deep equality, just with the suppostion that everything is composed of primitives
- need specific methods for both array and object though
*/


/*
~~~~~~~~~~~ ARRAY EQUALS ~~~~~~~~~~~~
*/

function arrayEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let idx = 0; idx < arr1.length; idx += 1) {
    if (arr1[idx] !== arr2[idx]) return false;
  }
  return true;
}

let a1 = [1,2,3,4];
let a2 = [1,2,3,4];
let a3 = [1,2,3];
let a4 = [1,2,3,4,5];
let a5 = [1,2,'hello'];
let a6 = [];
let a7 = [];
let a8 = ['back', 'once', 'again'];
let a9 = ['back', 'once', 'again'];

// console.log(arrayEquals(a1, a2)); // true
// console.log(arrayEquals(a2, a3)); // false
// console.log(arrayEquals(a2, a4)); // false
// console.log(arrayEquals(a5, a1)); // false
// console.log(arrayEquals(a6, a7)); // true
// console.log(arrayEquals(a8, a9)); // true

/*
~~~~~~~~~~~ OBJECT EQUALS ~~~~~~~~~~~
*/

function objectEquals(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  let keys = Object.keys(obj1);

  return keys.every(key => {
    return obj1[key] === obj2[key];
  })
}

let o1 = {a: 1, b: 2};
let o2 = {a: 1, b: 2};
let o3 = {b: 2, a: 1};
let o4 = {c: 1, d: 2};
let o5 = {c: 1, d: 2, e: 3};
let o6 = {};
let o7 = {};

console.log(objectEquals(o1, o2)); // true
console.log(objectEquals(o2, o3)); // true
console.log(objectEquals(o3, o4)); // false 
console.log(objectEquals(o4, o5)); // false
console.log(objectEquals(o6, o7)); // true
