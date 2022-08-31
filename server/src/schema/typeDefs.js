const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Course {
    id: ID
    name: String
    ects: Int
    capacity: Int
    demand: Int
  }

  type Student {
    id: ID
    email: String
    ects_budget: Int
    matching_index: Int
    ranking: [ID]
    rank_url: String
    allocation: [ID]
    is_submitted: Boolean
  }

  type DemandInfo {
    id: ID
    name: String
    demand: Int
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
    rank_url: String
  }

  input CourseInfo {
    id: ID
    name: String
    ects: Int
    capacity: Int
  }

  type Mutation {
    addRanking(ranking: [CourseChoice]!): Boolean
    login(username: String!, password: String!): String
    generateAllUrls: Boolean
    generateUrlById(studentId: String): Student
    me: Student
    performAllocation: Boolean
    calculateDemand: [DemandInfo]
    updateCourse(courseInfo: CourseInfo): Boolean
    uploadCourses(courseData: CourseInfo): Boolean
  }
`;
// addMatchIndex(matchingIndex: [Student]!): Number

module.exports = typeDefs;
