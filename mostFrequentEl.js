/*
Create a function that takes an array and returns the most frequently occurring element contained within it.

findFrequent([3, 7, 3]) ➞ 3

findFrequent([null, "hello", true, null]) ➞ null

findFrequent([false, "up", "down", "left", "right", true, false]) ➞ false


INPUT - array of different element types
OUTPUT - the most frequent element, can be of different types
REQUIREMENTS
- from test cases there will always be a most frequent / no ties, so you don't have to handle ties
- find the most occuring element out of all of the elements

EXAMPLES/EDGE CASES
- have to handle undefined and null as other values are handled

DATA STRUCTURE
- array

SUBPROBLEMS
- given an array and a target element to count
- set a count to 0
- iterate over the array
- increment the count if the element equals the given target element
- at end of iteration return the count

ALGORITHM
- given an array of elements find the most frequently occuring
- can order these by their count
- count the occurences of the element (subproblem)
- order the elements by their count

*/

function countElement(arr, targetElement) {
  return arr.reduce((count, element) => {
    if (element === targetElement) {
      return count += 1;
    } else {
      return count;
    }
  }, 0)
}

function findFrequent(arr) {
  let sortDescByCount = arr.sort((a, b) => {
    let aCount = countElement(arr, a);
    let bCount = countElement(arr, b);

    if (aCount < bCount) {
      return 1;
    }
    if (aCount > bCount) {
      return -1;
    }
    return 0;
  })

  let mostFrequentElement = sortDescByCount[0]
  return mostFrequentElement;
}

console.log(findFrequent([3, 7, 3]) === 3);
console.log(findFrequent([null, "hello", true, null]) === null);
console.log(findFrequent([false, "up", "down", "left", "right", true, false]) === false);
console.log(findFrequent([undefined]) === undefined);
console.log(findFrequent([1, 2, -3, true, false, undefined, "yes", "yeah", "yup", 2]) === 2);
console.log(findFrequent(["Batman", "Superman", "Batman"]) === "Batman");