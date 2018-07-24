import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_COURSES_Q = gql`
  {
    courses {
      id
      name
    }
  }
`;

const ADD_ROUND_Q = gql`
  mutation createRoundAndAddPlayers(
    $courseID: ID!
    $playerIDS: [PlayerWhereUniqueInput!]
  ) {
    createRound(
      data: {
        status: PUBLISHED
        courses: { connect: { id: $courseID } }
        players: { connect: $playerIDS }
      }
    ) {
      id
      status
      courses {
        id
        name
      }
      players {
        name
      }
    }
  }
`;

class addRound extends React.Component {
  handleCourseChange(e) {
    if (e.target.value !== "Please choose...") {
      console.log(e.target.value);
    }
  }
  render() {
    return (
      <React.Fragment>
        <Query query={GET_COURSES_Q}>
          {({ loading, error, data }) => {
            return (
              <React.Fragment>
                {error ? <div>{error}</div> : null}
                {loading ? <div>Loading...</div> : null}
                <select onChange={this.handleCourseChange}>
                  <option selected>Please choose...</option>
                  {data.courses &&
                    data.courses.map((course, i) => (
                      <option key={`course-option-${i}`}>{course.name}</option>
                    ))}
                </select>
                <Link to="/add-round">Add round +</Link>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default addRound;
