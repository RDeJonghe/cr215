/* 10:25 10:53
Abbreviations Unique?
You are given two inputs:

An array of abbreviations.
An array of words.
Write a function that returns true if each abbreviation uniquely identifies a word, and false otherwise.

Notes
Abbreviations will be a substring from [0, n] from the original string.

INPUT - array of abbreviations, array of words
OUTPUT - boolean
REQUIREMENTS
- need to check if each abbreviation UNIQUELY identifies a word
  - if all of them do return true, otherwise false
- abbreviations are all substrings from the given strings
  - so they are shorter

QUESTIONS 
- will there always be the same number of abbreviations as words - yes
- will arrays only contain strings? yes
- does case matter? yes, handle case
- sepecial chars, spaces?, extra spaces/whitespace, numbers? no,

SUBPROBLEMS
- check abbreviation
  - given an abbreviation and an index

ALGORITHM
- given two arrays
- need to consider each abbreviation
  - each abbreviation can only identify just one of the words
  - so it can't identify two, so need to check all and make sure it only identifies just one
  - index here is corresponding
    - so can check each abbreviation with just the two that don't index corresponding
  - can just check to make sure that it's not a substring

- handle edge cases of empty or one element arrays
- iterate over every abbreviation with every and index
  - check that it isn't a substring with the two words that don't correspond from the results array
  - as long as they don't match it's good, it's uniquiely identifiying just one
- every will return needed boolean


SUBPROBLEMS
- check abbreviation
  - given an abbreviation and an index, and array of words
  - need to separate and find correct words based off of index
  - selection, select all the words that don't have that index
  - this will give array of two words
  - iterate over this checking that none of the words has the given str as a substring
*/

function uniqueIdentifies(abbrev, idx, words) {
  let otherWords = words.filter((word, wordIdx) => {
    return wordIdx !== idx;
  })

  return otherWords.every(word => {
    return !word.startsWith(abbrev);
  })
}


function uniqueAbbrev(abbrevs, words) {
  if (abbrevs.length === 0 || words.length === 0) return null;
  if (abbrevs.length === 1) return true;

  return abbrevs.every((abbrev, idx) => {
    return uniqueIdentifies(abbrev, idx, words);
  })
}

// failing case
console.log(uniqueAbbrev(["ho", "h", "ha"], ["house", "hope", "happy"]), false);
// "ho" and "h" are ambiguous and can identify either "house" or "hope"

// failing case changed to pass
console.log(uniqueAbbrev(["hou", "hop", "ha"], ["house", "hope", "happy"]), true);

console.log(uniqueAbbrev(["s", "t", "v"], ["stamina", "television", "vindaloo"]), true);

// failing case the ba isn't unique could identify both
console.log(uniqueAbbrev(["bi", "ba", "bat"], ["big", "bard", "battery"]), false);

// passing case
console.log(uniqueAbbrev(["mo", "ma", "me"], ["moment", "many", "mean"]), true);

// empty arrays return null
console.log(uniqueAbbrev([], []), null);

// one word pass - one word will always pass, it's a substring per requirements
console.log(uniqueAbbrev(["mo"], ["moment"]), true);

// case difference makes this pass
console.log(uniqueAbbrev(["bi", "Ba", "bat"], ["big", "Bard", "battery"]), true);

