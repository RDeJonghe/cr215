/* 6:24 7:15
A ship has to transport cargo from one place to another, while picking up cargo along the way. Given the total amount of cargo and the types of cargo holds in the ship as arrays, create a function that returns true ;if each weight of cargo can fit in one hold, and false ;if it can't.

"S" means 50 cargo space.
"M" means 100 cargo space.
"L" means 200 cargo space.

INPUT - 2 arrays, one of strings, one of numbers
OUTPUT - boolean
REQUIREMENTS
- need to check if all of the cargo can fit
- strings are the size
- each weight needs to fit in one hold, so you can't break up the weight, but one hold can take more than one

QUESTIONS
- array integrity? yes
- will strings always be uppercase and one of the three chars given? yes
- will numbers always be positive? yes
- can there be decimal numbers? yes handle decimals?
- can there be string numbers? no
- handle empty arrays? yes
- s can take a 50, m can take a 100 yes

DATA STRUCTURES - arrays

ALGORITHM
- handle edge case of both empty arrays
- need to check if the cargo can successively fit in the holds
- it should find the hold that it will closest fit in to
  - this would make it efficient, so a small load should take up space in the small hold instead of in the large hold
- after it is entered that space should then be used up

- transform holds into their corresponding values - holds will then be numbers
- iterate over each number in the cargo array
  - check a helper method cargo fits - if it doesn't return false
  - if the cargo fits then use up that cargo space
    - helper method to use up the space and modify the cargo array
- after iteration return true if they all fit


SUBPROBLEMS
-> cargo fits
- given a number and an array of integer
- iterate over the array of integers
  - just check that the number given is smaller than any of the numbers in there, if so it fits return true, otherwise false

-> storeCargo - purpose is to find efficient spot and then to put the cargo there
- given a number and an array of integers
- identify the index that is closest in value to the cargo
  - so where the space - cargo is the smallest
  - so set smallest to Infinity, track index, compare values, set index when it's smaller
- now reassing this index in the array to
  - the current value minus the cargo, this will use up that space

*/

function storeCargoItem(cargoItem, spaceAvailable) {
  let bestFitIndex = 0;
  let bestFit = Infinity
  spaceAvailable.forEach((space, currentIdx) => {
    if (space - cargoItem < bestFit && space - cargoItem > 0) {
      bestFit = space - cargoItem;
      bestFitIndex = currentIdx;
    }
  })

  spaceAvailable[bestFitIndex] = bestFit;
}

function cargoItemFits(cargoItem, spaceAvailable) {
  return spaceAvailable.some(space => space >= cargoItem);
}

function willFit(space, cargo) {
  if (space.length === 0 && cargo.length === 0) return null;
  if (space.length === 0) return false;
  if (cargo.length === 0) return true;

  let spaceAvailable = space.map(char => {
    if (char === 'S') return 50;
    if (char === 'M') return 100;
    if (char === 'L') return 200;
  });

  for (let cargoItem of cargo) {
    if (cargoItemFits(cargoItem, spaceAvailable)) {
      storeCargoItem(cargoItem, spaceAvailable);
    } else {
      return false;
    }
  }
  return true;
}

// // fits easily, all spaces larger
console.log(1, willFit(["M", "L", "L", "M"], [56, 62, 84, 90]), true);

// // smalss don't fit larger than 50 no space, but the total is what matters
console.log(2, willFit(["S", "S", "S", "S", "L"], [40, 50, 60, 70 , 80, 90, 200]), false);

// // holds can take multiple cargos, so will fit
console.log(3, willFit(["L", "L", "M"], [56, 62, 84, 90]), true);

// // multiple cargos in a hold
console.log('3b', willFit(["L"], [50, 50, 50]), true);
console.log('3c', willFit(["L"], [50, 50, 150]), false);


// // extra space in the space array
console.log('3d', willFit(["L", "L", "M", "L"], [56, 62, 84, 90]), true);

// // fits each size
console.log(4, willFit(["S"], [50]), true);
console.log(5, willFit(["M"], [100]), true);
console.log(6, willFit(["L"], [200]), true);
// // doesn't fit
console.log(7, willFit(["S"], [51]), false);
console.log(8, willFit(["M"], [101]), false);
console.log(9, willFit(["L"], [201]), false);

// // no cargo
console.log(10, willFit(["L"], []), true);
// no space
console.log(10, willFit([], [100]), false);
// both empty
console.log(10, willFit([], []), null);

// general will fit
console.log(11, willFit(["L", "M"], [150, 100]), true);
// general won't fit
console.log(12, willFit(["S", "M"], [150, 150]), false);

