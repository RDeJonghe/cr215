// ############################################################################
// John and Mary want to travel between a few towns A, B, C ... etc

// Mary has on a sheet of paper a list of distances between these towns:
  
// John is tired of driving and he says to Mary that he doesn't want to drive 
// more than [maxDistance] miles and he will visit only 3 towns.

// Write a function to determine which distances, hence which towns, they can 
// choose so that the sum of the distances is the biggest possible to please
// both Mary and John?

// Example:
// If Mary has a list like [50, 55, 57, 58, 60]
// John does not want to travel more than 174 miles
// Return 173 which is the largest possible distance of three towns on the
// list that is still less than John's maximum
// ############################################################################

/*
INPUT - array of distances - numbers, max distance
OUTPUT - number - this is the highest possible distance that can be traveled
REQUIREMENTS
- can only visit three towns total
- less than maximum or equal to maximum
- [50, 55, 57, 58, 60] listed in asc order
  - always listed in asc order, no order
- can choose any of the distances to arrive to the max or does the initial order of distances need to be respected?
  - can choose any of the distances
- the towns / distances chosen should be the ones that are closest to the number given
- max towns visited is always 3
- max distance is alwyas an integer zero or greater

DATA STRUCTURES / INTERMEDIATE DATASTRUCTURES
- arrays
- [50, 55, 57, 58, 60]
- subarrays of 3 in length [[50,55,57], [50,55,58], [50,55,60]...] (intermediate)
  - good representation of always having three towns visited
  - good representation because it sums easily to total distance that could be compared
  - because we want to look at how each of these itineraries compares to the max

ALGORITHM
- handle case of empty array return 0
- create a data structure that represents groups of three
- given a data structure of groups of 3
  - map all of these and sum them -> return an integer for the total distance for itinerires
- given this array of distances
  - perform selection and choose only those that are less or equal to target distacne
- send this into math.max with spread syntax and get the highest distance

SUBPROBLEMS
-> triplets (create groups of three) total distances for 3
- set a results
- need to perfom nested iteration like pairs, but with an additonal element added
- require another level of iteration
- for every outer iteration there will be two inner iterations to locate elements by index
- then choose each of these elements from the array and put in a subarray and send to results

*/

function travelMax(distanceArr, maxDistance) {
  if (distanceArr.length === 0) return 0;
  let itinerariesOfThree = triplets(distanceArr);

  let itineraryDistances = itinerariesOfThree.map(subArr => {
    return subArr.reduce((total, num) => total + num, 0);
  });
  let validItineraries = itineraryDistances.filter(distance => distance <= maxDistance);

  if (validItineraries.length === 0) return 0;

  return Math.max(...validItineraries);
}

function triplets(arr) {
  if (arr.length < 3) return [arr];
  let results = [];
  for (let i = 0; i < arr.length - 2; i += 1) {
    for (let j = i + 1; j < arr.length - 1; j += 1) {
      for (let k = j + 1; k < arr.length; k += 1 ) {
        results.push([arr[i], arr[j], arr[k]]);
      }
    }
  }
  return results;
}

// console.log(triplets([50, 55, 57, 58, 60]))

// [50,55,57]
// [50,55,58]
// [50,55,60]
// [50,57,58]
// [50,57,60]
// [50,58,60]
// [55,57,58]
// [55,57,60]
// [55,58,60]
// [57,58,60]

// standard case
console.log(travelMax([50, 55, 57, 58, 60], 174), 173); // [55,58,60]
// // unable to travel at all
console.log(travelMax([40, 45, 60], 20), 0); // []
// // can travel to all distances
console.log(travelMax([10, 20, 15, 5, 1], 100), 45); // [10,20,15]
// less than 3 towns
console.log(travelMax([20], 40), 20); //[20]
// empty array
console.log(travelMax([], 40), 0); //[0]
// // exactly equal to max distance
console.log(travelMax([10,10,20,5,8], 40), 40); // [10,10,20]
// // big numbers
console.log(travelMax([91, 74, 73, 85, 73, 81, 87], 230), 228);

