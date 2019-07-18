import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Players from "../../players/index";
import { Course } from "../../courses/course/index";

const GET_COURSES_Q = gql`
  {
    courses {
      id
      name
    }
  }
`;

const GET_PLAYERS_Q = gql`
  {
    players {
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
  state = {
    playersVisible: false,
    courseVisible: false,
    courseID: null
  };

  handleCourseChange(e) {
    this.setState({
      playersVisible: e.target.value !== "Please choose..." ? true : false,
      courseVisible: e.target.value !== "Please choose..." ? true : false,
      courseID: e.target.value
    });
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
                <label>Choose course</label>
                <select onChange={e => this.handleCourseChange(e)}>
                  <option selected>Please choose...</option>
                  {data.courses &&
                    data.courses.map((course, i) => (
                      <option key={`course-option-${i}`} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                </select>

                {/* <Link to="/add-round" className="btn">
                  Add round +
                </Link> */}
                <Players playersVisible={this.state.playersVisible} />
                <Course
                  courseVisible={this.state.courseVisible}
                  courseID={this.state.courseID}
                  editable={true}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default addRound;
