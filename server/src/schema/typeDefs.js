const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Course {
    id: ID
    name: String
    ects: Int
    capacity: Int
  }

  type Student {
    id: ID
    email: String
    ects_budget: Int
  }

  type Query {
    hello: String
    courses: [Course]
    students: [Student]
  }

  input CourseChoice {
    id: ID
  }

  type Mutation {
    addRanking(ranking: [CourseChoice]!): Boolean
    login(username: String!, password: String!): String
  }
`;

module.exports = typeDefs;
