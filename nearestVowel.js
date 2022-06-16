/*
Given a letter, created a function which returns the nearest vowel to the letter. If two vowels are equidistant to the given letter, return the earlier vowel.

All letters will be given in lowercase.
There will be no alphabet wrapping involved, meaning the closest vowel to "z" should return "u", not "a".

INPUT - letter
OUPUT - letter
REQUIREMENTS
- need to find the nearest vowel to the letter
- if two are the same distance away, give the eariler one in the alphabet
- this means have to search for vowels before and after
- no alphabet wrapping

EXAMPLES/EDGE CASES
- if it's a vowel, just return itself

DATA STRUCTURE - array to store chars possibly

SUB PROBLEMS

ALGORITHM
- can use char codes in general
- store target vowel char codes in an array - these will be used to find the closest
- given a vowel find it's char code
- iterate over the array / map it
  - map the absolute value of the targetchar minus the current char from array
  - this will give an array of integers
- next just iterate over that array and find the smallest and the index here
  - so set a result to infinity
  - set an index to -1
    - for iteration if the current is smaller change it
    - also change the index, that is what we really need
- after iteration take the target index and access the char from the given vowels array
*/



const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function findDistances(char) {
  let charCode = char.charCodeAt();
  return VOWELS.map(vowel => {
    return Math.abs(charCode - vowel.charCodeAt());
  })
}

function nearestVowel(char) {
  let distances = findDistances(char);
  let smallest = Infinity;
  let smallestIndex = -1;

  distances.forEach((distance, index) => {
    if (distance < smallest) {
      smallest = distance;
      smallestIndex = index;
    }
  })
  return VOWELS[smallestIndex];
}



console.log(nearestVowel("a") === "a");
console.log(nearestVowel("b") === "a");
console.log(nearestVowel("c") === "a");
console.log(nearestVowel("d") === "e");
console.log(nearestVowel("e") === "e");
console.log(nearestVowel("f") === "e");
console.log(nearestVowel("g") === "e");
console.log(nearestVowel("h") === "i");
console.log(nearestVowel("i") === "i");
console.log(nearestVowel("j") === "i");
console.log(nearestVowel("k") === "i");
console.log(nearestVowel("l") === "i");
console.log(nearestVowel("m") === "o");
console.log(nearestVowel("n") === "o");
console.log(nearestVowel("o") === "o");
console.log(nearestVowel("p") === "o");
console.log(nearestVowel("q") === "o");
console.log(nearestVowel("r") === "o");
console.log(nearestVowel("s") === "u");
console.log(nearestVowel("t") === "u");
console.log(nearestVowel("u") === "u");
console.log(nearestVowel("v") === "u");
console.log(nearestVowel("w") === "u");
console.log(nearestVowel("x") === "u");
console.log(nearestVowel("y") === "u");
console.log(nearestVowel("z") === "u");