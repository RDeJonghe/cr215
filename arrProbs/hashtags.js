/*
Write a function that retrieves the top 3 longest words of a newspaper headline and transforms them into hashtags. If multiple words tie for the same length, retrieve the word that occurs first.

Examples

Notes
If the title is less than 3 words, just order the words in the title by length in descending order (see example #4).
Punctuation does not count towards a word's length.

INPUT - string
OUTPUT - array of 3 strings, can be less
REQUIREMENTS
- need to find the 3 longest words from the string
- need to transform these into hashtags
  - hashtags are all lowercase and they get added a #
- ignore punctuation
- resutls are from longest to shortest
- if multiple words have the same length choose the first

EXAMPLES/EDGE CASE
- empty string
- all same length
- very small result (one)

DATA STRUCTURES
- array of words
- results array

ALGORTIHM
- take string and lowercase it
- replace any punctiuation with ''  (!.,?) not alpha or space
- split into an array of words for analysis
- sort stable, cna sort by length
- slice the array from 0, 3
- map this by just prepending with a #
- return this

SUBPROBLEMS
- sort by word length
  - do comparison by length
*/

function getHashTags(title) {
  title = title.toLowerCase();
  let words = title.split(' ');
  words = words.map(word => {
    return word.replace(/[^a-z]/g, '');
  });
  
  words.sort(byLength);
  let hashtags = words.slice(0, 3);
  return hashtags.map(hashtag => {
    return '#' + hashtag;
  })
}

function byLength(a, b) {
  let aLength = a.length;
  let bLength = b.length;

  return bLength - aLength;
}

console.log(getHashTags("How the Avocado Became the Fruit of the Global Trade"));
// // ➞ ["#avocado", "#became", "#global"]

console.log(getHashTags("Why You Will Probably Pay More for Your Christmas Tree This Year"));
// // ➞ ["#christmas", "#probably", "#will"]

console.log(getHashTags("Hey Parents, Surprise, Fruit Juice Is Not Fruit"));
// ➞ ["#surprise", "#parents", "#fruit"]

console.log(getHashTags("Visualizing Science"));
// // ➞ ["#visualizing", "#science"]
console.log(getHashTags("Visualizing"));
// // ➞ ["#visualizing"]
console.log(getHashTags('the are won who'));
// // [#the #are #won]
