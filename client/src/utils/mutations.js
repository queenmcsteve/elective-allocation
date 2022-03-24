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

const GENERATE_URL_BY_ID = gql`
  mutation generateUrlById($studentId: String) {
    generateUrlById(studentId: $studentId) {
      id
      email
      rank_url
    }
  }
`;

export {
  SUBMIT_RANKING,
  LOGIN,
  UPDATE_MATCH_INDEX,
  GENERATE_URLS,
  GENERATE_URL_BY_ID,
};
