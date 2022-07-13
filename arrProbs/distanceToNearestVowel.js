/* 8:40 - 9:15
Distance to Nearest Vowel
Write a function that takes in a string and for each character, returns the distance to the nearest vowel in the string. If the character is a vowel itself, return 0.

Examples

Notes
All input strings will contain at least one vowel.
Strings will be lowercased.
Vowels are: a, e, i, o, u.

INPUT - string
OUTPUT - array of numbers
REQUIREMENTS
- for each character of the string find the distance to the nearest vowel for that char
- results will have as many numbers as there are characters
- if the char is a vowel return 0
- nearest vowel can be before or after

QUESTIONS
- will all words have at least one vowel?
  - no, if no vowels at all return return null
- special chars, spaces - no special chars or spaces
  - word won't have any spaces
  - no special chars
- case? yes handle case

EXAMPLES/EDGE CASES

SUBPROBLEMS
-> no vowels helper method
  - regex to test for a vowel

-> find nearest vowel distance given char, current index, array of chars
  - first check if char is vowel, if so return 0
  - set up results array for distances
  - next need to find if distance is to left and right, then compare and find shortest
  - for left side
    - slice the array given from 0 and up to but not including index (left side of array)
    - next reverse this (since we are searching from distance of the letter)
      - findIndex of first vowel, this is the distance
        - but need to add one since it is zero based indexes and we're starting at letter after
        - if negative one need to discard eventually
  - for right side
    - take slice of array from currentIndex + 1 all the way to end
    - search for index of vowel with findIndex
      - if -1 discard
      - find this and add 1 and send to results
  - this will give an array of two or one vowel (if a -1 is discarded)
    -return the min of this, this is the distance we want

ALGORITHM
- handle edge case for empty string
- handle edge case for no vowels
- split word into array of chars
- iterate over each char of the word accessing the char
  - transform map this to have result numebr
  - return a helper mehtod that gets the distance of the nearest char
  - helper method gets the char, current index and array of chars
- after iteration mapped array is returned
*/

function findNearestVowelDistance(char, currentIdx, arrOfChars) {
  if (char.match(/[aeiou]/)) return 0;
  let distances = [];

  let leftSide = arrOfChars.slice(0, currentIdx);
  leftSide.reverse();
  let nearestLeft = leftSide.findIndex(char => char.match(/[aeiou]/)) + 1;
  if (nearestLeft >= 1) distances.push(nearestLeft);

  let rightSide = arrOfChars.slice(currentIdx + 1);
  let nearestRight = rightSide.findIndex(char => char.match(/[aeiou]/)) + 1;
  if (nearestRight >= 1) distances.push(nearestRight);

  return Math.min(...distances);
}

function hasVowel(word) {
  return word.match(/[aeiou]/gi);
}

function distanceToNearestVowel(word) {
  if (word.length === 0) return null;
  if (!hasVowel(word)) return null;
  word = word.toLowerCase();
  let chars = word.split('');

  return chars.map((char, idx) => {
    return findNearestVowelDistance(char, idx, chars);
  })
}


// all vowels
console.log(distanceToNearestVowel("aaaaa"), [0, 0, 0, 0, 0]);

console.log(distanceToNearestVowel("babbb"), [1, 0, 1, 2, 3]);

console.log(distanceToNearestVowel("abcdabcd"), [0, 1, 2, 1, 0, 1, 2, 3]);

// // vowel can be before or after for example first p chooses the nearest vowel before
console.log(distanceToNearestVowel("shopper"), [2, 1, 0, 1, 1, 0, 1]);

// // no vowels
console.log(distanceToNearestVowel("try"), null);

// // one char
console.log(distanceToNearestVowel("e"), [0]);
console.log(distanceToNearestVowel("t"), null);

// // empty string
console.log(distanceToNearestVowel(""), null);

// // upper case
console.log(distanceToNearestVowel("SHOPPER"), [2, 1, 0, 1, 1, 0, 1]);
// // mixed case
console.log(distanceToNearestVowel("Shopper"), [2, 1, 0, 1, 1, 0, 1]);

// // vowel only at end
console.log(distanceToNearestVowel("tttta"), [4, 3, 2, 1, 0]);
// vowel only at beginning
console.log(distanceToNearestVowel("atttt"), [0, 1, 2, 3, 4]);