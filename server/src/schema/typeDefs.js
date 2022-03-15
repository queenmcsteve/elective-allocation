const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Course {
    id: ID
    name: String
    ects: Int
    capacity: Int
  }

  type Query {
    hello: String
    courses: [Course]
  }

  input CourseChoice {
    id: ID
  }

  type Mutation {
    addRanking(ranking: [CourseChoice]!): Boolean
  }
`;

module.exports = typeDefs;
