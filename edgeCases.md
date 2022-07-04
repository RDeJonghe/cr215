# Edge Cases for Input Types

## String
- `''` empty string
- too many spaces, needs to be cleaned up
  - `'   hello world'`, `'hello world   '`, `'hello (multiple spaces here)  world'`
    - this last one came up as an edge case in the code review, possibly solve with `split()` and `trim()`
- `\n`, `\t`, other whitespace to be cleaned up with `trim()`
- case: upper or lower
- special chars
- char requirements
  - only alphabet, only upper, only lower
  - only alphanumeric
  - only numbers
  - no spaces
  - etc.
- *any other edge cases to consider for strings?*

## Number
- `0` zero
- `NaN`
- `Infinity`, `-Infinity`
- decimal numbers
- negative numbers
- 'string' numbers `'1'`, `'2'`, `'3'`, etc.
- *any other edge cases to consider for numbers?*

## Array
*need to be aware of these possibilities. we may not need to handle all of these but it is important to ask*
- empty array `[]`
- array with just one item `[345]`
- an array that is completely 'good' according to requirements
  - so if we are testing if numbers are even an example would be `[2, 4, 6, 8]` all even
- an array that is completely 'bad' according to requirements
  - so if we are testing if words start with a vowel this would be all bad: `['the', 'big', 'table']`
- sparse array with empty items `[1, 2, , 4]`
- array with 'custom' object properties on it `[1, 2, 3, a: 'hello']`
- is the array frozen?
- does the array consist of different data types? or can we assume all data types will be the same within the array
  - `['a', 1, 'b', 2]` mix of strings and numbers, other mixes like `['a', 'b', 'c', true]`
    - unlikely we need to handle but it is good to ask to be aware
- if we expect an array of numbers do we have to handle `['1', '2', '3']`
- if we are expecting an array with subarrays, can the subarrays be empty?
  - `[[1, 2], []]`
- if we are expecting an array of subarrays, can we assume all elements in the outer array will be subarrays?
  - `[[1, 2], {a: 1}, 'hello', [1, 4]]` - do we have to test for this? unlikely but ask?
- if we are expecting an array of objects, can we assume all objects will have key/val pairs?
  -`[{a: 1}, {}]`
- if we are expecting an array of objects can we assume all elements will be actual objects?
  - `[{a: 1}, [1, 2], null]` - likely not tested but need to be aware that techincally all the elements are objects
    - you'd need a custom method to test that they are all acutal 'objects objects'
- if we are expecting an array with subarrays/objects, can we assume they will all be standard?
  - not frozen, not sparse, no custom properties, all of the same data type?
- *are there any other edge cases to consider for arrays?*

## Object
- `{}` empty object
- `{a: 1}` object with one property
- all object values the same `{a: 1, b: 1, c: 1}` (and same type)
- all object values different `{a: 1, b: 3, c: 4}` (and same type)
- can we assume all object values will be of the same data type?
  - so something like this: `{a: 1, b: '2', c: 'three'}` do we have to test that all values are of the same type?
- does order matter for the object?
  - delicate question, generally objects shouldn't preserve order the way arrays do, how to guarantee if required?
- object with all 'good' values, object with all 'bad' values
  - so if it we were testing for even `{a: 2, b: 4}` would be all good and `{a: 1, b: 3}` would be all bad
- *are there any other edge cases to consider for objects?*

## Off The Wall Arguments Given
- do we need to handle arguments given that are of a totally different data type?
- so if we create a function that expects an array: `function sumIt(array) { ... `
  - do we need to handle:
    - no argument `sumIt()` (where it is undefined since nothing is given)
      - this would attempt to run since loose arity, so do we handle it
    - bad data type given `sumIt('hello')`, `sumIt(1, 2, 3, 4)`

## When Sorting
- remember to ask what to do when two values are equal? (say last name, stable sort or go to first name)
