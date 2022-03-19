const db = require("../config/connection");
const Course = require("../models/Course");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

const courseData = require("./courseData.json");
const studentData = require("./studentData.json");
const adminData = require("./adminData.json");

db.once("open", async () => {
  try {
    await Course.deleteMany({});
    await Student.deleteMany({});
    await Admin.deleteMany({});

    const courses = await Course.insertMany(courseData);
    for (newCourse of courses) {
    }
    const students = await Student.insertMany(studentData);
    for (newStudent of students) {
    }
    const admin = await Admin.create(adminData);

    console.log("all done!");
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
