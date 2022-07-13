/*
Write a function that groups words by the number of capital letters and returns an array of object entries whose keys are the number of capital letters and the values are the groups.

Notes
The object entries have to be sorted by the number of capital letters.
The groups will be arrays of all words sharing the same number of capital letters.
The groups have to be sorted alphabetically (ignoring case).
Words will be unique.

INPUT - array of words
OUTPUT - array of nested arrays
REQUIREMENTS
- each subarray
  - has a number as first element - this is the count of the uppercase vowels
  - has an array as a second element
    - this contains the words
- in final result sort from highest to lowest
- the arrays of words are sorted alpha ignore case

DATA STRUCTURES - array
INTERMEDIATE DATA STRUCTURE - object

ALGORTIHM
- set up an empty object
- iterate over the words
  - get a count of the number of vowels and save this
  - check if this count exists as a key in the object
    - if it does access the value and push the word to the array at that key
  - if not
    - create that key and set it to an array with this word inside of it
- this will give us the object counts we need
- convert this with object frm entries 
- this will give us the needed array
- now do a dual sort
- iterate over each subarr and sort by first element numerically
- iterate over each subArr and sort alpha

*/

function countCaps(word) {
  let count = 0;
  for (let char of word) {
    if (char.match(/[A-Z]/)) {
      count += 1;
    }
  }
  return count;
}



function grouping(words) {
  let objCounts = {};
  words.forEach(word => {
    let capCount = countCaps(word);
    if (objCounts[capCount]) {
      objCounts[capCount].push(word);
    } else {
      objCounts[capCount] = [word];
    }
  })
  let arrCounts = Object.entries(objCounts);
  arrCounts = arrCounts.map(subArr => {
    return [Number(subArr[0]), subArr[1]];
  })
  arrCounts.forEach(subArr => {
    subArr[1].sort((a, b) => {
      let aWord = a.toLowerCase();
      let bWord = b.toLowerCase();

      if (aWord < bWord) {
        return -1;
      }
      if (aWord > bWord) {
        return 1;
      }
      return 0;
    })

  });
  return arrCounts;
}


console.log(grouping(["HaPPy", "mOOdy", "yummy", "mayBE"]));
/* [
  [0, ["yummy"]],
  [2, ["mayBE", "mOOdy"]],
  [3, ["HaPPy"]]
]*/

console.log(grouping(["eeny", "meeny", "miny", "moe"]));
/* [
  [0, ["eeny", "meeny", "miny", "moe"]]
]*/

console.log(grouping(["FORe", "MoR", "bOR", "tOR", "sOr", "lor"]));
/* [
  [0, ["lor"]],
  [1, ["sOr"]],
  [2, ["bOR", "MoR", "tOR"]],
  [3, ["FORe"]]
]*/
