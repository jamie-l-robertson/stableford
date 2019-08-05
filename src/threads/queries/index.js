import gql from "graphql-tag";

const COURSES_LIST_Q = gql`
  {
    courses(where: {status: PUBLISHED}) {
      id
      name
      location
    }
    competitions {
      name
      id
      startDate
      endDate
    }
  }
`;

const COURSE_SINGLE_Q = gql`
  query courseInfo($courseID: ID!) {
    course(where: { id: $courseID }) {
      name
      id
      location
      description
      holes
    }
  }
`;

const ROUNDS_Q = gql`
  {
    rounds {
      id
      teeTime
      courses {
        id
        name
      }
      players {
        name
        handicap
      }
      complete
    }
  }
`;

const ROUND_SINGLE_Q = gql`
  query roundInfo($roundID: ID!) {
    round(where: { id: $roundID }) {
      teeTime
      scorecard
      courses {
        name
        id
        holes
      }
      players {
        id
        name
        handicap
        status
      }
      complete
      competition {
        id
        name
      }
    }
  }
`;

const PLAYERS_Q = gql`
  {
    players(where: { status: PUBLISHED }) {
      id
      name
      status
      bio
      mugshot {
        url
      }
    }
  }
`;

const PLAYER_SINGLE_Q = gql`
  query playerInfo($playerID: ID!) {
    player(where: { id: $playerID }) {
      name
      id
      handicap
      bio
      mugshot {
        url
      }
      rounds {
        id
        courses {
          name
        }
        scorecard
        complete
      }
    }
  }
`;

export {
  COURSES_LIST_Q,
  COURSE_SINGLE_Q,
  ROUNDS_Q,
  ROUND_SINGLE_Q,
  PLAYERS_Q,
  PLAYER_SINGLE_Q
};
