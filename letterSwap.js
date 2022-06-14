/*
Given an array of strings and an original string, write a function to output an array of boolean values - true if the word can be formed from the original word by swapping two letters only once and false otherwise.

Original string will consist of unique characters.

Examples
validateSwaps(["BACDE", "EBCDA", "BCDEA", "ACBED"], "ABCDE")
➞ [true, true, false, false]

// Swap "A" and "B" from "ABCDE" to get "BACDE".
// Swap "A" and "E" from "ABCDE" to get "EBCDA".
// Both "BCDEA" and "ACBED" cannot be formed from "ABCDE" using only a single swap.

validateSwaps(["32145", "12354", "15342", "12543"], "12345")
➞ [true, true, true, true]

validateSwaps(["9786", "9788", "97865", "7689"], "9768")
➞ [true, false, false, false]

INPUT - array of strings
OUTPUT - array of booleans
REQUIREMENTS
- will check each string against criteria and have it be true or false
- critieria is 
  - word has to be formed from original word by only swapping two chars
  - other ones return false (can't be formed, more or less than 2 chars)
- a 'swap' is two chars switch place, so one char moving is no. More than 2 chars moving is no
- has to work with letters and numbers, only uppercase in examples
- not just consecutive chars, have to be able to swap chars that aren't next to each other
- swap is always a pair of chars moving

EXAMPLES/EDGE CASES
- always a swap of two chars, don't get confused by one char moving to make it the same, that is not a swap. Don't consider

DATA STRUCTURE - array

SUBPROBLEMS
-> proper swaps
  - given a string and a target string need to do a comparison
  - the comparison is a rearrangement of characters and checking to see if it is equal to the target string after movement
  - the rearrangement is swapping, so two chars need to switch places
    - after the switch need to check to see if it is the same as the target
  - need to find all the rearrangements/swaps
    - then only keep those that are equal to the target string
  - with this then just test if it's one in length (one swap, two chars moved). If a different length then it isn't the one proper swap

-> how to swap chars (need more than just consecutive swaps) creating
  - set up a results array
  - convert to an array of chars, can use swap syntax and put together
  - start by iterating over the array this is the outer iteration, so this is every first char to swap
  - do a nested iteration over every char after that, this will be the second char 
    - so these two need to be swapped
    - use swap syntax to make an array swap
      - then put it together into a string and send to results
  - this will give an array of all swapped string (to test to see if they are equal to the target later)

ALGORITHM
- given an array of strings perform transformation
  - need an array of booleans
  - can check if it meets criteria by a helper function
- on each iteration check if it is a proper swap
  - proper swap is a subproblem 
- return array

*/

function createSwaps(str) {
  let results = [];
  let chars = str.split('');
  for (let firstSwap = 0; firstSwap < chars.length - 1; firstSwap += 1) {
    for (let secondSwap = firstSwap + 1; secondSwap < chars.length; secondSwap += 1) {
      let charsCopy = [...chars];
      [charsCopy[firstSwap], charsCopy[secondSwap]] = [charsCopy[secondSwap], charsCopy[firstSwap]];
      results.push(charsCopy.join(''));
    }
  }
  return results;
}

function onlyOneSwap(str, targetStr) {
  let allSwaps = createSwaps(str);
  allSwaps = allSwaps.filter(swap => swap === targetStr);
  return allSwaps.length === 1;
}

function validateSwaps(arr, targetStr) {
  return arr.map(str => onlyOneSwap(str, targetStr));
}

console.log(validateSwaps(['BACDE', 'EBCDA', 'BCDEA', 'ACBED'], 'ABCDE')) 
//, [true, true, false, false]) - third example move one, not really a swap, fourth example is swap four chars, so four chars moved, swap 2 pairs 

console.log(validateSwaps(['32145', '12354', '15342', '12543'], '12345')) 
//, [true, true, true, true])

console.log(validateSwaps(['9786', '9788', '97865', '7689'], '9768')) 
//, [true, false, false, false]) 2 and 3 can't match regardless

console.log(validateSwaps(['123', '321', '132', '13', '12'], '213'))
 //,  [true, false, false, false, false])

console.log(validateSwaps(['123', '1234', '1235'], '12')) 
//, [false, false, false])

console.log(validateSwaps(['123', '123', '123'], '133')) 
//, [false, false, false])

console.log(validateSwaps(['132', '321', '213'], '123'))
 //, [true, true, true])

