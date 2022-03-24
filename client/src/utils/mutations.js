import { gql } from "@apollo/client";

const SUBMIT_RANKING = gql`
  mutation ($ranking: [CourseChoice]!) {
    addRanking(ranking: $ranking)
  }
`;

const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const UPDATE_MATCH_INDEX = gql`
  mutation UpdateMatchIndices($students: [MatchIndex]) {
    updateMatchIndices(students: $students)
  }
`;

const GENERATE_URLS = gql`
  mutation generateUrls {
    generateAllUrls
  }
`;

export { SUBMIT_RANKING, LOGIN, UPDATE_MATCH_INDEX, GENERATE_URLS };
