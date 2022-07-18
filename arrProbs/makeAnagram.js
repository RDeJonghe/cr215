/* 7:13 7:47

Given two strings, that may or may not be of the same length, determine the minimum number of character deletions required to make an anagram. Any characters can be deleted from either of the strings.

Examples

console.log(makeAnagram("cde", "abc"), 4);
// Remove d and e from cde to get c.
// Remove a and b from abc to get c.
// It takes 4 deletions to make both strings anagrams.

INPUT - strings
OUTPUT - number
REQUIREMENTS
- strings may be different lengths
- determine the minimum number of chars you need to delete to make any anagram
  - anagaram when a word can be rearranged to form another word
- any chars can be deleted from any of the strings
- definition for the problem is that the two words consist of the same chars
  - so have to delete chars until this is the case

QUESTIONS
- is "a" and "a" considered an anagram for the problem? yes
- is "" and "" considered an anagram for the problem? yes

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- arrays, strings
- intermediate data structure could be array of all string combinations of the word
  - ['f', 'fcr'...] but this would be length and complex to build

APPROACHES / HIGH LEVEL
1. make data structures for each string, this would be all of the word combinations, and then could compare and choose the anagrams between each, find the longest anagram and then calc how many letters were removed
2. start a counter and a loop and remove chars one at a time doing a comparison between the two words and removing chars that don't exist
3. do an "inventory" of all the chars of each word, so just count each word. Then do sort of a comparison between the letter counts calculating what needs to be removed to make the counts equal, the counts need to end up equal

ALGORITHM
- set up a count object for each string that will contain the count of all of the letters
- set up a difference counter
- need to iterate over both keys in case one string has letters that the other doesn't
  - first iteration, iterate over all
    - if undefined increment it by the count (doesn't exist in the other - needs to be deeleted)
    - otherwise increment by math.abs of the subtraction between the two objects
  - second iteration
    - only count if it doesn't exist in the first object (undefined)
    - if it does exist then it's already been counted, don't count it
- at the end of iteration should have a good count of the difference


SUBPROBLEMS
-> count all letters of a string and store in object

-> find longer object
- can do the keys and check the length
- then set it to longer and shorter keys
*/

function countLetters(str) {
  let results = {};
  for (let char of str) {
    if (results[char]) {
      results[char] += 1;
    } else {
      results[char] = 1;
    }
  }
  return results;
}

function makeAnagram(str1, str2) {
  let str1Counts = countLetters(str1);
  let str2Counts = countLetters(str2);
  let str1Keys = Object.keys(str1Counts);
  let str2Keys = Object.keys(str2Counts);
  let differenceCounter = 0;

  str1Keys.forEach(key => {
    if (str2Counts[key] === undefined) {
      differenceCounter += str1Counts[key];
    } else {
      differenceCounter += Math.abs(str1Counts[key] - str2Counts[key]);
    }
  })

  str2Keys.forEach(key => {
    if (str1Counts[key] === undefined) {
      differenceCounter += str2Counts[key];
    } else {
      if (!str1Keys.includes(key)) {
        differenceCounter += Math.abs(str2Counts[key] - str1Counts[key]);
      }
    }
  })

  return differenceCounter;
}




console.log(makeAnagram("fcrxzwscanmligyxyvym", "jxwtrhvujlmrpdoqbisbwhmgpmeoke"), 30);

console.log(makeAnagram("showman", "woman"), 2);

// // no deletions requried
console.log(makeAnagram("abc", "cba"), 0);

// // all deletions to empty string - 3 from each
console.log(makeAnagram("abc", "xyz"), 6)

// // down to one char
console.log(makeAnagram("cde", "abc"), 4);

// // one char equal, 0 deletions
console.log(makeAnagram('a', 'a'), 0);

// // empty string zero deletions
console.log(makeAnagram('', ''), 0);

// // one char needed to delted
console.log(makeAnagram('a', ''), 1);

// // general case
console.log(makeAnagram('mike', 'michael'), 5)
