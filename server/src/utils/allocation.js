const ALLOCATION_PER_STUDENT = 5;

const allocateCourse = (student, courses) => {
  // Iterate over current preferences and allocate if possible.
  console.log(
    "weight: ",
    student.allocationWeight,
    "budget :",
    student.ects_budget
  );
  while (student.allocationWeight < student.ects_budget) {
    // console.log("a", student.ranking);
    let pref = student.ranking.shift();
    if (!pref) {
      // all the preferences got exhausted, no more courses
      console.log("preferences exhausted", student.allocationWeight);
      break;
    }
    console.log("yo", courses, "sho", pref);
    if (courses[pref].capacity > 0) {
      // Seat is available so allocate
      console.log("b", courses[pref]);
      courses[pref].capacity--; // reduce the capacity
      student.allocation.push(pref);
      student.allocationWeight += courses[pref].ects;
      return;
    }
  }
  console.log("Allocation failed for student ", student);
  throw new Error("Allocation failed");
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tempIndex = array[i];
    array[i] = array[j];
    array[j] = tempIndex;
  }
  return array;
};

const getRandomOrder = (size) => {
  let order = [];
  for (let i = 0; i < size; i++) {
    order.push(i);
  }
  return shuffleArray(order);
};

const allocateCourses = (inputStudents, inputCourses) => {
  const students = inputStudents
    .filter((s) => s.is_submitted)
    .map((s) => {
      //1. add ects_budget to return variables for students
      return {
        id: s.id,
        ranking: s.ranking,
        ects_budget: s.ects_budget,
        allocation: [],
      };
    });

  let courses = {};
  //2. add ects to return variables for courses
  for (let c of inputCourses) {
    courses[c.id] = { capacity: c.capacity, ects: c.ects };
  }

  // let order;
  // Allocated all the courses for all the students
  let studentOrder = getRandomOrder(students.length);
  console.log("order: ", studentOrder);
  // 3. swap out APS for ects budget/weight below (??)

  // Get the student list in a random order
  let listForCurrentRound = [];
  for (let i = 0; i < students.length; i++) {
    listForCurrentRound.push(students[studentOrder[i]]);
    listForCurrentRound = listForCurrentRound.map((s) => {
      return { ...s, allocationWeight: 0 };
    });
  }

  // process the list until there is no student left.
  let listForTheNextRound = [];
  // allocate one course
  while (listForCurrentRound.length > 0) {
    let student = listForCurrentRound.shift();
    if (student.allocationWeight >= student.ects_budget) {
      // this student is fully allocated
      continue;
    }
    allocateCourse(student, courses);

    // if student allocation has finished then continue
    listForTheNextRound.unshift(student);
    if (listForCurrentRound.length === 0) {
      // Swap the lists when the first list is fully processed
      listForCurrentRound = listForTheNextRound;
      listForTheNextRound = [];
    }
  }

  const result = students.map((s) => {
    return {
      id: s.id,
      allocation: s.allocation,
    };
  });

  return result;
};

const getDemand = (inputStudents, inputCourses) => {
  const demand = {};
  inputStudents
    .filter((s) => s.is_submitted)
    .flatMap((s) => {
      //1. add ects_budget to return variables for students
      return s.ranking.slice(0, ALLOCATION_PER_STUDENT);
    })
    .forEach((courseId) => {
      demand[courseId] = (demand[courseId] || 0) + 1;
    });
  const courseIdNameMap = {};
  inputCourses.forEach((course) => {
    courseIdNameMap[course._id] = course.name;
  });
  const prettyDemand = [];
  Object.keys(demand).forEach(function (courseId) {
    const demandValue = demand[courseId];
    const courseName = courseIdNameMap[courseId];
    prettyDemand.push({ id: courseId, name: courseName, demand: demandValue });
  });
  return prettyDemand;
};

module.exports = { allocateCourses, getDemand };
