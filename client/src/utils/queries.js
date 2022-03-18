import { gql } from "@apollo/client";

const COURSES = gql`
  query {
    courses {
      id
      name
    }
  }
`;

export { COURSES };
