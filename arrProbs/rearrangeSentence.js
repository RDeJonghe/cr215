/* 5:13 5:21
Given a sentence with numbers representing a word's location embedded within each word, return the sorted sentence.

Only 1 - 9 is used

INPUT - string
OUTPUT - string
REQUIREMENTS

ALGORITHM
- given a string
- split to array of words
- helper function to find the number in a word, return this number
- sort by the helper function
- now have array of words that are sorted
- map each word and replace the string number with "" empty string
- join back to a string
*/

function findNumber(word) {
  return Number(word.match(/[0-9]/g)[0]);
}

function numberAsc(a, b) {
  let aNum = findNumber(a);
  let bNum = findNumber(b);

  if (aNum < bNum) {
    return -1;
  }
  if (aNum > bNum) {
    return 1
  }
  return 0;
}

function rearrange(sentence) {
  if (sentence.trim() === '') return '';
  let words = sentence.split(' ');
  words.sort(numberAsc);
  words = words.map(word => word.replace(/[0-9]/, ''));
  return words.join(' ');
}


console.log(rearrange("is2 Thi1s T4est 3a") === "This is a Test");

console.log(rearrange("4of Fo1r pe6ople g3ood th5e the2") === "For the good of the people");

console.log(rearrange(" ") === "");
