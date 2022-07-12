/* 7:37 8:23
Write a function that returns true if a string consists of ascending or ascending AND consecutive numbers.

Notes
A number can consist of any number of digits, so long as the numbers are adjacent to each other, and the string has at least two of them.


INPUT - string
OUTPUT - boolean
REQUIREMENTS
- need to check if they are ascending and consecutive
- if this is the case return true
- string has to contain at least 2 numbers
- consecutive means increment by one, see last example - 444 and 445 are consecutive
  - 444 444 are not consecutive, this would fail
- just consec return true
- just ascending return true, ascending and consec return true
- just can't decrement
- odd number length - can't be divided evenly so for it to be acs or consec it has to be at single digit level

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURE
- arrays
- possibly an array that contains all of the portions of the sub string of a certain group size
  - so groups of 1, groups of 2, groups of 3, groups of 4, etc, that way you can see the different sizes
- "232425"
  [2,3,2,4,2,5]
  [23,24,25] - this passes - asc consec
  [232,425] - not consecutive
- so need to check all of these data structures

ALGORITHM
- handle the case of a single char string or empty string
- can always handle the case of an odd length number, in that case it's at the single char level of analysis and all have to be consec
  - can handle this if necessary, with helper method checking
- need to split the number up into all possible combinations
  - this is the subproblem helper method
  - this will give us an array of subarrays as seen in intermediate data structure
    - so array with subarrays of numbers
- iterate over data structure with some
  - we want to check if at least one of the subarrays has all consecutive numbers
  - helper method to check


SUBPROBLEMS
-> split string into all possible groups
- take the number / 2 -> this will be the highest group
  - all the way down to one
  - this is likely a loop to send another helper method to results
  - set empty results array
  - set counter = 1; while counter is less or equal to the given highest group
  - push the return value of eachSlice to results

-> eachSlice helper method
  - need to increment up a certain number each time -> it jumps to the index ahead
  - set start slice to 0
  - given a string and a size of each slice
  - start at start slice and slice that size + 1 (exclusive)
  - can convert this to a number, so we have the data type needed
  - push to results
  - increment start slice by the argument size given

-> all conscecutive
  - start iteration on first element
  - check if the current is exactly one greater than the last
  - return false if not
  - end of iteration return true

*/

function eachSlice(str, size) {
  let results = [];
  let startSlice = 0;
  while (startSlice < str.length) {
    let numberSection = Number(str.slice(startSlice, startSlice + size));
    results.push(numberSection);
    startSlice += size;
  }
  
  return results;
}

function numberGroups(str) {
  let groupSize = Math.floor(str.length / 2);
  let results = [];
  while (groupSize > 0) {
    results.push(eachSlice(str, groupSize));
    groupSize -= 1;
  }
  return results;
}

function allConsecutive(subArr) {
  for (let i = 1; i < subArr.length; i += 1) {
    let currentNum = subArr[i];
    let previousNum = subArr[i - 1];
    if (currentNum - previousNum !== 1) {
      return false;
    }
  }
  return true;
}

function ascending(str) {
  if (str.length <= 1) return null;

  let numbersInGroups = numberGroups(str);

  return numbersInGroups.some(subArr => {
    return allConsecutive(subArr);
  });
}

console.log(ascending("232425"), true);
// // Consecutive numbers 23, 24, 25

console.log(ascending("2324256"), false);
// // No matter how this string is divided, the numbers are not consecutive.

console.log(ascending("444445"), true);
// // Consecutive numbers 444 and 445.

// // two digit consec
console.log(ascending('12'), true);
// two digit asc, not consec fails
console.log(ascending('13'), false);
// two digit fails
console.log(ascending('11'), false);
console.log(ascending('21'), false);
// // one digit invalid
console.log(ascending('1'), null);
console.log(ascending(''), null);
// // all consec
console.log(ascending('123456789'), true);
// // all asc not consec
console.log(ascending('13579'), false);

// // failing case
console.log(ascending('9143'), false);


// ~~~~~~~~~~~~~~~~~~

console.log(ascending("232425"), true);
console.log(ascending("444445"), true);
console.log(ascending("1234567"), true);
console.log(ascending("123412351236"), true);
console.log(ascending("57585960616263"), true);
console.log(ascending("500001500002500003"), true);
console.log(ascending("919920921"), true);

console.log(ascending("2324256"), false);
console.log(ascending("1235"), false);
console.log(ascending("121316"), false);
console.log(ascending("12131213"), false);
console.log(ascending("54321"), false);
console.log(ascending("56555453"), false);
console.log(ascending("90090190290"), false);

