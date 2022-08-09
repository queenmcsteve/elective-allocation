const fs = require("fs");
const { parse } = require("csv-parse");

const data = [];

fs.createReadStream("./RankMatch_courses.csv")
  .pipe(parse({ delimiter: ",", columns: true, ltrim: true }))
  .on("data", function (row) {
    console.log(row);
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("finished");
  });

const uploadCsv = (courses) => {
  const courseCsv = courses;
};

module.exports = { uploadCsv };
