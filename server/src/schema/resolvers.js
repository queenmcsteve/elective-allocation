const Course = require("../models/Course");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    courses: async () => {
      return await Course.find({});
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
