import React from "react";
import { Query } from "react-apollo";
import { Grid, Form, Select, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import Calendar from "react-calendar";
import Players from "../../players/index";

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
    date: null,
    courseID: null
  };

  handleSubmit = event => {
    console.log("form submitted");
    event.preventDefault();
  };

  courseSelectHandler(courses) {
    const options = courses.map(course => {
      return {
        key: course.id,
        text: course.name,
        value: course.id
      };
    });

    return [...options];
  }

  onCalendarChange = date => this.setState({ date });

  render() {
    return (
      <Query query={GET_COURSES_Q}>
        {({ loading, error, data }) => {
          const { courses } = data;

          return (
            <Form onSubmit={this.handleSubmit}>
              {error ? <div>{error}</div> : null}
              {loading ? <div>Loading...</div> : null}
              <Grid container divided>
                <Grid.Row>
                  {courses && (
                    <Grid.Column width={4}>
                      <Form.Field
                        control={Select}
                        options={this.courseSelectHandler(courses)}
                        label={{
                          children: "Course",
                          htmlFor: "form-select-control-course"
                        }}
                        placeholder="Course"
                        search
                        searchInput={{ id: "form-select-control-course" }}
                        required
                      />
                      <Form.Field>
                        <Calendar
                          onChange={this.onCalendarChange}
                          value={this.state.date}
                        />
                      </Form.Field>
                      <Form.Input
                        fluid
                        label="Tee time"
                        placeholder="10:00"
                        required
                      />
                      <Button type="submit" primary>
                        Start round
                      </Button>
                    </Grid.Column>
                  )}
                  <Grid.Column width={12}>
                    <Form.Field>
                      <label>Players</label>
                    </Form.Field>
                    <Players layout="list" selectable />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          );
        }}
      </Query>
    );
  }
}

export default addRound;
