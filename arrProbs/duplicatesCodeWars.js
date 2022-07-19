/* 9:39
You are given a table, in which every key is a stringified number, and each
corresponding value is an array of characters, e.g.

{
  "1": ["A", "B", "C"],
  "2": ["A", "B", "D", "A"],
}
Create a function that returns a table with the same keys, but each
character should appear only once among the value-arrays, e.g.

{
  "1": ["C"],
  "2": ["A", "B", "D"],
}
Rules
Whenever two keys share the same
 character, they should be compared numerically,
and the larger key will keep that character. That's why in the example above the
array under the key "2" contains "A" and "B", as 2 > 1.
If duplicate characters are found in the same array, the first occurance should be kept.

Note: In preparation for the 216, think about edge cases, input validation, code organization etc. Even though codewars problems don't focus on edge cases, add your own caveats for extra challenge ;) For instance: what if there are lowercase letters in the arrays?

INPUT - "table" object with nested arrays
OUTPUT - "table" but modifed from original
REQUIREMENTS
- "table" is an object with key/val pairs, values are arrays of characters, stringified number is just the key
- each character from the arrays should appear only once across all arrays,
  - no duplicates
- Arrays should be compared "numerically"
  - the larger array (in terms of key size) will keep the character NOT the array that happens to appear first
- If duplicate chars in same array, the first instance should be kept
- in output keys are ordered in ascending order

- comparison between the keys/indexes
- unique/duplicates
- selection

QUESTION
- will all chars in the array be capitalized? - also hanlde lowercase, upper/lower can be considered different
- will array of chars only contain strings?
- will keys always be positive integers
- will all strings just be letters a-z upper or lower and also just one character in size, not multiple chars
- will the object always have key/val pairs or be empty?

TEST CASES/EDGE CASES

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- values of the objects [[c, f, g], [a, b, c]...]
- key/val pairs [[1, [c, f, g]], [2, [a, b, c]...]]
- when considering the key, consider it's numeric value

APPROACHES/HIGH LEVEL
1. get all entries of the object, transform each of the entries (each one is in the result), iterate over each entry and perform selection on the array that is present. The criteria would be to check each letter and make sure that it is not present twice in it's own array (unique in its own array) and that the letter is not present in an array of a higher key (helper method comparison)
2. 

ALGORITHM
- handle edge case of an empty object
- convert to an array of entries, careful with nesting
  - [["1", ['c', 'f', 'g']], ...]
- perform a high level transformation, this will return a new subarray
  - the number of subarrays (key/val pairs) is preserved
- perfrom a nested selection
  - this will be on index 1 of the subarray - which is an array itself, arr of chars
  - we want to return an array (transformation) with the same string number unchanged
  - the second element, first index will be an array where selection is performed
- on the nested array of chars
  - select based off of appears in the highestKeyedArray (helper method)
  - iterating over the character
  - that character, and the number for the key
- this would give the data structure where an character will only appear in the highest array
- now need to perfomr a second selection just to remove duplicates from a single array
  - perform a similar transformation and selection
  - on each iteration return the same subarray of key and [chars]
  - but select the chars based off of unique
    - so really just a unique helper method could be returned
- sor these subarrays in ascending order using the value at index 0 of every subarray
- be sure to convert to a number
- convert back to object ussing from entries


SUBPROBLEMS
- selectHighestKeyedChars(the char and the key)
  - [["1", ['c', 'f', 'g']], ...] and the individual entry
  - given all entries and an individual entry
  - return an array of characters
  - iterate over each character in the subarray of the individual entry
  - select this based off of if it only occurs in the highest keyed array (helper method)
  - feed this character and the key to the helper method, along with all entries for comparison


  - highestkeyed array
  - given a character, an key number, and all entries
  - i want to select only the entries with a greater key
  - iterate over these and check to see if any of the subarrays includes the given char
  - if they do return false -> it appears in an array of a higher key
  - at end of iteration return true, it's in the highest

-> unique array of chars
*/

function keyAsc(a, b) {
  let aNum = Number(a[0]);
  let bNum = Number(b[0]);

  return aNum - bNum;
}

function unique(arr) {
  let results = [];
  arr.forEach(char => {
    if (!results.includes(char)) results.push(char);
  })
  return results;
}

function selectHighestKeyedChars(entry, entries) {
  let key = entry[0];
  let charsArr = entry[1];
  let highestChars = charsArr.filter(char => {
    return highestKeyed(char, key, entries);
  })
  return unique(highestChars);
}

