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
      ranking
      rank_url
      allocation
      is_submitted
    }
  }
`;

const STUDENTS_COURSES = gql`
  query {
    students {
      id
      email
      ects_budget
      ranking
      rank_url
      allocation
      is_submitted
    }
    courses {
      id
      name
      ects
      capacity
    }
  }
`;

export { COURSES, STUDENTS, STUDENTS_COURSES };
