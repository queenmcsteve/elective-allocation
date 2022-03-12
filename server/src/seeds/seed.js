const db = require("../config/connection");
const Course = require("../models/Course");

const courseData = require("./courseData.json");

db.once("open", async () => {
  await Course.deleteMany({});

  const courses = await Course.insertMany(courseData);

  for (newCourse of courses) {
  }

  console.log("all done!");
  process.exit(0);
});
