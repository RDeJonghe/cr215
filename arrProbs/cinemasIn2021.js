/* 2:01 2:37
Given an array of seats, return the maximum number of new people which can be seated, as long as there is at least a gap of 2 seats between people.

Empty seats are given as 0.

Occupied seats are given as 1.

Don't move any seats which are already occupied, even if they are less than 2 seats apart. Consider only the gaps between new seats and existing seats.

Notice how there may be several possibilities for assigning seats to people, but these cases won't affect the results.

All seats will be valid.

INPUT - array of integers - all zeros or ones
OUTPUT - number
REQUIREMENTS
- array represents seats. empty seats are 0, occupied seats are 1
- need to figure out the maximum for new people who can be seated
  - need two seats (2 0's) between people
- can't move occupied seates
- have to analyze the gaps between the already occupied seats and figure out who many people can be put in that are new

QUESTIONS
- sparse arrays, arrays with custom properties, frozen arrays? no
- string numbers? no
- will all arrays contain valid 1 or 0's yes
- will argument always be an array? - yes

DATA STRUCTURES - array

SUBPROBLEMS
-> add a seat only if current char is a 0 test this
- can return a boolean, this can be tested for that index and then the seat can be switched
- canAddAPerson
- given current index and the array
  - check that the previous two indices and next two indices are 0 or undefined
  - if so return true

ALGORITHM
- handle edge case of empty array, if necessary handle edge case of single row (likely taken care of with rest of algorithm)
- given an array of numbers have to determine if any new people can be added
- for a given space that is a 0 need to tell (no need to check taken seats)
  - if the two spaces before are zeros and the two spaces after are zeroes
    - or udnefind for ends of rows
    - so if for that space the two infront and after are both zero or undefined we can add a person
  - this seat needs to be added dynamically and the data structure changed so the next seat won't get a perosn in it, the previous seat was just taken

- set a counter to zero
- make a copy of the array
- iterate over every element in the current array
- for every element that is a 0
- call helmper methdod
- if it returns true increment the counter
- then reassign that seat to one so it can't be used again as a zero

  


*/

function canAddSeat(currentIdx, arr) {
  let previous;
  if (currentIdx - 2 < 0) {
    previous = arr.slice(0, currentIdx)
  } else {
    previous = arr.slice(currentIdx - 2, currentIdx);
  }
  let next = arr.slice(currentIdx + 1, currentIdx + 3);

  let seatOptions = [previous, next];

  return seatOptions.every(subArr => {
    return subArr.every(seat => seat === 0);
  })
}

function maximumSeating(arr) {
  let counter = 0;
  if (arr.length === 0) return counter;

  for (let idx = 0; idx <= arr.length; idx += 1) {
    let currentSeat = arr[idx];
    if (currentSeat === 0) {
      if (canAddSeat(idx, arr)) {
        counter += 1;
        arr[idx] = 1;
      }
    }
  }
  return counter;
}

// // new people on edges
console.log(maximumSeating([0, 0, 0, 1, 0, 0, 1, 0, 0, 0])); //➞ 2
// // [1, 0, 0, 1, 0, 0, 1, 0, 0, 1]

// // put on edges, no seats occupied
console.log(maximumSeating([0, 0, 0, 0])); //➞ 2
// // [1, 0, 0, 1]

// // empty add many
console.log(maximumSeating([0, 0, 0, 0, 0, 0, 0])); //➞ 3
// [1, 0, 0, 1, 0, 0, 1]

console.log(maximumSeating([1, 0, 0, 0, 0, 1])); //➞ 0
// There is no way to have a gap of at least 2 chairs when adding someone else.

// row all alone
console.log(maximumSeating([0]) );// 1

// row all alone
console.log(maximumSeating([1])); // 0

// on edges add in middle
console.log(maximumSeating([1, 0, 0, 0, 0, 0, 1])); //➞ 1
// [1, 0, 0, 1, 0, 0, 1]

// in middle add on edges
console.log(maximumSeating([0, 0, 0, 1, 0, 0, 0])); //➞ 2
// [1, 0, 0, 1, 0, 0, 1]

// empty array
console.log(maximumSeating([])); // 0