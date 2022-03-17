import { gql } from "@apollo/client";

const SUBMIT_RANKING = gql`
  mutation ($ranking: [CourseChoice]!) {
    addRanking(ranking: $ranking)
  }
`;

const SubmitRanking = () => {};
