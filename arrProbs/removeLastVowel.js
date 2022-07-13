/* 7:45 - 8:16
Write a function that removes the last vowel in each word in a sentence.

Examples

Notes
Vowels are: a, e, i, o, u (both upper and lowercase).

INUPUT - string
OUTPUT - string
REQUIREMENTS
- need to remove last vowel from each word in a sentence
- last vowel doesn't have to be last character to be removed
-  words are separated by spaces
  - so the last word would have punctuation, this is preserved
- within an individual word the last vowel is the one that occurs closest to the end/right side

EXAMPLES/EDGE CASES
- all vowels, may need to trim

DATA STRUCTURES
- string, arrays
- can have a collection of words for analysis, isolate each word and make a change

ALGORITHM
- if necessary handle empty string edge case
- separate into words
- perform transformation on each word
  - remove a vowel - helper method
- convert back to string


SUBPROBLEMS
-> remove last vowel
- take a word 
*/

function removeLastVowelFromWord(str) {
  let reversedChars = str.split('').reverse();
  let targetVowelIdx = reversedChars.findIndex(char => char.match(/[aeiou]/i));

  if (targetVowelIdx >= 0) {
    reversedChars.splice(targetVowelIdx, 1);
  }

  let transformedStr = reversedChars.reverse().join('');

  return transformedStr;
}

function removeLastVowel(str) {
  let words = str.split(' ');
  let wordsWithLastVowelRemoved = words.map(word => {
    return removeLastVowelFromWord(word)

  })
  return wordsWithLastVowelRemoved.join(' ');
}

// generic cases, vowels removed in standard way
console.log(removeLastVowel("Those who dare to fail miserably can achieve greatly.") === "Thos wh dar t fal miserbly cn achiev gretly.");
console.log(removeLastVowel("Love is a serious mental disease.") === "Lov s  serios mentl diseas.");
console.log(removeLastVowel("Get busy living or get busy dying.") === "Gt bsy livng r gt bsy dyng.");

// no vowels removed
console.log(removeLastVowel('rth jkl rws drt mnbwsq') === 'rth jkl rws drt mnbwsq');
// all vowels, all removed
console.log(removeLastVowel('aeiou aei ouae') === 'aeio ae oua'); // may need to trim
console.log(removeLastVowel('aeiou aei ouae.') === 'aeio ae oua.'); // may need to trim
// // caps
console.log(removeLastVowel('THE THEIF IS GETTING AWAY!') === 'TH THEF S GETTNG AWY!');
// // empty string
console.log(removeLastVowel('') == '');
// // single string
console.log(removeLastVowel('t') == 't');
console.log(removeLastVowel('a') == '');


