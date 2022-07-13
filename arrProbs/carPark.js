/* 1:16 2:14
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

ALGORITHM
- handle edge case of no parking lot
- handle edge case of empty parking lot, one floor if necessary
- set up results array
- need to first identify the subarray with the 2 (car) - edge case of no 2, returns -1 can handle
  - take the slice of the array from this subarray index to the end
  - can discard upper floors, not needed
- if the length is just one, one floor
  - just find the distance between the two and the end of the subarray (last index)
  - this will be the "R4" move
  - if already at end can be "R0"
  - take the last index - the first index
  - concat this to "R", send to results
- if more than one floor (more than one subarray)
  - next find the distance between the two and the one on that floor
    - find index of 2 and index of 1
      - get the subtract index 2 - index 1
      - if negative concat with R, remove - symbol
      - if positive concat with L
      - send to results
    - this is the first move to get to the elevator now need to go down
  - array is now just the relevant floors, car is on new "top"
    - get length - 1, htis is how many need to go down
    - concat with D and send to results
  - now just need to get to the exit
    - will always be right
    - use the index of 1 variable from before (since no one on bottom)
    - do length - index 1 variable, and concat with R
    - send to results

*/

function hasCar(arr) {
  return arr.some(subArr => {
    return subArr.some(el => el === 2);
  })
}

function oneFloorExit(arr) {
  let carLocation = arr.indexOf(2);
  return ['R' + String((arr.length - 1) - carLocation)];
}

function relevantFloorsArr(arr) {
  let topFloor = arr.findIndex(subArr => subArr.includes(2));

  return arr.slice(topFloor);
}

function topFloorMove(subArr) {
  let car = subArr.indexOf(2);
  let elevator = subArr.indexOf(1);

  if (car > elevator) {
    return "L" + String(car - elevator);
  } else {
    return "R" + String(Math.abs(elevator - car));
  }
}

function exitMove(subArr) {
  let elevator = subArr.indexOf(1);

  return 'R' + String((subArr.length - 1) - elevator);
}

function parkedAtExit(arr) {
  let subArrLength = arr[0].length;

  return arr[arr.length - 1][subArrLength - 1] === 2;
}


function parkingExit(arr) {
  if (arr.length === 0) return null;
  if (!hasCar(arr)) return [];
  if (parkedAtExit(arr)) return ["R0"];
  let relevantFloors = relevantFloorsArr(arr);
  if (relevantFloors.length === 1) return oneFloorExit(arr[0]);

  let results = [];
  results.push(topFloorMove(relevantFloors[0]));
  results.push("D" + String(relevantFloors.length  - 1));
  results.push(exitMove(relevantFloors[0]));

  return results;





}


console.log('1 ', parkingExit([
  [1, 0, 0, 0, 2],
  [0, 0, 0, 0, 0]
]), ["L4", "D1", "R4"]);

// // top left
console.log('2 ', parkingExit([
  [2, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]), ["R3", "D2", "R1"]);

// // already at exit, bottom right
console.log('3 ', parkingExit([
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 2]
]), ["R0"]);

// top right
console.log('3b ', parkingExit([
  [0, 0, 0, 1, 2],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]), ["L1", "D2", "R1"]);

// bottom left
console.log('3c ', parkingExit([
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [2, 0, 0, 0, 0]
]), ["R5"]);

// middle floor
// top left
console.log('2 ', parkingExit([
  [0, 0, 0, 1, 0],
  [2, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]), ["R3", "D1", "R1"]);

// one floor
console.log('4 ', parkingExit([
  [2, 0, 0, 0, 0]
]), ["R4"]);

// small garage
console.log('5 ', parkingExit([
  [2, 1],
  [0, 0]
]), ['R1', 'D1', 'R0']);

// empty garage
console.log('6 ', parkingExit([
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]), []);

// no garage
console.log('7 ', parkingExit([]), null);

