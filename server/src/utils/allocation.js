const ALLOCATION_PER_STUDENT = 5;

const allocateCourse = (student, courses) => {
  // Iterate over current preferences and allocate if possible.
  while (true) {
    let pref = student.ranking.shift();
    if (!pref) {
      // all the preferences got exhausted, no more courses
      break;
    }
    if (courses[pref] > 0) {
      // Seat is available so allocate
      courses[pref]--; // reduce the capacity
      student.allocation.push(pref);
      return;
    }
  }
  console.log("Allocation failed for student ", student.id);
  throw new Error("Allocation failed");
};

const getRamdomOrder = (size) => {
  let order = [];
  for (let i = 0; i < size; i++) {
    order.push(i);
  }
  return order;
};

const allocateCourses = (inputStudents, inputCourses) => {
  const students = inputStudents
    .filter((s) => s.is_submitted)
    .map((s) => {
      return { id: s.id, ranking: s.ranking, allocation: [] };
    });

  let courses = {};
  for (let c of inputCourses) {
    courses[c.id] = c.capacity;
  }

  // Allocated all the courses for all the students
  for (let i = 0; i < ALLOCATION_PER_STUDENT; i++) {
    // Generate random order for students
    let order = getRamdomOrder(students.length);
    console.log("order", order);
    for (let i = 0; i < students.length; i++) {
      let student = students[order[i]];
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

module.exports = allocateCourses;
