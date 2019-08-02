import gql from "graphql-tag";

const ADD_ROUND_MUTATION = gql`
  mutation createRoundAndAddPlayers(
    $courseID: ID!
    $playerIDS: [PlayerWhereUniqueInput!]
    $teeTime: DateTime!
    $scorecard: Json!
  ) {
    createRound(
      data: {
        status: PUBLISHED
        courses: { connect: { id: $courseID } }
        players: { connect: $playerIDS }
        scorecard: $scorecard
        teeTime: $teeTime
      }
    ) {
      id
      status
      scorecard
      courses {
        id
        name
      }
      players {
        name
        id
      }
    }
  }
`;

const UPDATE_ROUND_MUTATION = gql`
  mutation upateScorecard($id: ID, $scorecard: Json) {
    updateRound(where: { id: $id }, data: { scorecard: $scorecard }) {
      id
      scorecard
    }
  }
`;

const UPDATE_SCORECARD = gql`
  mutation upateScorecard($id: ID, $complete: Boolean) {
    updateRound(where: { id: $id }, data: { complete: $complete }) {
      id
    }
  }
`;

export { ADD_ROUND_MUTATION, UPDATE_ROUND_MUTATION, UPDATE_SCORECARD };