function highestKeyed(char, key, entries) {
  let higher = entries.filter(entry => {
    return Number(entry[0]) > Number(key);
  })

  for (let i = 0; i < higher.length; i += 1) {
    let subArr = higher[i][1];
    if (subArr.includes(char)) return false;
  }
  return true;
}



function organizeLetters(obj) {
  if (Object.keys(obj).length === 0) return {};
  
  let entries = Object.entries(obj);
  
  let organized = entries.map(entry => {
    return [entry[0], selectHighestKeyedChars(entry, entries)];
  });
  
  let ascOrganized = organized.sort(keyAsc);

  return Object.fromEntries(ascOrganized);
}

let input1 = {
  "1": ["C", "F", "G"],
  "2": ["A", "B", "C"],
  "3": ["A", "B", "D"],
}


// TESTING
// let input3 = {
//   "432": ["A", "A", "B", "D"],
//   "53": ["L", "G", "B", "C"],
//   "236": ["L", "A", "X", "G", "H", "X"],
//   "11": ["P", "R", "S", "D"],
// }
// let entries = Object.entries(input3);

// let entry =  ["236", ["L", "A", "X", "G", "H", "X"]]

// // console.log(highestKeyed('D', '11', entries));

// console.log(selectHighestKeyedChars(entry, entries));
// END TESTING

// output = {
//   "1": ["F", "G"],
//   "2": ["C"],
//   "3": ["A", "B", "D"],
// }

// console.log(organizeLetters(input1));
let input2 = {
  "1": ["A"],
  "2": ["A"],
  "3": ["A"],
}
// console.log(organizeLetters(input2));
// output = {
//   "1": [],
//   "2": [],
//   "3": ["A"],
// }


let input3 = {
  "432": ["A", "A", "B", "D"],
  "53": ["L", "G", "B", "C"],
  "236": ["L", "A", "X", "G", "H", "X"],
  "11": ["P", "R", "S", "D"],
}
// console.log(organizeLetters(input3));
// // output = {
// //   "11": ["P", "R", "S"],
// //   "53": ["C"],
// //   "236": ["L", "X", "G", "H"],
// //   "432": ["A", "B", "D"],
// // }

// // duplicates removed from one array
// let input4 = {
//   "1": [],
//   "2": [],
//   "3": ["A", "A", "A"],
// }
// console.log(organizeLetters(input4));
// // output = {
// //   "1": [],
// //   "2": [],
// //   "3": ["A"],
// // }

// // case
// let input5 = {
//   "1": ['a', 'b', 'c'],
//   "2": [],
//   "3": ["A", "B", "C"],
// }
// console.log(organizeLetters(input5));
// // output = {
// //   "1": ['a', 'b', 'c'],
// //   "2": [],
// //   "3": ["A", 'B', 'C'],
// // }

// // all arrays are empty

// let input6 = {
//   "1": [],
//   "2": [],
//   "3": [],
// }
// console.log(organizeLetters(input6));
// // output = {
// //   "1": [],
// //   "2": [],
// //   "3": [],
// // }

// // keys out of order
// let input7 = {
//   "1": [],
//   "25": [],
//   "3": [],
// }
// console.log(organizeLetters(input7));
// // output = {
// //   "1": [],
// //   "3": [],
// //   "25": [],
// // }

// all arrays share same values
let input8 = {
  "1": ['a', 'b'],
  "2": ['a', 'b'],
}
console.log(organizeLetters(input8));
// output = {
//   "1": [],
//   "2": ['a', 'b'],
// }




/*
function organizeLetters(obj) {
  let entries = Object.entries(obj).sort((a, b) => a[0] - b[0] )
  entries = entries.map(([key, arrayOfChars]) => [key, [...new Set(arrayOfChars)]])

  console.log(entries)
  
  for (let i = entries.length - 1; i > 0; i--) {
    const outerArrayOfChars = entries[i][1];

    for (let j = i - 1; j >= 0; j--) {
      const innerArrayOfChars = entries[j][1];

      outerArrayOfChars.forEach(char => {
        if (innerArrayOfChars.includes(char)) {
          const index = innerArrayOfChars.indexOf(char)
          innerArrayOfChars.splice(index, 1);
        }
      }) 
    }
  }

  return Object.fromEntries(entries)
}
*/