import { gql } from "@apollo/client";

const COURSES = gql`
  query {
    courses {
      id
      name
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

export { COURSES };
