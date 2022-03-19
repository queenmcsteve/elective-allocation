const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  ects: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const Course = model("Course", courseSchema);

module.exports = Course;
