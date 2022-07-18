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

const ME = gql`
  mutation Me {
    me {
      id
      email
      ranking
      is_submitted
      rank_url
    }
  }
`;

const PERFORM_ALLOCATION = gql`
  mutation performAllocation {
    performAllocation
  }
`;

const GET_DEMAND = gql`
  mutation Mutation {
    calculateDemand {
      id
      name
      demand
    }
  }
`;

export {
  SUBMIT_RANKING,
  LOGIN,
  GENERATE_URLS,
  GENERATE_URL_BY_ID,
  ME,
  PERFORM_ALLOCATION,
  GET_DEMAND,
};
