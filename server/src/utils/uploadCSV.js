const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("../config/connection");
const Course = require("../models/Course");
const Student = require("../models/Student");
// const Admin = require("../models/Admin");

const data = [];

let courseData = "./RankMatch_courses.csv";
let studentData = "./RankMatch_students.csv";

const uploadCourseData = (courseData) => {
  fs.createReadStream(courseData)
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
    .on("data", function (row) {
      data.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log(data);
      console.log("finished");
    });

  db.once("open", async () => {
    try {
      await Course.deleteMany({});

      const courses = await Course.insertMany(data);
      for (newCourse of courses) {
      }

      console.log("all done!");
      process.exit(0);
    } catch (error) {
      throw error;
    }
  });
};

const uploadStudentData = (studentData) => {
  fs.createReadStream(studentData)
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
    .on("data", function (row) {
      data.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log(data);
      console.log("finished");
    });

  db.once("open", async () => {
    try {
      await Student.deleteMany({});

      const courses = await Student.insertMany(data);
      for (newCourse of courses) {
      }

      console.log("all done!");
      process.exit(0);
    } catch (error) {
      throw error;
    }
  });
};

// module.exports = { uploadCourseData, uploadStudentData };
