/* 12:30
Write a function that takes two or more objects and returns 
a new object which combines all the input objects.

Objects are combined together so that the values of matching keys are added together.

An example:

The combine function should not mutate the input objects.

For bonus practice, what if the values are a different data type, like strings? Can you add versatility to your solution?

INPUT - two objects
OUTPUT - single object with like keys combined
REQUIREMENTS
- have to combine multiple objects (2 or more) and combine like keys
- matching keys are added together
- with strings concat with comma space between values
- cannot mutate

EXAMPLES/TEST CASES

QUESTIONS
- can objects be empty? yes
- will there always be at least two arguments? yes

DATA STRUCTRUE/INTERMEDIATE DATA STRUCTURE
- working with objects
- can set up an empty object to store data

ALGORITHM
- set up method to take an array of objects
- set up an empty results object
- iterate over the array of objects
- iterate over the keys of each of these objects
- if the value is a string
  - check if the key exists
    - if it does concat ', ' plus the current value to it
  - if it doesn't set it equal to the current value
  - use same key for results
- if it's not a string (integer)
  - chekc if it exists
  - if it does just += it
  - other wise set it to current value

SUBPROBLEMS
- takes a results object and a current object
- iterate over all of the keys of the current object and hanlde results
*/

function combiner(results, obj) {
  let keys = Object.keys(obj);
  keys.forEach(key => {
    if (typeof results[key] === 'string') {
      if (results[key]) {
        results[key] = results[key] + ', ' + obj[key];
      } else {
        results[key] = obj[key];
      }
    } else {
      if (results[key]) {
        results[key] += obj[key];
      } else {
        results[key] = obj[key];
      }
    }
  })
  return results;
}


function combine(...objs) {
  let results = {};

  objs.forEach(obj => {
    combiner(results, obj);
  })
  return results;
}

const objA = { a: 10, b: 20, c: 30 }
const objB = { a: 3, c: 6, d: 3 }
const objC = {d: 1 }

// generic case
console.log(combine(objA, objB)); // Returns { a: 13, b: 20, c: 36, d: 3 }

// three objects
console.log(combine(objA, objB, objC));
// { a: 13, b: 20, c: 36, d: 4 }

// empty objects
console.log(combine({}, {})); // {}

// objects with one val each
console.log(combine({a:1}, {a:1})); // {a: 2}
//only one val
console.log(combine({a:1}, {})); // {a: 1}
console.log(combine({}, {a: 1})); // {a: 1}

// objects with completely different values
console.log(combine({a: 1, b:1}, {c: 1, d: 1})); // {a:1, b:1, c:1, d:1}

// strings
console.log(combine({a: 'hello'}, {a: 'world'})); // {a: 'hello, world'}
console.log(combine({a: 'back', b: 'once'}, {a: 'again', b: 'renegade'})); // {a: 'back, again', b: 'once, renegade'}


