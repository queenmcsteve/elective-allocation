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
    addRanking: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Your link is expired!");
      }
      try {
        const rankingArray = args.ranking.map((rank) => rank.id);
        await Student.findOneAndUpdate(
          { _id: context.user._id },
          { ranking: rankingArray }
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
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
      console.log(args.students);

      if (!context.user) {
        throw new AuthenticationError("You haven't Logged in!");
      }
      try {
        const studentIds = args.students.map((entry) => entry.studentId);
        const studentsToUpdate = await Student.find({
          _id: { $in: studentIds },
        });

        const studentMatchIndexMap = {};
        const studentRankUrlMap = {};
        args.students.map((entry) => {
          studentMatchIndexMap[entry.studentId] = entry.matching_index;
        });
        for (let student of studentsToUpdate) {
          await Student.findOneAndUpdate(
            { _id: student._id },
            {
              matching_index: studentMatchIndexMap[student._id],
            }
          );
        }

        args.students.map(async (student) => {
          await Student.findOneAndUpdate(
            { _id: student._id },
            { rank_url: `http://localhost:3000/StudentRank?${student._id}` }
          );
        });
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
    generateAllUrls: async (parent, args, context) => {
      if (context.user) {
        const students = await Student.find({});
        for (let student of students) {
          await Student.findOneAndUpdate(
            {
              _id: student._id,
            },
            {
              rank_url: `http://localhost:3000/StudentRank/${signToken({
                _id: student._id,
              })}`,
            }
          );
        }
        return true;
      }
      throw new AuthenticationError("You haven't Logged in!");
    },
    generateUrlById: async (parent, args, context) => {
      if (context.user) {
        await Student.findOneAndUpdate(
          {
            _id: args.studentId,
          },
          {
            // TODO: Use the base url of the current host instead of localhost
            rank_url: `http://localhost:3000/StudentRank/${signToken({
              _id: args.studentId,
            })}`,
          }
        );
        return true;
      }
      throw new AuthenticationError("You haven't Logged in!");
    },
  },
};

module.exports = resolvers;
