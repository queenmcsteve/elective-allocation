import { gql } from "@apollo/client";

// const COURSES = gql`
//   query {
//     courses {
//       id
//       name
//     }
//   }
// `;

const COURSES = gql`
  query {
    courses {
      id
      name
      ects
      capacity
    }
  }
`;

const STUDENTS = gql`
  query {
    students {
      id
      email
      ects_budget
    }
  }
`;

export { COURSES, STUDENTS };
