/*
Vending Machine
Your task is to create a function that simulates a vending machine.

Given an amount of money (in cents ¢ to make it simpler) and a productNumber, the vending machine should output the correct product name and give back the correct amount of change.

The coins used for the change are the following: [500, 200, 100, 50, 20, 10]

The return value is an object with 2 properties:

product: the product name that the user selected.
change: an array of coins (can be empty, must be sorted in descending order).
Examples

Notes
The products are fixed and you can find them in the Tests tab.
If productNumber is invalid (out of range) you should return the string: "Enter a valid product number".
If money is not enough to buy a certain product you should return the string: "Not enough money for this product".
If there's no change, return an empty array as the change.

INPUT - an array of objects, 2 integers
OUTPUT - an object, or error messages (not enough money, wrong product id)
- careful formatting this object

REQUIREMENTS
- money is put in cents (second argument)
- product number is third argument
- if given right amount of money and right product number, output that product and the change
  - the output is an object with product and change, change has a value of an array of integers
- these are coins used: [500, 200, 100, 50, 20, 10]
  - coins returned can be empty array (no coins) or an array of coins sorted desc
- use the constant to find products
- "Enter a valid product number".
- "Not enough money for this product".

- CHANGE REQUIREMENTS
- when giving change back have to format it using correct coins
- use as many of the largest coins possible
- find the amount that needs to be returned and separate it into the correct coins amount

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- arrays and objects, in a nested context

HIGH LEVEL
- given coins and a product need to select that product from the vending machine, take it's name and put it in a results object and also calculate the change needed to return to the buyer and store this in the array associated with the results object

ALGORITHM
- handle the cases of bad product id and not enough money
- set a results object with product as empty string and change as empty array
- choose the correct product from the products array
  - find (iterates over the array of objects checking for criteria)
    - choose the one that matches on number with the product number given as an argument
    - this will return the object we need
- from this object 
  - set the product of results equal to the name of this object, this will give correct name
- calculate the correct change
  - if the price === to the coins given, just skip this and make sure array is empty
  - helper -> give this the price of the product we have identified as an argument also the coins given for the purchase, 


SUBPROBLEMS
-> valid Purchase

-> calculate the correct change price and coins given for puchase
- create a const for coins available to use
-  [500, 200, 100, 50, 20, 10]
- 200 coins given and a price 120
- take the coins given and subtract the price this will give us total cents we need to return
- 80 divide this into the correct coins amounts
- set a current change = to that coin (this will be reassigned)
- set up an empty array for coins []
- could loop over the given coins until the current change  is included in the coins array
  - find the first coin smaller than iterates
    - find iteraate and take the first coin smaller
    - send this to results
    - reassign the current coin to the remainder of this
  - iteration will break when the current coin / remainder is equal to one of the coins here
  - send also current coint to results, the loop broke and this is smallest value

80 -> 50 -> 50 to results, current coin gets reassinged to 30
30 -> 20 -> 20 to results, current coin gets reassigned to 10
10
*/

function correctChange(amountGiven, price) {
  const COINS = [500, 200, 100, 50, 20, 10];
  let totalReturn = amountGiven - price;
  let changeArr = [];
  
  let currentChange = totalReturn;

  if (COINS.includes(currentChange)) changeArr.push(currentChange);

  while (!COINS.includes(currentChange)) {
    let smallerCoin = COINS.find(coin => coin < currentChange);
    changeArr.push(smallerCoin);
    currentChange = currentChange % smallerCoin;
    if (COINS.includes(currentChange)) changeArr.push(currentChange);
  }
  return changeArr;
}


function invalidAmount(amount, price) {
  return (amount < price);
}

function invalidProduct(products, productRequested) {
  let prodNums = [];
  products.forEach(obj => prodNums.push(obj.number));

  return !prodNums.includes(productRequested);
}

function vendingMachine(products, amount, prodNum) {
  let chosenProduct = products.find(obj => {
    return obj.number === prodNum;
  })

  if (invalidProduct(products, prodNum)) return "Enter a valid product number";
  if (invalidAmount(amount, chosenProduct.price)) return "Not enough money for this product";
  let result = {product: "", change: []};

  result.product = chosenProduct.name;

  if (amount !== chosenProduct.price) {
    result.change = correctChange(amount, chosenProduct.price);
  }

  return result;
}



// Products available
const products = [
  { number: 1, price: 100, name: 'Orange juice' },
  { number: 2, price: 200, name: 'Soda' },
  { number: 3, price: 150, name: 'Chocolate snack' },
  { number: 4, price: 250, name: 'Cookies' },
  { number: 5, price: 180, name: 'Gummy bears' },
  { number: 6, price: 500, name: 'Condoms' },
  { number: 7, price: 120, name: 'Crackers' },
  { number: 8, price: 220, name: 'Potato chips' },
  { number: 9, price: 80,  name: 'Small snack' },
];

// invalidProduct(products, 9)

// // standard case of coins returned
console.log(vendingMachine(products, 200, 7)); /* { product: "Crackers", change: [ 50, 20, 10 ] } */
// exact amount, empty array for change
console.log(vendingMachine(products, 200, 2)); /* { product: "Soda", change: [ ] } */

// // one coin for change
console.log(vendingMachine(products, 100, 9)); /* { product: "Small Snack", change: [ 20 ] } */

console.log(vendingMachine(products, 500, 0)); /* "Enter a valid product number" */

console.log(vendingMachine(products, 90, 1)); /* "Not enough money for this product" */

