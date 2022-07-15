/* 7:54 8:56
The function is given an array of particles. The absolute value represents the particle mass. The sign of value represents the direction of movement:

Positive values move to the right.
Negative values move to the left.
A positive value located on the left will collide with a negative value immediately located on the right. The particle with the greater mass will absorb the mass of another particle and continue to travel in its direction. If the negative is greater, the combined particle will continue to move to the left, if the positive mass is greater or equal, the combined particle will continue to move to the right. The mass of the combined particle is the sum of absolute values. Two particles moving in the same direction cannot collide because it is assumed that the speed is the same before and after collisions. The new combined particles can collide again. The total picture of remaining particles can evolve and evolve.

Eventually, the equilibrium is reached when all negative values are on the left and all positive values are on the right. The left group is moving away from the right group. Determine the equilibrium state of the transformed particles and return it as an array.

The problem is not ideally symmetric. If the masses are the same, the positive mass absorbs the negative mass and continues moving to the right. This assumption is to account for all possibilities.

INPUT - array of numbers
OUTPUT - array of numbers
REQUIREMENTS
- each element represents a "particle"
- absolute value is particle mass
- the sign +/- represents the direction it moves in
- positive values go to right, negative go to left
- particles collide when they move in opposite directions
- paticle with greater mass will absorb the other particle and continue to move in its direction
  - what happens if they have equal mass?
  - if negative greater it continues to move to left
  - if positive greater or EQUAL continues to move to right
  - if masses same positive absorbs negative and moves to right
- mass of combined particle is sum of absolute values (so negative is the actual value added, not subtracted)
- same direction particles cannot collide, speed is same
- equilibrium / ending is when all negative on left, all positive on right
- need to find this equilibrium / ending state and return it in array

QUESTIONS
- will arrays always contain numbers? yes
- sparse arrays, custom properties, frozen? no

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES 
- arrays
- intermediate - portions of the array possibly

APPROACHES - HIGH LEVEL
1. perform some sort of iteration and compare one element with its following element and do a combination if needed and send to a results. This would need to be a loop until equilibrium is reached

2. take all pairs of elements and combine if needed and return a new array this could do the combinations needed, and would have to be in a loop until equilibrium is reached

-> equilibrium is like a stopping condition, need to consider how to do this

ALGORITHM
- remove all zeros with map - this gives a copy
- make a copy of the array so it can be reassigned element by elmeent if needed
  - this will be passed into the helper methods and will eventully break the loop
- set up a loop while not in equilibrium, results gets this
  - call a helper method to combine particles
  - the resutls gets reset to this and will eventually break the loop
  - the purpose is to do an iteration and combine whatever is possible
- after the loop breaks return results

SUBPROBLEMS
-> equilibrium
  - when all negative are on left and all positive on right
  - find the index of the first positive number and save to variable
  - find the index of the last negative number and save to variable
  - if the last negative index is less than the first positive index it's in equilibrium all negative are on left and all positive are on right

-> combine particles - do one combination
[-1, 3, -1, 2]
- given an array of numbers
- iterate until I find a particle that is positve on left and negative on right
  - save these indexes
  - use findIndex, and do a comparison between that index and the following index
- have to find the last index of a negative number
  - can set index to -1
  - iterate over all the numbers, any time there is a negative index, just reassing it to that index
- when this is found a combination is made and break iteration, just do one combo
- detrmine if it will be total neg or total positive (direction) which is bigger
- save the combined absolute value of these this will be added
- splice from the first index, delete 2 and add 1
- this should put it in proper spot
*/

function combineParticles(arr) {
  let combineIndex = arr.findIndex((num, idx) => {
    return num > 0 && arr[idx + 1] < 0;
  })
  let posParticle = arr[combineIndex];
  let negParticle = arr[combineIndex + 1];
  let combined = Math.abs(negParticle) + posParticle;
  if (Math.abs(negParticle) > posParticle) combined *= -1;


  arr.splice(combineIndex, 2, combined);
}

function findLastNegativeIndex(arr) {
  let index = -1;
  arr.forEach((num, idx) => {
    if (num < 0) index = idx;
  })
  return index;
}

function equilibrium(arr) {
  let firstPositive = arr.findIndex(num => num > 0);
  let lastNegative = findLastNegativeIndex(arr);
  if (firstPositive === -1) return true;

  return lastNegative < firstPositive;
}

function movingParticles(arr) {
  arr = arr.filter(num => num !== 0);
  while (!equilibrium(arr)) {
    combineParticles(arr);
  }
  return arr;
}

console.log(movingParticles([3, -1]), [4]);
// // // 3 absorbs -1.

console.log(movingParticles([-1, 3, -1, 2]), [-1, 4, 2]);
// // // -1 is moving to the left, 2 is moving to the right, 3 absorbs -1.

console.log(movingParticles([]), []);
// // // No particles are in the list.

console.log(movingParticles([5, -1, -2, -9]), [-17]);
// // // 5 absorbs -1, new 6 absorbs -2, new 8 is being absorbed by -9.

// // // same mass pos/neg - same mass positive absorbs
console.log(movingParticles([5, -5]), [10]);

// // // one element
console.log(movingParticles([10],), [10]);

// // // all elements one direction, unchanged no collisions
console.log(movingParticles([10, 5, 1], ), [10, 5, 1]);


console.log(movingParticles([-10, -5, -1], ), [-10, -5, -1]);

// // // general case
console.log(movingParticles([5, -10, 10, -5, -1, 3],), [-15, 16, 3]);

// // zeros get combined, inconsequential
console.log(movingParticles([5, 0, -10, 10, 0, -5, -1, 0, 3], ), [-15, 16, 3]);


console.log(movingParticles([0, 0, 0]), []);