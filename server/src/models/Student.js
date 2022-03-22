const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  ects_budget: {
    type: Number,
    required: true,
    //   validate: {
    //     min: 1,
    //     max: 10,
    //     isInt: true,
    //   },
  },
  matching_index: {
    type: Number,
  },
  ranking: [{ type: Schema.Types.ObjectId }],
});

const Student = model("Student", studentSchema);

module.exports = Student;
