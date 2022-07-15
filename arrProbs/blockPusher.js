/* 3:20

Create a function which returns the state of a board after n moves. There are different types of blocks on the board, which are represented as strings.

> is a pusher which moves right every turn, and pushes a block to the right if it occupies the same space as it.
'#' is a block which can be pushed by the pusher. If a block is pushed onto another block, then the other block also joins the push chain!
'-' is an empty space, which a block can be pushed into.
Note that the pusher can push any number of blocks at a time, but is always stopped if the push chain hits the end of the list.

There may be more than one pusher at a time on the board.
Pushers are solid blocks, so a push chain of pushers should also stop when hitting the end of the list.

INPUT - array of strings and a number
OUTPUT - array of strings
REQUIREMENTS
- num is the number of moves to make
- > is a pusher, it moves right every turn/move and it pushes a block to the right if it takes up that space
- # is a block, this can be pushed, can push multiple, so they are both pushed if needed
- - is an empty space, the pushed blocks can take this up
- pusher can push as many blocks as needed, but it will stop if it hits the end of the list
- can be more than one pusher at a time
- pushers are solid also, the stop at the end
- when something moves to the right and empty space takes its place

QUESTIONS
- arrays will only have valid game pieces?
- empty arrays - yes deal with

DATA STRUCTURES
- arrays
- intermediate data structure could be a representation of state change

APPROACHES/HIGH LEVEL
1. set up a loop for the correct number of moves, and on each iteration make a move. to make a single move need to identify where pushes are and modify the board to move everything to the right that's right after it

ALGORTIHM
- make a copy to be able to mutate
- start a loop for the number of moves
- on each move push blocks (helper method)
  - this would move all mulitple blocks so have to handle multiple
  - could identify the index of all of these and then make a move
- after iteration the board we be in a good state


SUBPROBLEMS
- followed by empty space somewhere

-> push blocks
- find the number of pushers - put indexes in a array
- iterate over these indexs starting with the last ones first (right side of array)
- if its not followed by an empty space do nothing
- if it is follwed by an empty space
- take a slice of the array to move it
  - find the empty space index after the pusher
  - reassign the array to a moved slice
  - 

DESCRIPTION OF A PUSH
- if it's at end of array do nothing
- it has to be followed somewhere by an empty space
  - need to check that it's followed by an empty space
  - if not do nohting (this handles end of array also)
- so if it's follwed by an empty space somewhere
  - need to slice/find the section that consists of pushhers/blocks
  - take this off, save it, this is the section that will be moved
- find the index where the pusher was and change that to an empty space
- index after where the pusher was insert the block that is pushed

*/

function blockPushing(arr, num) {

}

console.log(blockPushing(['-', '>', '#', '-', '#', '-', '-', '-'], 1));
//  ['-', '-', '>', '#', '#', '-', '-', '-']);

// end/final state, it all stops and no change made at end of array, they don't just dissapear
console.log(blockPushing(['>', '#', '-', '#', '-', '-', '#'], 10));
//  ['-', '-', '-', '>', '#', '#', '#']);

console.log(blockPushing(['>', '-', '>', '#', '-', '-', '#', '-'], 2));
//  ['-', '-', '>', '-', '>', '#', '#', '-']);

// pushers are solid blocks, pushers no blocks
console.log(blockPushing(['>', '>', '>', '-'], 3));
//  ['-', '>', '>', '>']);

// no pushers - no state change
console.log(blockPushing(['-', '-', '#', '-'], 3)); // same - - # -

// really small array
console.log(blockPushing(['>'], 1)); // same >

// empty array
console.log(blockPushing([], 3)); // same []

// no moves exactly the same no change
console.log(blockPushing(['-', '>', '#', '-', '#', '-', '-', '-'], 0));

// general case
console.log(blockPushing(['-', '>', '#', '-', '#', '#', '-', '-'], 3));
// ['-', '-', '-', '-', '>', '#', '#', '#']


