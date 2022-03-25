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

  for (let i = 0; i < ALLOCATION_PER_STUDENT; i++) {
    for (let student of students) {
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
