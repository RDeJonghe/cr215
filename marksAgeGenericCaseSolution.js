function highestAge(obj, arrOfObjs) {
  let highest = true;
  arrOfObjs.forEach(nestedObj => {
    if (nestedObj.marks === obj.marks && nestedObj.age > obj.age) {
      highest = false;
    }
  })
  return highest;
}

function getObject(obj) {
  let valuesObjects = Object.values(obj);
  let highestAgeForMark = valuesObjects.filter(subObj => {
    return highestAge(subObj, valuesObjects);
  })
  let withKeys = highestAgeForMark.map((obj, idx) => {
    return [idx, obj];
  })
  return Object.fromEntries(withKeys);
}

let testCaseObj = {
  "0": { age: 18, name: "john", marks: "400" },
  "1": { age: 17, name: "julie", marks: "400" },
  "2": { age: 16, name: "Robin", marks: "200" },
  "3": { age: 16, name: "Bella", marks: "300" }
}

console.log(getObject(testCaseObj))

// {
//   "0": { age: 18, name: "john", marks: "400" },
//   "1": { age: 16, name: "Robin", marks: "200" },
//   "2": { age: 16, name: "Bella", marks: "300" }
// }
