/*
~~~~~~ delete with splice ~~~~~~~~
- this doesn't feel "optimal" but it works as anticipated
- it's able to splice and delete the correct entries, but it feels like this is improper since it is mutating during iteration
- this doesn't feel reliable or the best way to do this
- since entries is being mutated I kind of wonder how it works and correct index is deleted
*/

let badNums = [11, 22, 33, 44, 55, 66, 77, 88, 99];

let groups = {
  a: [1,2,3,4],
  b: [9,44,78,3],
  c: [22,7,3,4],
  d: [6,7,8,9],
  e: [4,3,2],
  f: [99, 22, 33],
  g: [1,1,1,],
  h: [33,2,1]
};

function removeBadGroups(groups, badNums) {
  let entries = Object.entries(groups);

  badNums.forEach(badNum => {
    entries.forEach((entry, idx) => {
      if (entry[1].includes(badNum)) {
        entries.splice(idx, 1);
      }
    })
  })
  return Object.fromEntries(entries);
}


/*
- this is the more natural solution to me, just select with a helper method rather than splice out
*/

function selectGoodGroups(groups, badNums) {
  let entries = Object.entries(groups);
  
  let filtered = entries.filter(entry => {
    return onlyGoodNums(entry, badNums);
  })
  
  return Object.fromEntries(filtered);
}

function onlyGoodNums(entry, badNums) {
  let entryNums = entry[1];
  for (let i = 0; i < badNums.length; i += 1) {
    if (entryNums.includes(badNums[i])) return false;
  }
  return true;
}


console.log(removeBadGroups(groups, badNums))
console.log(selectGoodGroups(groups, badNums))