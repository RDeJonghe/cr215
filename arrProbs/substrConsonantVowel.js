/* 7:47
Write two functions:

One to retrieve all unique substrings that start and end with a vowel.
One to retrieve all unique substrings that start and end with a consonant.
The resulting array should be sorted in lexicographic ascending order (same order as a dictionary).;

Remember the output array should have unique values.
The word itself counts as a potential substring.
Exclude the empty string when outputting the array.

INPUT - string
OUTPUT - array of strings, can be empty
REQUIREMENTS
- need to finde all substrings that start and end with vowel
- need to find all substrings that start and end with consonant
- only unique values
- single chars count for start/end with
- sort the array in alphabetical order
- can use the word itself if it meets critiera

EXAMPLES/EDGE CASES

DATA STRUCTURES/INTERMEDIATE DATA STRUCTURES
- find all substrings so array of substrings, with this can perform selection

APPORACHES
1. find all substrings, then from here perform selections
2. can't think of other alternative to finding all substrings first

ALGORITHM
- if necessary handle edge case of empty string
- get an array of all substrings (helper method)
- perform selection based off of starts with or ends with vowel (helper mehtod)
- returnt his array

SUBPROBLEMS
- find all substrings

- starts with and ends with
- set up a constant for regex for vowel or consonant depending on method, case insensitive
- slice the first and last char from the string
- check that both chars match the regex and returnt his boolean
*/

function allSubStrings(str) {
  let results = [];
  for (let i = 0; i < str.length; i += 1) {
    for (let j = i + 1; j <= str.length; j += 1) {
      results.push(str.slice(i, j));
    }
  }
  return results;
}

function startsAndEndsWithVowel(str) {
  const VOWELS = new RegExp(/[aeiou]/, 'gi');
  let firstChar = str[0];
  let lastChar = str[str.length - 1];

  return firstChar.match(VOWELS) && lastChar.match(VOWELS);
}

function startsAndEndsWithConsonant(str) {
  const CONSONANTS = new RegExp(/[bcdfghjklmnpqrstvwxyz]/, 'gi');
  let firstChar = str[0];
  let lastChar = str[str.length - 1];

  return firstChar.match(CONSONANTS) && lastChar.match(CONSONANTS);
}

function getConsonantSubstrings(str) {
  let substrs = allSubStrings(str);

  return substrs.filter(substr => startsAndEndsWithConsonant(substr));
}

function getVowelSubstrings(str) {
  let substrs = allSubStrings(str);

  return substrs.filter(substr => startsAndEndsWithVowel(substr));
}

console.log(getVowelSubstrings("apple"));
// // ["a", "apple", "e"]
console.log(getVowelSubstrings("hmm"));
// // []
console.log(getConsonantSubstrings("aviation"));
// // ["n", "t", "tion", "v", "viat", "viation"]
console.log(getConsonantSubstrings("motor"));
// // ["m", "mot", "motor", "r", "t", "tor"]
console.log(getVowelSubstrings('a'));
// // ['a'];
console.log(getConsonantSubstrings('z'));
// // ['z'];
console.log(getConsonantSubstrings('aeiou'));
// // []
console.log(getConsonantSubstrings(''));
// // []
console.log(getConsonantSubstrings('!@%$'));
// // []
console.log(getConsonantSubstrings('THOR'));
// // ['T', 'TH', THOR, H, HOR, 'R'];
console.log(getConsonantSubstrings('Thor'));






