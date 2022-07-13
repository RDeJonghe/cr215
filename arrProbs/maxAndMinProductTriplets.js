/* 10:58 11:15
Maximum and Minimum Product Triplets
Write two functions:

One that returns the maximum product of three numbers in an array.
One that returns the minimum product of three numbers in an array.

INPUT - an array
OUTPUT - number
REQUIREMENTS
- need to find the max product of three numbers in an array
  - product just means multiply
- need to find the maximum and minimum products
- these can come from any element, not just consecutive elements
- so need all non consecutive combinations
- with all non consecutive you can just find the max or min from that

SUBPROBLEMS
-> all triplets, 3 deep iteration to combine all of the possibilities

ALGORITHM
- find all 3 groups of elements non consecutive (helper)
  - this will return an array of subarrays
  - transform this to have the product of each subarray
  - helper will return an array of all products
- feed the array of products in max or min

*/

function tripletGroupsProduct(arr) {
  let results = [];
  for (let i = 0; i < arr.length - 2; i += 1) {
    for (let j = i + 1; j < arr.length - 1; j += 1) {
      for (let k = j + 1; k < arr.length; k += 1) {
        results.push([arr[i], arr[j], arr[k]]);
      }
    }
  }
  return results.map(subArr => {
    return subArr.reduce((accum, el) => accum *= el, 1);
  })
}



function maxProduct(arr) {
  return Math.max(...tripletGroupsProduct(arr));
}

function minProduct(arr) {
  return Math.min(...tripletGroupsProduct(arr));
}

// console.log(tripletGroupsProduct([-8, -9, 1, 2, 7]))



console.log(maxProduct([-8, -9, 1, 2, 7]), 504)

console.log(maxProduct([-8, 1, 2, 7, 9]), 126)

console.log(minProduct([1, -1, 1, 1]), -1)

console.log(minProduct([-5, -3, -1, 0, 4]), -15)
