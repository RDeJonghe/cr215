/* 12:03 12:37
Suppose a pair of identical characters serve as book ends for all characters in between them. Write a function that returns the total number of unique characters (books, so to speak) between all pairs of book ends.

The function will look like:

console.log(countBooks("stringSequence", "bookEnd"))
Examples

Notes
No book characters will be identical to the bookend character.
There will always be an even number of bookends.
Once a bookend is used to complete a pair, a new bookend must be found to create another pair.
Return 0 if bookends contain zero books.

INPUT - a string that represents books and bookends and a bookend identifier
OUTPUT - integer
REQUIREMENTS
- identical chars serve as bookends for all chars in between
  - so other chars are books, the special chars are the bookends
- need to find the total number of books that are between bookends
- bookends are unique
- there will always be a even number of bookends
- if no books in between return 0

DATA STRUCTURES
- array to represent the different organization of books
- intermediate data structure would include just the books between book ends

ALGORTIHM
- if any args are empty strings return 0
- separate out the secionts of books that need to be counted
  - make sure to remove leading and ending books - not in bewtween bookends
- split the string to get an array of sections
  - first/last/multiple bookends will be identified with an empty string - this is okay
  - this will give us the sections we need
- can transform this into an array of lengths
  - for empty strings return 0 - also length
  - for other strings return length
- this will give the total number of books
- just sum these

SUBPROBLEMS
-> remove leading and ending books
- given a string and a bookend char
- test if it begins and ends with the book end char
  - if so just return that
- if not
  - findIndex and findLast index of the bookend char
  - slice from the first index to the last index (it's exclusive)
  - return this slice

*/



function removeLeadingAndEndingBooks(bookShelf, bookend) {
  if (bookShelf.startsWith(bookend) && bookShelf.endsWith(bookend)) return bookShelf;

  let firstBookEnd = bookShelf.indexOf(bookend);
  let lastBookendInclusive = bookShelf.lastIndexOf(bookend) + 1;

  return bookShelf.slice(firstBookEnd, lastBookendInclusive);
}

function countBooks(bookShelf, bookend) {
  if (bookShelf === '' || bookend === '') return 0;
  let relevantSections = removeLeadingAndEndingBooks(bookShelf, bookend);
  let books = relevantSections.split(bookend);

  return books.reduce((totalBooks, bookSection) => {
    return totalBooks + bookSection.length;
  }, 0);

}




// standard case
console.log('1', countBooks('#abc#', '#'), 3);
// one book
console.log('2', countBooks('#a#', '#'), 1);
// no books
console.log('3', countBooks('##', '#'), 0);

// multiple bookends
console.log('4', countBooks('#abc#def#ghi#', '#'), 9);
// multiple bookends next to each other
console.log('4', countBooks('#abc##def##ghi#', '#'), 9);
// special chars, case doesn't matter
console.log('5', countBooks('#AB5!9r)#', '#'), 7);
// no bookshelf given
console.log('6', countBooks('', '#'), 0);
// no bookend given
console.log('7', countBooks('@abcde@', ''), 0);
// test a different bookend char
console.log('8', countBooks('$abc$', '$'), 3);
// multiple books of same book
console.log('9', countBooks('$aaa$', '$'), 3);
// books outside of the bookends don't count, have to be in between
console.log('a', countBooks('abc$deg$rtu', '$'), 3); // only 3 int between
console.log('a', countBooks('abc$$rtu', '$'), 0); // none between











// console.log(countBooks("AZYWABBCATTTA", "A"), 4)

// // 1st bookend group: "AZYWA" : 3 unique books: "Z", "Y", "W"
// // 2nd bookend group: "ATTTA": 1 unique book: "T"
// // "ABBCA" not included since the first "A" was used in the 1st bookend group.

// console.log(countBooks("$AA$BBCATT$C$$B$", "$"), 3)

// console.log(countBooks("ZZABCDEF", "Z"), 0)