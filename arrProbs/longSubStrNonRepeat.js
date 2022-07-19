/* 5:16 5:46
Longest Substring with Non-repeating Characters
Write a function that returns the longest non-repeating substring for a string input.


If multiple substrings tie in length, return the one which occurs first.

INPUT - string
OUTPUT - string
REQUIREMENTS
- substring - is aporiton of a string, it can be the string itself for this question
- non repeating - means that no character can repeat twice
- if multiple occur, return the one that occurs first

QUESTIONS
- handle empty strings? 'yes'
- handle case? different case? or always lowercase?

DATA STRUCTURES/INTERMEDIATE DATA STRUCTURCES
- [all substrings] [a, ab, abc, abca... b, bc, bca....]
- [non repeating substrings]

APPROACHES / HIGH LEVEL
1. first create all substrings of the given string, then select these based off of no repetion of any character (could do sort of a count of character based off of that string if any are more than one reject it). then just stable sort based off of length and that would give the longest non repeating substring

ALGORITHM
- if ncessary handle empty string edge case
- create an array of all substrings
- perform selction on this bassed of of if there is any repetion of any char (strinct equality)
  - helper mehtod that takes a string and returns a boolean
- will have an array of substrings that don't repeat
- stable sort off of length / do this manually and set the longest string to empty
  - any string that is longer reset it
- at the end can return that string

SUBPROBLEMS
-> generating an array of all substrings

-> noCharRepettion(str)
- create empty results, iterate over each char, set to 1 or increment
- get the values array of object
- return ! some for greater than 1
*/

function noCharRepetition(str) {
  let charCounts = {};
  for (let char of str) {
    if (charCounts[char]) {
      charCounts[char] += 1;
    } else {
      charCounts[char] = 1;
    }
  }

  let counts = Object.values(charCounts);
  return !counts.some(count => count > 1);
}

function findAllSubstr(str) {
  let results = [];
  for (let i = 0; i < str.length; i += 1) {
    for (let j = i + 1; j <= str.length; j += 1) {
      results.push(str.slice(i, j));
    }
  }
  return results;
}

function longestNonrepeatingSubstring(str) {
  let allSubStr = findAllSubstr(str);

  let nonRepeatSubStr = allSubStr.filter(substr => {
    return noCharRepetition(substr);
  });

  let longestSubStr = "";
  nonRepeatSubStr.forEach(substr => {
    if (substr.length > longestSubStr.length) {
      longestSubStr = substr;
    }
  })
  return longestSubStr;
}





console.log(longestNonrepeatingSubstring("abcabcbb"), "abc");

console.log(longestNonrepeatingSubstring("aaaaaa"), "a");

console.log(longestNonrepeatingSubstring("abcde"), "abcde");

console.log(longestNonrepeatingSubstring("abcda"), "abcd");

// // longest substring occurs at end of string
console.log(longestNonrepeatingSubstring("abcabd"), "cabd");

// // empty string
console.log(longestNonrepeatingSubstring(""), "");

// // special chars
console.log(longestNonrepeatingSubstring("!@$!@$"), "!@$");
// // special chars - only one
console.log(longestNonrepeatingSubstring("!!!!!!!"), "!");
// // abc instead of bca
console.log(longestNonrepeatingSubstring("abcabca"), "abc");
// // case - non repeating
console.log(longestNonrepeatingSubstring("abcABC"), "abcABC");
// // case - repeating
console.log(longestNonrepeatingSubstring("ABCABC"), "ABC");

