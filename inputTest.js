/*
~~~~~~~~~ INPUT HANDLING/TESTING/VALIDATION PRACTICE FOR ASSESSMENT ~~~~~~~~~~~~

- need to be comfortable handling input validation and testing so not too much time is spent on this
- Broad range of topics
  - sparse arrays, arrays with custom properties, frozen array/object
  - is any argument at all given, are too many arguments given?
  - different data type given as an argument - expect a string and an array is given. how to handle cases like this
  - all the different individual edge cases for that data type
    - strings - empty string, special chars, numeric chars, etc
    - same for other types
  - also regex, how to make sure it meets certain parameters

*/

/*
~~~~~~~~ NO ARGUMENT GIVEN ~~~~~~~~
- if no argument is given at all the argument will be treated like `undefined`
- this can be handled with the rest of input validation of types
- you could also test to see if it === undefined and handle it but probably not necessary
  - generally your other validation, that it is an array, etc, will reject it if it's undefined
*/
function someFunc(arr) {
  return arr;
}

function anotherFunc(arr) {
  if (arr === undefined) {
    console.log('bad input') // could actually handle but prob not needed
  }
  return arr;
}

// console.log(someFunc());
// console.log(someFunc() === undefined); // so the argument excluded is actually undefined

/*
~~~~~~~~ TESTING IF SOMETHING IS AN OBJECT ~~~~~~~~~
- needs to be type of object, not an array and not null
*/

function isObjectObject(obj) {
  return (typeof obj === 'object' &&
          !Array.isArray(obj) &&
          obj !== null);
}

// console.log(isObjectObject({a: 1}));
// console.log(isObjectObject([1, 2, 3]));
// console.log(isObjectObject(null));
// console.log(isObjectObject('hello'));

/*
~~~~~~~ USE OF EVERY TO CHECK ALL ELEMENTS MEET REQUIREMENTS ~~~~~~~~
- can use every to make sure all elements are the same and what you want
*/

function allNums(arr) {
  return arr.every(num => Number.isInteger(num));
}

// console.log(allNums([1,2,3]));
// console.log(allNums(['1', '2', 3]));
// console.log(allNums([1.3, 3, 3.7]));

function allObjects(arrOfObjs) { // with helper method from above
  return arrOfObjs.every(obj => isObjectObject(obj));
}

console.log(allObjects([{a: 1}, {b: 2}]));
console.log(allObjects([{a: 1}, {b: 2}, [2, 3]]));
console.log(allObjects([[1, 2], [3, 4]]));





/* 
~~~~~~~~~~~ REGEX VALIDATION THAT A STRING MEETS CERTAIN REQUIREMENTS ~~~~~~~~~~
*/

/*
~~~~~~~~~~ ONLY ALPHANUMERIC CHARS ~~~~~~~~~~~~
- this is kind of a 'backwards' approach to it
- it checks to make sure that it doesn't match on anything that isn't alphanumeric
*/

function onlyAlphaNumChars(str) {
  return str.match(/[^a-z0-9]/gi) === null;
}

// console.log(onlyAlphaNumChars('Hello World'), false); // has a space
// console.log(onlyAlphaNumChars('HelloWorld'), true) // only letters
// console.log(onlyAlphaNumChars('Number1'), true) // only letters and numbers
// console.log(onlyAlphaNumChars('Wtf!'), false) // has special char
