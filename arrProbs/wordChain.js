/* 8:43
Let's update our previous word-chain definition. In this 2.0 version, a word-chain is an array of words, where the next word is formed by either:

Changing exactly one letter from the previous word.
Adding or subtracting one letter.


Notes
You can only do one (not both) for each word change.
All words will be in lower-case.

INPUT - array of strings
OUTPUT - boolean
REQUIREMENTS
- relationship between current word and next word is central to problem
- a word chain is if all words meet a criteria of making the chain
- critieria is that the next word can:
  - change exactly one letter from the previous word (one letter changed)
  - OR (not both)
  - adding or subtracticng one letter (length of word changes, it can be longer or it can be shorter)

QUESTIONS
- can array be empty? yes
- will elements always be strings? yes
- can strings be empty - yes
- case, should I handle case? - case insensitive, treat as same letters
- special characters? - yes hanlde special chars

EXAMPLES/TEST CASES

DATA STRUCTURES/INTERMEDIATE
- {a: 1, e: 2...} counts for all of the letters object
- also values for these counts so an array of counts

APPROACH HIGH LEVEL
1. need to check if every word meets criteria and this means that only one letter is changed or only one letter added or removed and not both - can do a count of all of the chars between the words and compare the counts. so you could analyze the counts and the word lengths and return a boolean
2. iterate and check current word and next word, can sort both of these, if their length is the same then they have to have exactly one character different. If their length is different, then also one character has to be different (this is just the extra character)

ALGORITHM
- handle edge cases of too short of an array or the presence of empty strings, return false
- start iteration at element index 1
- iterate over each word in a way that will allow for breaking iteration to return false
- on each iteration check if a word meets criteria (helper method)
  - if it doesn't meet criteria return false
- at end of iteration return true

SUBPROBLEMS
- meets criteria (takes current word and previous word)
- take the both words, create a count of each char
- return one of the helper methods being true (XOR);
- check if both are true return false
- check if both are false return false
- otherwise return true


- it needs one char different but same length
- check if length is the same, if not return false
- given 2 count objects
- set up a differnt count
- iterate over all the keys
- compare key by key both objects
  - if different increment the count
- return count === 1; 'hello' 'hello' => 0 false "teal" meat => 2

- different length all chars equal but one
- "row", "crow"
- row, roww 
- determine the longer of the two words
  - check to make sure that this is exaclty one char longer
  - if not return false (needs to be one char longer)
- iterate over the shorter word key
  - check that each key of both counts is exactly equal
  - if not return false
- at the end return true

*/

function testDifferentLength(previousWord, currentWord) {
  if (previousWord.length === currentWord.length) return false;
  let longerCounts;
  let shorterCounts;
  if (previousWord.length > currentWord.length) {
    longerCounts = countChars(previousWord);
    shorterCounts = countChars(currentWord);
  } else {
    longerCounts = countChars(currentWord);
    shorterCounts = countChars(previousWord);
  }
  
  let shorterKeys = Object.keys(shorterCounts);
  let differenceCount = 0;
  shorterKeys.forEach(key => {
    if (longerCounts[key] !== shorterCounts[key]) differenceCount += 1;
  })
  return differenceCount <= 1;
} 

function testOneDifferent(previousWord, currentWord) {
  if (previousWord.length !== currentWord.length) return false;
  let previousCounts = countChars(previousWord);
  let currentCounts = countChars(currentWord);
  let differenceCount = 0;
  let previousKeys = Object.keys(previousCounts);

  previousKeys.forEach(key => {
    if (previousCounts[key] !== currentCounts[key]) differenceCount += 1;
  })
  return differenceCount === 1;
}


function meetsCriteria(previousWord, currentWord) {
  let oneDifferent = testOneDifferent(previousWord, currentWord);
  let differentLength = testDifferentLength(previousWord, currentWord);

  if (oneDifferent && differentLength) return false;
  if (!oneDifferent && !differentLength) return false;
  return true;
}


