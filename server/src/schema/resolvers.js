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
  },
};

module.exports = resolvers;
