const { AuthenticationError } = require("apollo-server-express");
const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Student = require("../models/Student");
const { allocateCourses, getDemand } = require("../utils/allocation");
const { signToken, signStudentToken } = require("../utils/auth");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    courses: async () => {
      return await Course.find({});
    },
    students: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        return await Student.find({});
      }
      throw new AuthenticationError("You haven't Logged in!");
    },
  },

  Mutation: {
    addRanking: async (parent, args, context) => {
      if (context.user) {
        try {
          const rankingArray = args.ranking.map((rank) => rank.id);
          await Student.findOneAndUpdate(
            { _id: context.user._id },
            { ranking: rankingArray, is_submitted: true }
          );
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      } else {
        throw new AuthenticationError("Your link is expired!");
      }
    },
    login: async (_, args) => {
      const adminUser = await Admin.findOne({ username: args.username });
      if (!adminUser) {
        throw new AuthenticationError("Account Doesn't Exist!");
      }
      if (await adminUser.isCorrectPassword(args.password)) {
        // generate the token
        const token = signToken({
          username: args.username,
          _id: adminUser._id,
        });
        return token;
      }
      throw new AuthenticationError("Wrong Password!");
    },

    generateAllUrls: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        const students = await Student.find({});
        for (let student of students) {
          await Student.findOneAndUpdate(
            {
              _id: student._id,
            },
            {
              rank_url: `http://localhost:3000/StudentRank/${signStudentToken({
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
      if (context.user && context.user.isAdmin) {
        const updatedStudent = await Student.findOneAndUpdate(
          {
            _id: args.studentId,
          },
          {
            rank_url: `${context.headers.origin}/StudentRank/${signStudentToken(
              {
                _id: args.studentId,
              }
            )}`,
          },
          { new: true }
        );
        return updatedStudent;
      }
      throw new AuthenticationError("You haven't Logged in!");
    },
    me: async (parent, args, context) => {
      if (context.user && !context.user.isAdmin) {
        return await Student.findById(context.user._id);
      }
      throw new AuthenticationError("You haven't Logged in!");
    },
    performAllocation: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        console.log("Performing allocation");
        const students = await Student.find();
        const courses = await Course.find();
        try {
          const allocations = allocateCourses(students, courses);
          //console.log("allocation: ", allocations);
          for (let student of allocations) {
            await Student.findOneAndUpdate(
              { _id: student.id },
              {
                allocation: student.allocation,
              }
            );
          }
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      throw new AuthenticationError("You haven't Logged in!");
    },

    calculateDemand: async (parent, args, context) => {
      // console.log("XX", context.user, "XXXXX", context.user.isAdmin);
      console.log("Getting demand");
      const students = await Student.find();
      const courses = await Course.find();
      try {
        const demands = getDemand(students, courses);
        for (let course of demands) {
          console.log("inloop: ", course);
          await Course.findOneAndUpdate(
            { _id: course.id },
            { demand: course.demand }
          );
        }
        return demands;
      } catch (err) {
        console.log(err);
        return false;
      }
      // if (context.user && context.user.isAdmin) {
      // }
      // throw new AuthenticationError("You haven't Logged in!");
    },
    updateCourse: async (parent, args, context) => {
      if (context.user) {
        try {
          await Course.findOneAndUpdate(
            { _id: args.courseInfo.id },
            { ...args.courseInfo }
          );
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      } else {
        throw new AuthenticationError("Your link is expired!");
      }
    },
  },
};

module.exports = resolvers;
