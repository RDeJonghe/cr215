/* 5:32 6:04

Letters Formed from the Longest Word
Write a function that returns true if all the strings in an array can be formed by using only the characters from the longest string.

There will only be one unique longest string.

INPUT - array of words
OUTPUT - boolean
REQUIREMENTS
- need to find if all words int he array can be made only using the characters from the longest string
- there is only one unique longest string, so no confusion about longest string
- words need to be spelled only by using same chars from longest word

QUESTIONS
- duplicate chars, each char counts once, can't use the same char multiple times if it's only once in the longest - yes
- case, does case matter? - ignore case, use chars independendtly of case
- special chars? - yes, handle these

EXAMPLES/TEST CASES

DATA STRUCTURES/INTERMEDIATE DATA STRUCTURES
- arrays 
- array of chars of longest word [m, a, n, i, f...]
- count of the chars of longest word and count of chars of the other words {a:1, b:2, c:...}

APPROACHES / HIGH LEVEL
1. identify the longest word and count all chars in an object. then iterate over all of the words in the array. on each word test to see if all characters have a count equal or less than the characters of the longest word. so a char by char comparison. if any are greater or don't exist in the given word return false
2. 

ALGORITHM
- handle case of empty array
- downcase the string to handle case
- identify longest word by iterating and setting it (helper mehtod)
- make a count object for each char of the longest word and save
- iterate over all of the words using every to check
  - on each iteration have to compare counts (helper method)
  - it checks to see that the counts of all of the chars of the word are less than or equal to that in the longest word - CAREFUL to handle letters that don't exist in longest word
- this will return the boolean we need

SUBPROBLEMS
-> identify longest word
-> count chars of a word, return an object

-> compare counts the longestWord counts and a string, returns a boolean
- create counts for the given current word (object)
- iteerate over all of the keys for this current word object with every
- access the counts from both objects
  - if the count exists in the longest word
    - return that the count of the current word <= longestWord
  - else
    - return false if it doesn't exist
*/
function countSmallerOrEqualToLongest(word, longestCounts) {
  let currentCounts = countChars(word);
  let currentKeys = Object.keys(currentCounts);

  return currentKeys.every(key => {
    if (longestCounts[key]) {
      return currentCounts[key] <= longestCounts[key];
    } else {
      return false;
    }
  });
}

function countChars(word) {
  let results = {};
  for (let char of word) {
    if (results[char]) {
      results[char] += 1;
    } else {
      results[char] = 1;
    }
  }
  return results;
}

function findLongestWord(arr) {
  let longestWord = '';
  arr.forEach(word => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  })
  return longestWord;
}

function canForm(arr) {
  if (arr.length === 0) return false;
  arr = arr.map(word => word.toLowerCase());
  let longestWord = findLongestWord(arr);
  let longestWordCounts = countChars(longestWord);

  return arr.every(word => {
    return countSmallerOrEqualToLongest(word, longestWordCounts);
  })
}





console.log(canForm(["mast", "manifest", "met", "fan"])); // true

console.log(canForm(["may", "master", "same", "reams"])); // false

console.log(canForm(["may", "same", "reams", "mastery"])); // true

// // can't use same char twice, can't use l twice
console.log(canForm(['michaelo', 'hello'])); // false

// // single string
console.log(canForm(['hello'])); // true

// // single char
console.log(canForm(['h'])); // true

// // case doesn't matter
console.log(canForm(['MICHAELLO', 'hello'])); // true

// // special chars
console.log(canForm(['hello!', 'he!'])); // true

// // none can be spelled
console.log(canForm(['hello', 'abc', 'cba', 'xyz', 'wtr'])); // false

// // no words given
console.log(canForm([])) // false


