const Course = require("../models/Course");
const Student = require("../models/Student");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    courses: async () => {
      return await Course.find({});
    },
    students: async () => {
      return await Student.find({});
    },
  },

  Mutation: {
    addRanking: (parent, args) => {
      console.log("Received ", args);
      return true;
    },
  },
};

module.exports = resolvers;
