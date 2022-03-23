const { AuthenticationError } = require("apollo-server-express");
const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Student = require("../models/Student");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    courses: async () => {
      return await Course.find({});
    },
    students: async (parent, args, context) => {
      if (context.user) {
        return await Student.find({});
      }
      throw new AuthenticationError("You haven't Logged in!");
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
        throw new AuthenticationError("Account Doesn't Exist!");
      }
      if (await adminUser.isCorrectPassword(args.password)) {
        // generate the token
        const token = signToken({
          username: args.username,
          _id: adminUser._id,
        });
        console.log("password is correct for: ", adminUser);
        return token;
      }
      throw new AuthenticationError("Wrong Password!");
    },
    updateMatchIndices: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You haven't Logged in!");
      }
      try {
        const studentIds = args.students.map((entry) => entry.studentId);
        const studentsToUpdate = await Student.find({
          _id: { $in: studentIds },
        });

        const studentMatchIndexMap = {};
        args.students.map(
          (entry) =>
            (studentMatchIndexMap[entry.studentId] = entry.matching_index)
        );

        for (let student of studentsToUpdate) {
          await Student.findOneAndUpdate(
            { _id: student._id },
            { matching_index: studentMatchIndexMap[student._id] }
          );
        }
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
  },
};

module.exports = resolvers;
