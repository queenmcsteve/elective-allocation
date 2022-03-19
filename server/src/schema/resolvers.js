const Admin = require("../models/Admin");
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
    login: async (_, args) => {
      console.log(args);
      const adminUser = await Admin.findOne({ username: args.username });
      console.log("tick: ", adminUser);
      if (!adminUser) {
        return false;
      }
      if (await adminUser.isCorrectPassword(args.password)) {
        console.log("tock: ", adminUser);
        return true;
      }
      return false;
    },
  },
};

module.exports = resolvers;
