/*
~~~~~~~ OBJECT EQUALITY ~~~~~~~~
- compare 2 objects that have primitives
- need exact same key/val pairs
- discuss strategies 
*/

function objectEquality(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  let obj1Entries = Object.entries(obj1);
  let obj2Entries = Object.entries(obj2);

  return obj1Entries.every((subArr, subArrIdx) => {
    return subArr.every((el, elIdx) => {
      return el === obj2Entries[subArrIdx][elIdx];
    })
  })
}

function byKey(a, b) {
  let aKey = a[0];
  let bKey = b[0];

  if (aKey < bKey) {
    return -1;
  }
  if (aKey > bKey) {
    return 1;
  }
  return 0;
}

function objectEqualitySorted(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  let obj1Entries = Object.entries(obj1).sort(byKey);
  let obj2Entries = Object.entries(obj2).sort(byKey);

  return obj1Entries.every((subArr, subArrIdx) => {
    return subArr.every((el, elIdx) => {
      return el === obj2Entries[subArrIdx][elIdx];
    })
  })
}

let obj1 = {a:1, b:2, c:'hello', d:3.5};
let obj2 = {a:1, b:2, c:'hello', d:3.5};
let obj3 = {a:1, c:'hello', b:2, d:3.5};

console.log(objectEquality(obj1, obj2))
console.log(objectEquality(obj1, obj3));
console.log(objectEqualitySorted(obj1, obj3));