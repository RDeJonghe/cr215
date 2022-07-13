/* 6:19 - 6:39
Create a function that determines how many number pairs are embedded in a space-separated string. The first numeric value in the space-separated string represents the count of the numbers, thus, excluded in the pairings.

Examples
number_pairs("7 1 2 1 2 1 3 2") ➞ 2
// (1, 1), (2, 2)

number_pairs("9 10 20 20 10 10 30 50 10 20") ➞ 3
// (10, 10), (20, 20), (10, 10)

number_pairs("4 2 3 4 1") ➞ 0
// Although two 4's are present, the first one is discounted.
Notes
Always take into consideration the first number in the string is not part of the pairing, thus, the count. It may not seem so useful as most people see it, but it's mathematically significant if you deal with set operations.

INPUT - string
OUTPUT - number
REQUIREMENTS
- need to find out how many number pairs are in a string
- numbers separated by spaces
- first number just says how many subsequent numebrs there are
  - don't include this in the count

EXAMPLES/EDGE CASES
QUESTIONS - no negative numbers
DATA STRUCTURE - arrays, object

SUBPROBLEMS

ALGORITHM
- handle edge case of empty string, string without any numbers ("0"), string wtih first number of 0 also so "", "0", "1"
- split string at the space level, this will give an array of numbers
- remove first number, this is just the length
- set up an object empty
- iterate over the array of strings
- for each one check if it exists in the object
  - set it or increment it by one
- this will give an object of keys of numbers with a count for that number
- take the values for this object
- transform this so it represents the pairs
  - math.floor num / 2
- sum this, this will give the total pairs
*/

function noPairs(numStr) {
  return numStr === "" || numStr ==="0" || numStr === "1";
}

function numberPairs(numStr) {
  if (noPairs(numStr)) return 0;

  let numsArr = numStr.split(' ').slice(1);
  let countObj = {};
  for (let num of numsArr) {
    countObj[num] ? countObj[num] += 1 : countObj[num] = 1;
  }

  let counts = Object.values(countObj);
  let pairCounts = counts.map(count => Math.floor(count / 2));

  return pairCounts.reduce((totalPairs, pair) => totalPairs + pair, 0);
}

// multiple count
console.log(numberPairs("7 1 2 1 2 1 3 2")) //➞ 2
// // (1, 1), (2, 2)

// // multiple count
console.log(numberPairs("9 10 20 20 10 10 30 50 10 20")) //➞ 3
// // (10, 10), (20, 20), (10, 10)

// // no pairs
console.log(numberPairs("4 2 3 4 1")) //➞ 0 (first 4 is just length)

// // all pairs
console.log(numberPairs("6 1 1 2 2 3 3")) // 3

// // just one pair
console.log(numberPairs("2 1 1")) // 1

// // not enough numbers for a pair
console.log(numberPairs("1 1")) // 0
console.log(numberPairs("0")) // 0

// // empty string
console.log(numberPairs("")) // 0

// // decimal numbers
console.log(numberPairs("4 1.5 1.5 3.7 4.5")) // 1

// // negative numbers
console.log(numberPairs("4 -5 -5 -7 -4")) // 1

