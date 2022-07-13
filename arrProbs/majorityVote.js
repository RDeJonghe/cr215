/* 10:18
Create a function that returns the majority vote in an array. A majority vote is an element that occurs > N/2 times in an array (where N is the length of the array).

Notes
The frequency of the majority element must be strictly greater than 1/2.
If there is no majority element, return null.
If the array is empty, return null.

INPUT - array of strings
OUTPUT - string or null
REQUIREMENTS
- need to find the majority vote in an array
  - a majority happens when that element occurs greater than half of the time "> N/2"
  - has to occur more than half, you take the total number of votes and divide by 2
  - the majority has to be strictly greater than that (not equal to)
  - if there is no marjoity return null, empty array return null
- always returns uppercase

QUESTIONS
- can we always anticipate an array of strings, all elements will be strings?
- case sensitive / insensistve
- can votes be longer than 1 char

DATA STRUCTURES - array, object

SUBPROBLEMS
-> perform count of all votes
  - set up results object
  - iterate over the array
  - if it doesn't exsit in the obhect set it to 1, if it exists increement

ALGORITHM
- find the target number that votes have to be greater than
  - just divide length by two
- upcase all the chars, so we can handle them case insensistve
- perform a count of all votes
- given an object with all votes
- convdert the object to entries
 - this will give an array of subarray to filter
 - filter based off of the 1st index of each subarray
  - has to be greater than the target
- this will give either a one element subarray or an empty array
- if emtpy return null,
- if not empty return the first element of subarray (char)
*/

function countVotes(arr) {
  let result = {};
  arr.forEach(vote => {
    if (result[vote]) {
      result[vote] += 1;
    } else {
      result[vote] = 1;
    }
  })
  return result;
}

function majorityVote(arr) {
  if (arr.length === 0) return null;
  let targetNum = arr.length / 2
  arr = arr.map(el => el.toUpperCase())

  let voteCount = countVotes(arr);
  let entries = Object.entries(voteCount);
  let majority = entries.filter(subArr => subArr[1] > targetNum);
  
  if (majority.length === 0) return null;
  return majority[0][0];
}

console.log(majorityVote(["A", "A", "B"]), "A");

console.log(majorityVote(["A", "A", "A", "B", "C", "A"]), "A");

console.log(majorityVote(["A", "B", "B", "A", "C", "C"]), null); // failing case

// empty array
console.log(majorityVote([]), null)

// lowercase
console.log(majorityVote(["a", "a", "b"]), "A");

// mixed case
console.log(majorityVote(["a", "A", "b"]), "A");

// longer strings
console.log(majorityVote(["yes", "no", "yes"]), "YES");

// one vote
console.log(majorityVote(["A"]), "A");

// tie between two
console.log(majorityVote(["A", "A", "B", "B"]), null);

// fail that isn't a tie
console.log(majorityVote(["A", "A", "C", "B", "B"]), null);

// not greater
console.log(majorityVote(["A", "A", "B", "C"]), null);