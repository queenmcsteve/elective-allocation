const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("../config/connection");
const Course = require("../models/Course");
const Student = require("../models/Student");
// const Admin = require("../models/Admin");

const dataC = [];
const dataS = [];

let courseData = "./RankMatch_courses.csv";
let studentData = "./RankMatch_students.csv";

const uploadCourseData = (courseData) => {
  fs.createReadStream(courseData)
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
    .on("data", function (row) {
      dataC.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log(dataC);
      console.log("finished");
    });

  db.once("open", async () => {
    try {
      await Course.deleteMany({});

      const courses = await Course.insertMany(dataC);
      for (newCourse of courses) {
      }

      console.log("all done!");
    } catch (error) {
      throw error;
    }
  });
};

const uploadStudentData = (studentData) => {
  fs.createReadStream(studentData)
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
    .on("data", function (row) {
      dataS.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log(dataS);
      console.log("finished");
    });

  db.once("open", async () => {
    try {
      await Student.deleteMany({});

      const students = await Student.insertMany(dataS);
      for (newStudent of students) {
      }

      console.log("all done!");
      process.exit(0);
    } catch (error) {
      throw error;
    }
  });
};

uploadStudentData(studentData);
uploadCourseData(courseData);

// module.exports = { uploadCourseData, uploadStudentData };
