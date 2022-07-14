/* 2:07 2:32
In the game Set, three cards form a set if each of the cards are identical or completely different for each of the four properties. All three cards must:

Have the same color or different colors.
Have the same number or different numbers.
Have the same shades or different shades.
Have the same shape or different shapes.
The four properties are:

Colors: red, purple, green
Numbers: 1, 2, 3
Shades: empty, lined, full
Shapes: squiggle, oval, diamond
Here, a set is represented by an array containing three cards. Each card is represented by an object of properties and values. Write a function that determines whether three cards constitute a valid set.

A set cannot have 2/3 cards having the same property. Either all must share that property, or none will share that particular property.

Here is an example of a set:
[
  { color: "red", number: 1, shade: "empty", shape: "squiggle" },
  { color: "red", number: 2, shade: "lined", shape: "diamond" },
  { color: "red", number: 3, shade: "full", shape: "oval" }
]
// "Same" properties: color
// "Different" properties: numbers, shading and shapes


The following is not a set:
[
  { color: "red", number: 1, shade: "empty", shape: "squiggle" },
  { color: "red", number: 2, shade: "lined", shape: "diamond" },
  { color: "purple", number: 3, shade: "full", shape: "oval" }
]
// Colors are not all identical, but not all different.


INPUT - an array of objects
OUTPUT - boolean
REQUIREMENTS
- for it to be a set, there must be a totally different / totally same relationship
  - this is the case for all of the properites
  - so every property must be total different (no share) or totally the same
- always three cards, three types of things for each card, so different possibilities
- cannot have 2/3 that violates the set, all same or all different
  - so this is really what we're checking for

EXAMPLES/EDGE CASES

QUESTIONS
- if not three cards - return null
- all values will of the valid values given? - yes
- empty array, sparse array, array with custom properties - no
- extra properties in cards no

DATA STRUCTURES/INTERMEDIATE DATA STRUCTURES
- arrays an objects
- array of valid values
- the objects themselves which are elements
-> an optimal data structure would be [[green, green, green], [1,2,3], ....]
  - so all orderd by the property
-> starting with [[color: green], [number: 1].. etc we could build it]
-> map original structure so each is just values
  [
    [green, 1, empty, squiggle]
    [green, 2, empty squiggle]
  ]
-> here this is transpose, just transpose it to get [[green, green, green]]

HIGH LEVEL APPROACHES
1. need to consider the values all in relation to each other. So the values all need to be grouped so group all of the values and consider if they are all same or all different
2. you could have an array of all the possible values that are valid, green, number, etc. then you could map this array by counting all thier appearances in the objects. If any of them count to two it fails, otherwise it passes because you can have 0, can have 1 or can have 3, just can't have 2/3

ALGORITHM
- handle edge cases of wrong amount of cards
- group all the values in a way that is iteratble - array of subarrays of k/v pairs
- given this array
  - map it to only use the values this will give an array of subarrays of values
  - transpose this to link columns together
- iterate over each of these column subarrays with !some
  - test if any are two of three -if they are it will fail

SUBPROBLEM
- test if 2/3
- given an array of elements they need to be all the same or all different
- can do every for all same
- can do comparison between the 3

*/

function transpose(arr) {
  let results = [];
  for (let i = 1; i <= arr[0].length; i += 1) {
    results.push([]);
  }
  arr.forEach(row => {
    row.forEach((el, colIdx) => results[colIdx].push(el));
  })
  return results;
}

function allSameOrAllDifferent(arr) {
  let firstElement = arr[0];
  let allSameBoolean = arr.every(el => el === firstElement);
  let allDifferentBoolean = arr[0] !== arr[1] && arr[1] !== arr[2] && arr[0] !== arr[2];

  return allSameBoolean || allDifferentBoolean;
}

function isSet(arr) {
  if (arr.length !== 3) return null;
  let propertiesArr = arr.map(obj => Object.values(obj));

  let propertiesGrouped = transpose(propertiesArr);
  return propertiesGrouped.every(propSubArr => allSameOrAllDifferent(propSubArr));
}




console.log(isSet([
  { color: "green", number: 1, shade: "empty", shape: "squiggle" },
  { color: "green", number: 2, shade: "empty", shape: "diamond" },
  { color: "green", number: 3, shade: "empty", shape: "oval" }
])); // true

console.log(isSet([
  { color: "purple", number: 1, shade: "full", shape: "oval" },
  { color: "green", number: 1, shade: "full", shape: "oval" },
  { color: "red", number: 1, shade: "full", shape: "oval" }
])); // true

console.log(isSet([
  { color: "purple", number: 3, shade: "full", shape: "oval" },
  { color: "green", number: 1, shade: "full", shape: "oval" },
  { color: "red", number: 3, shade: "full", shape: "oval" }
])); // false

// too few cards - null
console.log(isSet([
  { color: "purple", number: 3, shade: "full", shape: "oval" },
  { color: "green", number: 1, shade: "full", shape: "oval" },
])); // null

// too many cards null
console.log(isSet([
  { color: "purple", number: 3, shade: "full", shape: "oval" },
  { color: "green", number: 1, shade: "full", shape: "oval" },
  { color: "red", number: 3, shade: "full", shape: "oval" },
  { color: "red", number: 3, shade: "full", shape: "oval" }
])); // null

// empty array
console.log(isSet([])); // null

// all same
console.log(isSet([
  { color: "green", number: 1, shade: "empty", shape: "oval" },
  { color: "green", number: 2, shade: "empty", shape: "oval" },
  { color: "green", number: 3, shade: "empty", shape: "oval" }
])); // true

// all different
console.log(isSet([
  { color: "green", number: 1, shade: "empty", shape: "squiggle" },
  { color: "red", number: 2, shade: "full", shape: "diamond" },
  { color: "purple", number: 3, shade: "line", shape: "oval" }
])); // true

// all 2/3 fail
console.log(isSet([
  { color: "green", number: 1, shade: "empty", shape: "squiggle" },
  { color: "red", number: 2, shade: "full", shape: "diamond" },
  { color: "red", number: 2, shade: "full", shape: "diamond" }
])); // false









// FIRST WAY

/*
ALGORITHM
- handle edge cases of empty array, and wrong number of cards
- create an array of the valid options
- iterate over the array of options to transform them
  - on eahc iteration pass to a helper method the option and the array argument of all of the cards
- this will give a value of counts
  - check if some are 2, if any are 2 return false, otherwise return true

SUBPROBLEMS
- count occurences
- given an option and a array of cards need to count the occurences of that option
- set count to zero
- iterate over each card (object)
  - call values on this to get an array of values
  - nested iteration over all the values
  - if any are === to it increment the count
- return the count
*/
// function countOccurrences(property, cardsArr) {
//   let count = 0;
//   cardsArr.forEach(cardObj => {
//     let values = Object.values(cardObj);
//     values.forEach(value => {
//       if (value === property) count += 1;
//     })
//   })
//   return count;
// }

// function isSet(arr) {
//   if (arr.length !== 3) return null;
//   let options = ['green', 'purple', 'red', 1, 2, 3, 'empty', 'lined', 'full', 'squiggle', 'diamond', 'oval'];

//   let counts = options.map(option => countOccurrences(option, arr));

//   return !counts.some(count => count === 2);
// }




