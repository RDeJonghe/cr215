/* 12:58 1:27
You will be given a list of objects. Each object has type, material, and 
possibly secondMaterial. The existing materials are: paper, glass, organic, 
and plastic.

Your job is to sort these objects across the 4 recycling bins according to 
their material (and secondMaterial if it's present), by listing the type's 
of objects that should go into those bins.

Notes
The bins should come in the same order as the materials listed above
All bins should be listed in the output, even if some of them are empty
If an object is made of two materials, its type should be listed in 
both of the respective bins
The order of the type's in each bin should be the same as the order of 
their respective objects was in the input list

INPUT - array of objects, key vals are all strings
OUTPUT - array of arrays
REQUIREMENTS
- there is a type, material and optionally a second material key
- all materials possibilities are paper, glass, organic, plastic
- need to sort by "recycling bin"
  - sort by both material and second material if it's present
  - so the same type can show up in different boxes
- order of materilas is paper, glass, organic, plastic
- put the "type" in the correct bin
- bins can be empty
- if made of two materials put in both
- order in bins matches order given in the object

EXAMPLES/TEST CASES

DATA STRUCTURE/INTERMEDIATE DATA STRUCTURE
- arrays and objects
- need a results with nested arrays [[], [], [], []]
- need to represent these by index and by name
- this can be in key/val {'orgranic':3, etc}

ALGORITHM
- set up results data structure with subarrays
- set up constants for the index of organic, etc.
- iterate over each object in array given
- the purpose is to sort it and send to right place
- pass results and current obj to sort helper method
- sort will mutate results and sort it properly
- after iteration object will be complete

SUBPROBLEMS
-> sort helper method, gets results and object
- set up a constant object for key/val pairs with material and it's index
- paper 0, glass 1, organic 3, plastic 4
- iterate over each key in the key/val pairs object
  -> paper, glass, ...etc
- check if material or secondMaterial are equal to this
  - if (object[material] === key) / if (object[secondMaterial] === key)
  - results[Constant[key]].push(material)
- if so access the key of each of these materials, this will give the index
- then push into the subarray of that index the type

*/


function recycle(arr) {
  let results = [[],[],[],[]];

  arr.forEach(obj => {
    sort(results, obj);
  })

  return results;
}

function sort(results, obj) {
  const MATERIALS_IDXS = {'paper':0, 'glass':1, 'organic':2, 'plastic':3};

  for (let key in MATERIALS_IDXS) {
    if (obj.material === key) {
      results[MATERIALS_IDXS[key]].push(obj.type);
    }
    if (obj.secondMaterial == key) {
      results[MATERIALS_IDXS[key]].push(obj.type);
    }
  }
  return results;
}

let input = [
  {"type": "rotten apples", "material": "organic"},
  {"type": "out of date yogurt", "material": "organic", "secondMaterial": "plastic"},
  {"type": "wine bottle", "material": "glass", "secondMaterial": "paper"},
  {"type": "amazon box", "material": "paper"},
  {"type": "beer bottle", "material": "glass", "secondMaterial": "paper"}
]



console.log(recycle(input));

// // output = [
// //   ["wine bottle", "amazon box", "beer bottle"],
// //   ["wine bottle", "beer bottle"],
// //   ["rotten apples", "out of date yogurt"],
// //   ["out of date yogurt"]
// // ]

// // NOTHING TO RECYCLE
console.log(recycle([])); // [[],[],[],[]]
// // ONE ITEM
console.log(recycle([{"type": "rotten apples", "material": "organic"}]));
// // output = [
// //   [],
// //   [],
// //   ["rotten apples"],
// //   []
// // ]

// // ONE ITEM, two bins
console.log(recycle([{"type": "out of date yogurt", "material": "organic", "secondMaterial": "plastic"}],));
// // output = [
// //   [],
// //   [],
// //   ["out of date yogurt"],
// //   ["out of date yogurt"],
// // ]

// // multiple all in same bin
console.log(recycle([{"type": "rotten apples", "material": "organic"},{"type": "banana peel", "material": "organic"}]));
// // output = [
// //   [],
// //   [],
// //   ["rotten apples", "banana peel"],
// //   [],
// // ]
