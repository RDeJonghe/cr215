/* 8:39 - 8:58
The mode of a group of numbers is the value (or values) that occur most often (values have to occur more than once). Given a sorted array of numbers, return an array of all modes in ascending order.

INPUT - array of numbers
OUTPUT - array of numbers
REQUIREMENTS
- mode - a number(s) that occurs most often, has to occur more than once
- array of numbers is sorted
- need to find all modes in ascending order
- numbers only listed once in result

DATA STRUCTURE - array, object

SUBPROBLEMS
- 

ALGORITHM
- handle edge cases of empty array
- set up an object to count occurences
- count each occurence
- with object with counts find the max value
  - take the values from the object in an array
  - feed these to max to find the max value and save this value
- convert object to entries subarrays
  - filter based off of the value === to the max count
  - make sure to filter based off of subarray index 1
- this will give array of subarrays we want
- from this just take the zero element from each of these
  - transformation
  - return an array of just those elements

*/

function countOccurences(arr) {
  let counts = {};
  arr.forEach(el => {
    if (counts[el]) {
      counts[el] += 1;
    } else {
      counts[el] = 1;
    }
  })
  return counts;
}

function mode(arr) {
  if (arr.length === 0) return null;
  let counts = countOccurences(arr);
  let values = Object.values(counts);
  let max = Math.max(...values);
  
  let entries = Object.entries(counts);
  entries = entries.filter(subArr => {
    if (subArr[1] > 1) {
      return subArr[1] === max
    }
  });
  
  let targetMode = entries.map(subArr => Number(subArr[0]));
  return targetMode;
}

console.log('1 ', mode([4, 5, 6, 6, 6, 7, 7, 9, 10]), [6]); //➞ [6] 6 occurs 3 times only mode 

console.log('2', mode([4, 5, 5, 6, 7, 8, 8, 9, 9]), [5, 8, 9]); // 5, 8, 9 all twice

console.log('3 ', mode([1, 2, 2, 3, 6, 6, 7, 9]), [2, 6]); // 2 and 6 both twice

// no values occur more than once - empty array
console.log('4 ', mode([1, 2, 3, 4, 5]), []);

// single element arr, empty arr
console.log('5 ', mode([1]), []);
console.log('6 ', mode([]), null);

// string numbers - handle them
console.log('3 ', mode(['1', '2', '2', '3', '6', '6', '7', '9']), [2, 6]); // 2 and 6 both twice
