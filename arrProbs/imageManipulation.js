/*
Images can be described as a 3D array.

// This image has only one white pixel:

[
  [[255, 255, 255]]
]
// This one is a 2 by 2 black image:

[
  [[0, 0, 0], [0, 0, 0]],
  [[0, 0, 0], [0, 0, 0]]
]
Your task is to create a function that takes a 3D array representation of an image and returns the inverse of that.

For example, white becomes black, black becomes white, etc.

A valid RGB value ranges from 0 to 255 (inclusive).
If the given array contains out of bound values, convert them to the nearest valid one

INPUT
- An array of subarrays, each subarray in turn has subarrays
OUTPUT
- a transformed array with subarrays transformed
REQUIREMENTS
- the deepest subarray represents a pixel
- 0 is black, 255 is white
- need to take the image and invert it
- values are from 0-255 inclusive
  - if a value is greater or lesser change it to the max/min first before conversion
  - opposites just become opposites
- the oppostie is just the Math.abs(255 - the number) so that is inverting it

QUESSTIONS
- do we have to deal with sparse, custom, frozen arrays? - no
- will every array given have the same subarrays with the same lenght? yes
- will the deep subarrays always have integers - yes
- every pixel always has three elements? yes

DATA STRUCTURES - arrays, careful with nesting

ALGORITHM
- this is a problem of transformation
- map outer level array, this will map each row,
- map the row, this will match each element in the row wihci is the deep array
- map the deep array, this will reach the number
- if the number is greater or lesser than the edges map the edge number with the 255 distance
- other wise map it from 255 minus the number

SUBPROBLEMS
- this is the map of the number
- need to be able to invert a single number
  - first reassign it if it is less or greater
  - if the number is 255 just make it 0
  - otherwise subtract 255 - the number


*/

function invertNumber(num) {
  if (num > 255) num = 255;
  if (num < 0) num = 0;
  if (num === 255) return 0;

  return 255 - num;
}


function invert(array) {
  return array.map(subArr1 => {
    return subArr1.map(subArr2 => {
      return subArr2.map(num => invertNumber(num));
    })
  })
}



console.log(invert([
  [[255, 255, 255], [255, 255, 255]],
  [[255, 255, 255], [255, 255, 255]]
]));
// [
//   [[0, 0, 0], [0, 0, 0]],
//   [[0, 0, 0], [0, 0, 0]]
// ]

console.log(invert([
  [[0,0,255], [0,0,0], [0,0,157], [100,229,4]],
  [[100,0,3], [1,100,0], [0,10,0], [0,168,0]],
  [[16,30,0], [0,125,0], [15,0,9], [0,139,0]],
  [[200,2,0], [0,125,0], [0,0,9], [0,200,0]]
]));
// [
//   [[255,255,0], [255,255,255], [255,255,98], [155,26,251]],
//   [[155,255,252], [254,155,255], [255,245,255], [255,87,255]],
//   [[239,225,255], [255,130,255], [240,255,246], [255,116,255]],
//   [[55,253,255], [255,130,255], [255,255,246], [255,55,255]]
// ])

// one pixel
console.log(invert([
  [[255,255,255]]
])); /// [[[0,0,0]]]

// // empty array
console.log(invert([])) // null

// out of range pixels
console.log(invert([
  [[270,255,255]]
])); /// [[[0,0,0]]]

// out of range
console.log(invert([
  [[-30,0,0]]
])); /// [[[255,255,255]]]