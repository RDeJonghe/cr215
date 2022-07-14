/* 8:52 9:36
Write a function that takes in an array of integers and returns the integers that are either palindromes or almost-palindromes. An almost-palindrome is any integer that can be rearranged to form a palindrome.

For example, the numbers 677 and 338 are both almost-palindromes, since they can be rearranged to form 767 and 383, respectively.

Return an empty array if none of the numbers are palindromes or almost-palindromes.

INPUT - array of numbers
OUTPUT - an array of numbers, can be empty
REQUIREMENTS
- need to find all integers that are palindromes (same forward or backward)
- and all "almost palindromes" this is a number that can be rearranged to be a plaindrome
  - as long as the digits can be moved around to make a palindrome then we want it
- rearrange means move around the digits
- palindrome - if digits are all different it can't be
- single digits are always palindromes
- one digit could occur one time if it's in the middle and if the length is odd
- if the length is even all digits must occur an even number of times and have the same count
- same forward as backwards
- palindrome examples
  - 55893983 -> yes 98533589
  - 5538939833 -> 9853333589
  - 111 is a palindrome all the same
  - 121 is a palindrome
  - 23532 - yes one number in middle can occur only once
  - 12341234 -> 12344321 - yes, even so each count has to be even
    - 12351234 - no, even but counts aren't even so it can't be'
  - 54445
  - 54455
  - 54453
  - 225444522

- original numebr is sent to results, not the modified palindrome number

QUESTIONS
- always positive integers? - yes

APPROACHES
- 1. for each number find all combinations for digits and then test if any are palindromes
- 2. define the characteristics of what makes something a palindrome in terms of the count for digits, then use this definition to test whether or not it's a palindrome

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- arrays
- counts may be stored in either an array or an object

ALGORITHM
- edge case of empty array should be handled naturally by the algorithm since it's selection
  - if necessary handle this explicitly
- perform selection on the array iterate over the array
  - use a helper method to test if it's a palindrome or if it can be rearranged to be a palindrome
  - this will return true or false so selection can happen
- after iteration this array is returned

SUBPROBLEMS
-> palindromeOrAlmostPalindrome(num)
- set up an empty object
- convert number to a string and iterate over each char that is a string number
- these will be the keys of the object and we will count each occurence
- this will give us an object with counts {'2' : 1, '3' : 2}
- conditionally check if it's a palindrome or almost palindrome
- first if the object only has one k/v pair it's a palindrome, all the same (either one digit or multiple all the same)
- if the length is even
  - all values need to be evenly divisible by two
  - take the values array, use every and check if every is evenly divisible by true and return this
- if the length is odd
  - one of the counts has to be odd, check that
  - all of the other count's have to be even
  - find all of the values in an array
  - findIndex for an odd Count and save it to a variable
    - if it's -1 return false, can't be a palindrome, need exactly one
    - splice and remove this from the array
  - next, test that every value is even


*/

function palindromeOrAlmostPalindrome(num) {
  let strNum = String(num);
  let counts = {};
  for (let char of strNum) {
    if (counts[char]) {
      counts[char] += 1;
    } else {
      counts[char] = 1;
    }
  }
  let values = Object.values(counts);

  if (strNum.length % 2 === 0) {
    return values.every(value => value % 2 === 0);
  } else {
    let oddIdx = values.findIndex(value => value % 2 === 1);
    // if (oddIdx === -1) return false;
    values.splice(oddIdx, 1);
    if (values.length === 0) return true;
    return values.every(value => value % 2 === 0);
  }
}

function palindromeSieve(arr) {
  return arr.filter(num => {
    return palindromeOrAlmostPalindrome(num);
  })
}


console.log(palindromeSieve([443, 12, 639, 121, 3232]), [443, 121, 3232]);
// // Since 443 => 434; 121 is a palindrome; 3232 => 2332 or 3223

console.log(palindromeSieve([5, 55, 6655, 8787]), [5, 55, 6655, 8787]);
// // Single-digit numbers are automatically palindromes.

console.log(palindromeSieve([897, 89, 23, 54, 6197, 53342]), []);

console.log(palindromeSieve([55893983]), [55893983]);
console.log(palindromeSieve([111]), [111]);
console.log(palindromeSieve([23532]), [23532]);
console.log(palindromeSieve([12341234]), [12341234]);
console.log(palindromeSieve([12351234]),  []);
console.log(palindromeSieve([234, 765, 123]), []);
console.log(palindromeSieve([]), []);


console.log(palindromeSieve([443, 12, 639, 121, 3232]), [443, 121, 3232])
console.log(palindromeSieve([5, 55, 6655, 8787]), [5, 55, 6655, 8787])
console.log(palindromeSieve([897, 89, 23, 54, 6197, 53342]), [])
console.log(palindromeSieve([112, 334, 555, 656, 665, 444, 443, 7]), [112, 334, 555, 656, 665, 444, 443, 7])
console.log(palindromeSieve([1, 2, 123]), [1, 2])
console.log(palindromeSieve([1, 2, 3]), [1, 2, 3])
console.log(palindromeSieve([555, 687868877]), [555, 687868877])
console.log(palindromeSieve([555, 68786887]), [555, 68786887])




