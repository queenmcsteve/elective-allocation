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
    matching_index: Int
    ranking: [Int]
  }

  type Query {
    hello: String
    courses: [Course]
    students: [Student]
  }

  input CourseChoice {
    id: ID
  }

  input MatchIndex {
    studentId: ID
    matching_index: Int
  }

  type Mutation {
    addRanking(ranking: [CourseChoice]!): Boolean
    login(username: String!, password: String!): String
    updateMatchIndices(students: [MatchIndex]): Boolean
  }
`;
// addMatchIndex(matchingIndex: [Student]!): Number

module.exports = typeDefs;
