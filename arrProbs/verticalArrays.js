/* 7:05 7:29
Create a function that converts a string into a matrix of characters that can be read vertically. Add spaces when characters are missing.

INPUT - string
OUTPUT - array with subarrays of chars
REQUIREMENTS
- need to take string and convert into matrix of chars
- has to be read vertically
- if a character is missing, add a space where needed
- there are as many columns as there are words
- the longest word will fully fill the column
- the shoreter word will use spaces to fill the column
- the case goes over

QUESTIONS
- no special chars,

DATA STRUCTURES
- array, and columns come into play, possibly a sort of transposition

SUBPORBLEMS
- take an array of words
- find the longest word length
- iterate over all and transform with padEnd
- return array of words of same length

ALGORTIHM
- handle edge case of empty string
- have to analysis at word level. separate into an array of words
  - transform each word to match the longest word length and just add spaces on the end
    - padEnd(totalLength, padding)
- find the longest word and save the length - this is important number of rows
- set up a results array
  - send as many subarrays to the results array as length of longest word
  - data structure of empty subarrays that can receive data
- iterate over each word
  - on each word iterate over each char accessing the index
  - send that character to the corresoonding subarray of results (the index of the char matches the destination row)
- question of shorter words

*/

function longestWord(arr) {
  let longest = -Infinity;
  arr.forEach(word => {
    if (word.length > longest) {
      longest = word.length;
    }
  })
  return longest;
}

function nestedSubArrays(longest) {
  let results = [];
  for (let i = 1; i <= longest; i += 1) {
    results.push([]);
  }
  return results;
}

function verticalText(str) {
  if (str === '') return [];
  let words = str.split(' ');
  let longest = longestWord(words);
  let results = nestedSubArrays(longest);

  words = words.map(word => {
    return word.padEnd(longest, ' ');
  })

  words.forEach(word => {
    for (let charIdx = 0; charIdx < word.length; charIdx += 1) {
      results[charIdx].push(word[charIdx]);
    }
  })
  return results;
}



console.log(verticalText("Holy bananas"))
// //  [
// //   ["H", "b"],
// //   ["o", "a"],
// //   ["l", "n"],
// //   ["y", "a"],
// //   [" ", "n"],
// //   [" ", "a"],
// //   [" ", "s"]
// // ]

console.log(verticalText("Hello fellas"))
// //  [
// //   ["H", "f"],
// //   ["e", "e"],
// //   ["l", "l"],
// //   ["l", "l"],
// //   ["o", "a"],
// //   [" ", "s"]
// // ]

console.log(verticalText("fellas Hello"))
// //  [
// //   ["f", "H"],
// //   ["e", "e"],
// //   ["l", "l"],
// //   ["l", "l"],
// //   ["a", "o"],
// //   ["s", " "]
// // ]

// // empty string
console.log(verticalText("")) // ""

// // one word
console.log(verticalText("abc"));
// /*
// [
//   ['a'],
//   ['b'],
//   ['c']
// ]
// */
// // once char

console.log(verticalText("a")); // [['a']];

// // multiple words
console.log(verticalText('back once again'))
// /*
// [
//   ['b', 'o', 'a'],
//   ['a', 'n', 'g'],
//   ['c', 'c', 'a'],
//   ['k', 'e', 'i'],
//   [' ', ' ', 'n'],
// ]
// */

