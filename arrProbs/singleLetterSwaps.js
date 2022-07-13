/* 10:06 10:37
Given an array of strings and an original string, write a function to output an array of boolean values - true if the word can be formed from the original word by swapping two letters only once and false otherwise.

Original string will consist of unique characters.

INPUT - array of strings, strings can be numbers or letters, and a single string
OUTPUT array of booleans
REQUIREMENTS
- need to check if the word in the array can be made from the original word by only swapping two letters exactly once
  - so the array word has to be changed to match the given by this two char swap
  - no swap is false, need exactly two chars swapped
  - more than two chars swapped is also false
- original string has all unique chars to compare with

EXAMPLES/EDGE CASES
- case matters, yes case sensistive
- do we have to deal with spaces? - no
- do we have to test that given string is all unique - no, given will always be unique
- empty array, empty string - return empty array
- special chars, numbers - yes

DATA STRUCTURES - array

ALGORITHM
- handle edge cases of empty data
- create an array of all two swap possibilities
- iterate over the array performing transformation
- on each iteration return a helper mehtod that returns a boolean
  - this will check if only two letters need to be swapped to make the original word
  - takes original str and an array of all of the two possibliites
  - check if its the original word, just return false if so
  - iterate over all the possibilites with some and check if === equal to targrt word
- after iteration we have the array of booleans

SUBPROBLEMS
-> test if a given str can match a target str by swapping only two chars
- if the strings are equal return false no swap
- high level -> take the string and find all two swap possibilities
  - this would give us an array of two swap possibilities
  - then could iterate over this and find out if any of the two swap possibilities equal the given string
  - if so return true
-> find all two swap possibilities
  - need to exchange two different chars and then join togheter
  - this needs to be done for all string possibilities
  - works like pairs but more complex in that you need to also join
- given a string
  - convert to an array each time, each time we want a fresh array
  - iterate over 2 indeices to identify the chars to be removed, track index of these
  - can use array swap syntax to swap these out
  - join together to see if the words match
*/


function swapAllTwoCharsPairs(arrayWord) {
  let results = []

  for (let firstIdx = 0; firstIdx < arrayWord.length - 1; firstIdx += 1) {
    for (let secondIdx = firstIdx + 1; secondIdx < arrayWord.length; secondIdx += 1) {
      let charsArr = arrayWord.split('');
      [charsArr[firstIdx], charsArr[secondIdx]] = [charsArr[secondIdx], charsArr[firstIdx]];
      results.push(charsArr.join(''));
    }
  }
  return results;
}

function hasTwoSwapEqualToOriginal(arrayWord, targetWord, arrayOfSwaps) {
  if (arrayWord === targetWord) return false;

  return arrayOfSwaps.some(swappedWord => swappedWord === targetWord);
}

function validateSwaps(array, targetWord) {
  if (array.length === 0 || targetWord.length === 0) return [];

  return array.map(arrayWord => {
    let arrayOfSwaps = swapAllTwoCharsPairs(arrayWord);
    return hasTwoSwapEqualToOriginal(arrayWord, targetWord, arrayOfSwaps);
  })
}

console.log('1', validateSwaps(["BACDE", "EBCDA", "BCDEA", "ACBED"], "ABCDE"), [true, true, false, false])
// // Swap "A" and "B" from "ABCDE" to get "BACDE".
// // Swap "A" and "E" from "ABCDE" to get "EBCDA".
// // Both "BCDEA" and "ACBED" cannot be formed from "ABCDE" using only a single swap.

// // same word, false no swap
console.log('a', validateSwaps(["ABCDE"], "ABCDE"), [false]);

// // different case
console.log('b', validateSwaps(["EBCDA", "ebcda"], "ABCDE"), [true, false]);

// // empty string/emppty array
console.log('c', validateSwaps([], "ABCDE"), []);
console.log('d', validateSwaps(["EBCDA", "ebcda"], ""), []);
console.log('e', validateSwaps([], ""), []);

// // special chars
console.log('f', validateSwaps(["&$!", "&!$"], "!$&"), [true, false]);

// // given examples
console.log('2', validateSwaps(["32145", "12354", "15342", "12543"], "12345"), [true, true, true, true])

console.log('3', validateSwaps(["9786", "9788", "97865", "7689"], "9768"), [true, false, false, false])