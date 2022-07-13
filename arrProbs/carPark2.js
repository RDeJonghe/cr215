/* 4:05 - 4:38
Car Park Exit
You are stuck in a multi-storey car parking lot. Your task is to exit the carpark using only the staircases. Exit is always at the bottom right of the ground floor.

Create a function that takes a two-dimensional array where:

Free carparking spaces are represented by a 0
Staircases are represented by a 1
Your starting position is represented by a 2 and can be at any level of the car park.
Exit is always at the bottom right of the ground floor.
You must use the staircases (1) to go down a level.
Each floor will have only one staircase apart from the ground floor which will not have any staircases.
... and returns an array of the quickest route out of the carpark.

arr = [
  [1, 0, 0, 0, 2],
  [0, 0, 0, 0, 0]
]

// Starting from 2, move to left 4 times = "L4"
// Go down from stairs 1 step = "D1"
// Move to right 4 times to exit from right bottom corner = "R4"

result = ["L4", "D1", "R4"]
See the below examples to better understand:

Examples
parking_exit([
  [1, 0, 0, 0, 2],
  [0, 0, 0, 0, 0]
]) ➞ ["L4", "D1", "R4"]
parking_exit([
  [2, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]) ➞ ["R3", "D2", "R1"]

// Starting from 2, move to right 3 times = "R3"
// Go down from stairs 2 steps = "D2"
// Move to right 1 step to exit from right bottom corner = "R1"
parking_exit([[0, 0, 0, 0, 2]]) ➞ []
// You are already at right bottom corner.

INPUT - array of integers
OUTPUT - array of strings
REQUIREMENTS
- stuck in a parking lot, have to exit using staircases
- exit is always at bottom right of ground floor
- empty spaces are 0's
- staircases are 1
- starting position is 2 (only one 2)
- your car is the only car in the garage (all zeros, and one 1)
- use staircases to go down
- bottom floor is last array
  - all the way to the right of the bottom is the exit
- each floor only has one staircase
- bottom floor no staircase
- need to have an array for quickest way out of car park

- directions are L left, D down R right plus the number of spaces moved to get there
- movement doesn't include the starting space, does include the space where you end up

DATA STRUCTURE - array

SUB PROBLEMS
-> find down
  - just find the index with 2
  - now find the distance between this and the end of the array - 1
  - so down = lenght array - 1 - index

-> find both horizontal
  - first find the array with the two in it, this will have the direction info
  - find where the 2 is in relation to the one
    - if 2 index is greater than 1 index
      - it will be left right
        - first move is 2 index - left index that is left
        - second move is math abs 1 index - end of arrray - 1

    - if 2 is less than 1 index
      - it will be right right
      - first move is Math abs 2 - 1 indexes
      - second move is 1 - length of array index - 1

ALGORITHM
- need 3 info find horizontal, find left, find horizontal
- find the down
- next really just need the subarray with the 2 in it
  - with this you can find both left and right


*/

function horizontalMoves(subArrWithCar) {
  let carIdx = subArrWithCar.indexOf(2);
  let elevatorIdx = subArrWithCar.indexOf(1);
  if (elevatorIdx === -1) elevatorIdx = carIdx;
  let results = [];

  if (carIdx > elevatorIdx) {
    results.push('L' + String(carIdx - elevatorIdx));
    results.push('R' + String(Math.abs(elevatorIdx - (subArrWithCar.length - 1))));
  } else {
    results.push('R' + String(Math.abs(carIdx - elevatorIdx)));
    results.push('R' + String(Math.abs(elevatorIdx - (subArrWithCar.length - 1))));
  }

  return results;
}

function downMove(arr) {
  let carIdx = arr.findIndex(subArr => subArr.includes(2));

  return 'D' + String((arr.length - 1) - carIdx);
}

function parkingExit(arr) {
  let subArrWithCar = arr.find(subArr => subArr.includes(2));


  let horizontal = horizontalMoves(subArrWithCar);
  let down = downMove(arr);

  horizontal.splice(1, 0, down);
  let allMoves = horizontal;
  return allMoves;
}


// console.log(horizontalMove([2, 0, 0, 0, 0]))

// console.log(downMove([
//   [1, 0, 0, 0, 2],
//   [0, 0, 0, 0, 0]
// ]))

console.log('1 ', parkingExit([
  [1, 0, 0, 0, 2],
  [0, 0, 0, 0, 0]
]), ["L4", "D1", "R4"]);

// // // top left
console.log('2 ', parkingExit([
  [2, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]), ["R3", "D2", "R1"]);

// // // already at exit, bottom right
console.log('3 ', parkingExit([
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 2]
]), ["R0"]);

// // top right
console.log('3b ', parkingExit([
  [0, 0, 0, 1, 2],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]), ["L1", "D2", "R1"]);

// // bottom left
console.log('3c ', parkingExit([
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [2, 0, 0, 0, 0]
]), ["R4"]);

// // middle floor
// // top left
console.log('2 ', parkingExit([
  [0, 0, 0, 1, 0],
  [2, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]), ["R3", "D1", "R1"]);

// // one floor
console.log('4 ', parkingExit([
  [2, 0, 0, 0, 0]
]), ["R4"]);

// // small garage
console.log('5 ', parkingExit([
  [2, 1],
  [0, 0]
]), ['R1', 'D1', 'R0']);

// // empty garage
// console.log('6 ', parkingExit([
//   [0, 0, 0, 1, 0],
//   [0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0]
// ]), []);

// // no garage
// console.log('7 ', parkingExit([]), null);