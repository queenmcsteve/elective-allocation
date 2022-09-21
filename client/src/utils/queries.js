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
      demand
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
      rankmatch_score
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
      rankmatch_score
    }
    courses {
      id
      name
      ects
      capacity
      demand
    }
  }
`;

export { COURSES, STUDENTS, STUDENTS_COURSES };
