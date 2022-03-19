const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  ects_budget: {
    type: DataTypes.INTEGER,
    allowNull: false,
    //   validate: {
    //     min: 1,
    //     max: 10,
    //     isInt: true,
    //   },
  },
  //   ranking: {

  //   },
  //   allocation: {

  //   }
});

const Student = model("Student", studentSchema);

module.exports = Student;
