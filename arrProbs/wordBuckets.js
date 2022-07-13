/*
Write a function that divides a phrase into word buckets, with each bucket containing n or fewer characters. Only include full words inside each bucket.

Spaces count as one character.

Trim beginning and end spaces for each word bucket (see final example).

If buckets are too small to hold a single word, return an empty array: []

The final goal isn't to return just the words with a length equal (or lower) to the given n, but to return the entire given phrase bucketized (if possible). So, for the specific case of "by" the only word with a proper length, the phrase can't be bucketized, and the returned array has to be empty.

REQUIREMENTS
- bucket is a group of words
- each bucket needs to contain the target num or fewer chars
- spaces count as a character
- in return you can trim the spaces

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- array for words, array of strings to return

ALGORITHM
- split the words so they keep the space, the space matters
- create the first bucket, an subarray that has the first word in it
- set up a bucket index to be able to access the current bucket
- begin iteration at second word
- if the current word length + the length of all the words in the bucket is less than the target num
  - just push to the bucket
- else it's too long
  - create new bucket, send empty array, increase bucket idx, push to the new bucket index
- this should give us the data structure needed
*/

function bucketize(str, target) {
  const WORD_AND_SPACE = new RegExp(/(?<= )(?=[a-z])/);
  let words = str.split(WORD_AND_SPACE);

  if (bucketTooSmall(words, target)) return [];

  let results = [[words[0]]];
  let bucketIdx = 0;

  for (let i = 1; i < words.length; i += 1) {
    let currentBucket = results[bucketIdx]
    let currentWord = words[i];
    if (bucketPlusWordSmallerOrEqualsTarget(currentBucket, currentWord, target)) {
      results[bucketIdx].push(currentWord);
    } else {
      results.push([]);
      bucketIdx += 1;
      results[bucketIdx].push(currentWord);
    }
  }
  return results.map(bucket => {
    bucket = bucket.map(word => word.trim());
    return bucket.join(' ');
  });
}

function bucketPlusWordSmallerOrEqualsTarget(bucket, currentWord, target) {
  let bucketLength = bucket.reduce((total, word) => total += word.length, 0);
  let totalLength = bucketLength + currentWord.length;
  if (currentWord.endsWith(' ')) {
    return totalLength <= target + 1;
  } else {
    return totalLength <= target;
  }
}

function bucketTooSmall(wordsArr, target) {
  if (wordsArr.every(word => word.length > target)) {
    return true;
  } else {
    return false;
  }
}

function arrayEquality(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((element, idx) => {
    return element === arr2[idx];
  })
}

console.log('1', bucketize("she sells sea shells by the sea", 10), ["she sells", "sea shells", "by the sea"]);

console.log('2', bucketize("the mouse jumped over the cheese", 7), ["the", "mouse", "jumped", "over", "the", "cheese"]);

console.log('3', bucketize("fairy dust coated the air", 20), ["fairy dust coated", "the air"]);

console.log('4', bucketize("a b c d e", 2), ["a", "b", "c", "d", "e"]);

console.log(arrayEquality(bucketize("she sells sea shells by the sea", 10), ["she sells", "sea shells", "by the sea"]));

console.log(arrayEquality(bucketize("the mouse jumped over the cheese", 7), ["the", "mouse", "jumped", "over", "the", "cheese"]));

console.log(arrayEquality(bucketize("fairy dust coated the air", 20), ["fairy dust coated", "the air"]));

console.log(arrayEquality(bucketize("a b c d e", 2), ["a", "b", "c", "d", "e"]));


console.log(arrayEquality(bucketize("she sells sea shells by the sea", 2), []));
console.log(arrayEquality(bucketize("ab bc cd", 1), []));

console.log(arrayEquality(bucketize("do the hokey pokey", 6), ["do the", "hokey", "pokey"]));
console.log(arrayEquality(bucketize("do the hokey pokey", 12), ["do the hokey", "pokey"]));
console.log(arrayEquality(bucketize("rich magnificent trees dotted the landscape", 12), ["rich", "magnificent", "trees dotted", "the", "landscape"]));
console.log(arrayEquality(bucketize("rich magnificent trees dotted the landscape", 15), ["rich", "magnificent", "trees dotted", "the landscape"]));

console.log(arrayEquality(bucketize("rich magnificent trees dotted the landscape", 18), ["rich magnificent", "trees dotted the", "landscape"]));
console.log(arrayEquality(bucketize("rich magnificent trees dotted the landscape", 22), ["rich magnificent trees", "dotted the landscape"]));
console.log(arrayEquality(bucketize("rich magnificent trees dotted the landscape", 40), ["rich magnificent trees dotted the", "landscape"]));
console.log(arrayEquality(bucketize("rich magnificent trees dotted the landscape", 43), ["rich magnificent trees dotted the landscape"]));
console.log(arrayEquality(bucketize("beep bo bee bop bee bo bo bop", 6), ["beep", "bo bee", "bop", "bee bo", "bo bop"]));
console.log(arrayEquality(bucketize("beep bo bee bop bee bo bo bop", 10), ["beep bo", "bee bop", "bee bo bo", "bop"]));
console.log(arrayEquality(bucketize("a b c d e", 3), ["a b", "c d", "e"]));
console.log(arrayEquality(bucketize("a b c d e", 2), ["a", "b", "c", "d", "e"]));
console.log(arrayEquality(bucketize("a b c d e", 1), ["a", "b", "c", "d", "e"]));
console.log(arrayEquality(bucketize("a b c d e", 2), ["a", "b", "c", "d", "e"]));
console.log(arrayEquality(bucketize("a b c d e", 1), ["a", "b", "c", "d", "e"]));