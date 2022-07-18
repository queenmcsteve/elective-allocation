const ALLOCATION_PER_STUDENT = 5;

const allocateCourse = (student, courses) => {
  // Iterate over current preferences and allocate if possible.
  while (true) {
    let pref = student.ranking.shift();
    if (!pref) {
      // all the preferences got exhausted, no more courses
      console.log("preferences exhausted");
      break;
    }
    if (courses[pref] > 0) {
      // Seat is available so allocate
      courses[pref]--; // reduce the capacity
      student.allocation.push(pref);
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
      return { id: s.id, ranking: s.ranking, allocation: [] };
    });

  let courses = {};
  //2. add ects to return variables for courses
  for (let c of inputCourses) {
    courses[c.id] = c.capacity;
  }

  //function to reverse an array (native function reverses in-place)
  function reverseArray(arr) {
    var newArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      newArray.push(arr[i]);
    }
    return newArray;
  }
  // let order;
  // Allocated all the courses for all the students
  let orderEven = getRandomOrder(students.length);
  console.log("even: ", orderEven);
  const orderOdd = reverseArray(orderEven);
  console.log("odd: ", orderOdd);
  // 3. swap out APS for ects budget/weight below (??)
  for (let i = 0; i < ALLOCATION_PER_STUDENT; i++) {
    // Generate random order for students
    // order =
    //   i % 2 === 1 && order ? order.reverse() : getRamdomOrder(students.length);
    let ordering = i % 2 === 0 ? orderEven : orderOdd;
    console.log("round: ", i, "order: ", ordering);
    for (let i = 0; i < students.length; i++) {
      let student = students[ordering[i]];
      // Allocate a course to student

      // Allocate the course
      allocateCourse(student, courses);
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
