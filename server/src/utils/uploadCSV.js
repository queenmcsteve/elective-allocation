const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("../config/connection");
const Course = require("../models/Course");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

const data = [];

fs.createReadStream("./RankMatch_courses.csv")
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

// const uploadCsv = (courses) => {
//   const courseCsv = courses;
// };

// module.exports = { uploadCsv };
