/*
~~~~~~~ OBJECT EQUALITY ~~~~~~~~
- compare 2 objects that have primitives
- need exact same key/val pairs
- check that they have the same number of keys, if not return false
- if they have the same number of keys
  - iterate over the keys array
  - then access that key for both and compare primitives
  - if they are all the same then they have equality
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

console.log(objectsEqual(obj1, obj2));
console.log(objectsEqual(obj1, obj3));
console.log(objectsEqual(obj1, obj4));


