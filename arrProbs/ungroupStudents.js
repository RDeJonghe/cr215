/* 11:22
You volunteered to help out teaching a preschool in your area! You were given an array of all students and some important data about them, grouped by their teacher. Create a function that will ungroup every student so you can look at their details individually.

INPUT - array of objects
OUTPUT - an array of objects
REQUIREMENTS
- given an array of students
  - students are objects - these are nested
- students are grouped by teacher
- need to ungroup students and look at details individually
  - students need to be grouped together
  - results is thsi array of student objects
- each student will add a new key/val pari with teacher name
- other data is preserved
  - not all students have the same data, they just keep the data they have and the teacher is added

QUESTIONS
- every student will have a teacher? yes
- every student will have a name? yes
- no students will have the same name? no
- will the data array that contains students ever be empty
  - yes, could have teacher without students
- in main array will the elements always be objects - yes
  - there iwll always be a teacher with this - yes

DATA STRUCTURES / INTERMEDIATE DATA STRUCTURES
- array and object
-> data array of objects for each teacher -> these contain the students
  - [{student obj}, {student}] 
  - this is what needs to be accessed and basically used for the return
    - going to add a k/v pair to each of these
-> to get to data array need to access it's key
-> needs to be done for each object in the outer array
-> outer array
    - contains objects
      - need to access the data key
        - this will take us to a nested array of student objects

APPROACHES
1. first add the teacher to every object within data, this would then be ready. From here iterate over the array of objects and send all data to a results array. the data student objects would all have the teacher info in them
2. create a data structure first of all students and then assign the teacher to them -> difficult to track

ALGORITHM
- if necessary handle empty array edge cases
- set up a results array (this will store student info)
- make deepCopy to use
- iterate over each teacher object
  - set targetName to the current object k/v teacher
  - access the data key - this is an array
  - do a nested iteration over each student
  - on each iteration add the student info so that the student can be linked with teacher
    - create a new k/v pair teacher = targetName
- after this we would have the same structure of arrays and objects just with the student info including a teacher

- combining all of the students together
- this uses the results array (declare close to here)
- iterate over each object (teacher)
  - access the data (array of students)
  - concat this into results


SUBPROBLEM
-> add teacher to each student
  - possibilty of helper method
*/

function ungroupStudents(arr) {
  let stringfied = JSON.stringify(arr);
  let deepCopy = JSON.parse(stringfied);

  deepCopy.forEach(classObj => {
    let targetName = classObj.teacher;
    let studentsArr = classObj.data;
    studentsArr.forEach(studentObj => {
      studentObj.teacher = targetName;
    })
  })

  let results = [];
  deepCopy.forEach(classObj => {
    results = results.concat(classObj.data);
  })
  return results;
}

// console.log(ungroupStudents([{
//   teacher: "Ms. Car",
//   data: [{
//      name: "James",
//      emergencyNumber: "617-771-1082",
//   }, {
//      name: "Alice",
//      allergies: ["nuts", "carrots"],
//   }],
// }, {
//   teacher: "Mr. Lamb",
//   data: [{
//     name: "Aaron",
//     age: 3
//   }]
// }]));
/*
[{
  teacher: "Ms. Car",
  name: "James",
  emergencyNumber: "617-771-1082",
}, {
  teacher: "Ms. Car",
  name: "Alice",
  allergies: ["nuts", "carrots"],
}, {
  teacher: "Mr. Lamb",
  name: "Aaron",
  age: 3,
}]
*/

// console.log(ungroupStudents([{
//   teacher: "Ms. Car",
//   data: [],
// }, {
//   teacher: "Mr. Lamb",
//   data: [{
//     name: "Aaron",
//     age: 3
//   }]
// }]));

/*
[{
  teacher: "Mr. Lamb",
  name: "Aaron",
  age: 3,
}]
*/

// console.log(ungroupStudents([{
//   teacher: "Ms. Car",
//   data: [],
// }, {
//   teacher: "Mr. Lamb",
//   data: []
// }]));

/*
[]
*/


// console.log(
//   ungroupStudents([
//     {
//       teacher: 'Ms. Car',
//       data: [
//         {
//           name: 'James',
//           emergencyNumber: '617-771-1082',
//         },
//         {
//           name: 'Alice',
//           allergies: ['nuts', 'carrots'],
//         },
//       ],
//     },
//     {
//       teacher: 'Mr. Lamb',
//       data: [
//         {
//           name: 'Aaron',
//           age: 3,
//         },
//       ],
//     },
//   ]),
//   [
//     {
//       teacher: 'Ms. Car',
//       name: 'James',
//       emergencyNumber: '617-771-1082',
//     },
//     {
//       teacher: 'Ms. Car',
//       name: 'Alice',
//       allergies: ['nuts', 'carrots'],
//     },
//     {
//       teacher: 'Mr. Lamb',
//       name: 'Aaron',
//       age: 3,
//     },
//   ]
// );

console.log(
  ungroupStudents([
    {
      teacher: 'Ms. Sherman',
      data: [
        {
          name: 'Carmen',
          feildTripConsentSlipSigned: false,
        },
      ],
    },
    {
      teacher: 'Mr. Shoe',
      data: [
        {
          name: 'Braden',
          favoriteBook: 'Where the Wild Things Are',
        },
        {
          name: 'Angelo',
          playsSports: true,
        },
      ],
    },
  ]),
  [
    {
      teacher: 'Ms. Sherman',
      name: 'Carmen',
      feildTripConsentSlipSigned: false,
    },
    {
      teacher: 'Mr. Shoe',
      name: 'Braden',
      favoriteBook: 'Where the Wild Things Are',
    },
    {
      teacher: 'Mr. Shoe',
      name: 'Angelo',
      playsSports: true,
    },
  ]
);