function isWordChain(arr) {
  if (arr.length < 2) return false;
  if (arr.includes('')) return false;
  let words = arr.map(word => word.toLowerCase());

  for (let i = 1; i < words.length; i += 1) {
    let currentWord = arr[i];
    let previousWord = arr[i - 1];
    if (!meetsCriteria(previousWord, currentWord)) return false;
  }
  return true;
}

function countChars(word) {
  let results = {};
  word.split('').forEach(char => {
    if (results[char]) {
      results[char] += 1;
    } else {
      results[char] = 1;
    }
  })
  return results;
}


// console.log(isWordChain(["row", "crow", "crown", "brown", "brawn"])); // true
// // // add "c" to "row" to get "crow", "n" to get "crown", etc.

// // // letters removed and word gets shorter
// console.log(isWordChain(["flew", "flaw", "flan", "flat", "fat", "rat", "rot", "tot"])); // true

console.log(testDifferentLength('meat', 'teal'))
// testOneDifferent(previousWord, currentWord)

console.log(isWordChain(["meek", "meet", "meat", "teal"])); // false
// // "meat" => "teal" changes 2 letters (can only change 1).

// isWordChain(["run", "runny", "bunny"]) // false
// // "run" => "runny" adds 2 letters (can only add 1).

// // empty array
// console.log(isWordChain([])); // false no word chaing to check
// // one word
// console.log(isWordChain(['hello'])); // false
// // longer and longer chain of just adding a letter
// console.log(isWordChain(['a', 'ab', 'abc', 'abcd'])); // true
// // shorter and shorter chain by substracting a letter
// console.log(isWordChain(['abcd', 'abc', 'ab', 'a']));
// // just alternating a char
// console.log(isWordChain(['abc', 'abz', 'aby'])); // true
// // special chars
// console.log(isWordChain(['ab$', 'abc'])); // true
// ignore case
// console.log(isWordChain(['Abc', 'abz'])); // true, case is ignored A and a are equivalent
// empty string breaks chain
// console.log(isWordChain(['abc', '', 'a'])); // false
// // empty stirng - invalid input
// console.log(isWordChain(['', 'a', 'ab'])); // false
// // same word is not a chain, a change needs to happen
// console.log(isWordChain(['hello', 'hello', 'hella'])); // false



function isValidPair(word1, word2) {
  if (word1.length === word2.length - 1) {
    // return true if word1 can be made by exactly removing 1 character from word2
    return word2.split('').some((_, idx) => {
      const charsCopy = word2.split('');
      charsCopy.splice(idx, 1);
      const word2withCharacterRemoved = charsCopy.join('');
      return word1 === word2withCharacterRemoved;
    });
  } else if (word1.length === word2.length) {
    // return true if exactly one character different
    let charsDifferent = 0;
    for(let idx = 0; idx < word1.length; idx++) {
      if (word1[idx] !== word2[idx]) charsDifferent += 1;
    }
    return charsDifferent === 1;
  } else {
    // return false in all other case
    return false;
  }
}

function isWordChain(words) {
  if (words.length <= 1) return false;

  for(let idx = 0; idx <= words.length - 2; idx++) {
    const currentWord = words[idx];
    const nextWord = words[idx + 1];

    if (!isValidPair(currentWord, nextWord) && !isValidPair(nextWord, currentWord)) {
      return false;
    }
  }

  return true;
}

console.log(isWordChain(["row", "crow", "crown", "brown", "brawn"]), true);
// add "c" to "row" to get "crow", "n" to get "crown", etc.

// letters removed and word gets shorter
console.log(isWordChain(["flew", "flaw", "flan", "flat", "fat", "rat", "rot", "tot"]), true);

console.log(isWordChain(["meek", "meet", "meat", "teal"]), false);
// // "meat" => "teal" changes 2 letters (can only change 1).

console.log(isWordChain(["run", "runny", "bunny"]), false);
// "run" => "runny" adds 2 letters (can only add 1).