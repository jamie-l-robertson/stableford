import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Layout, Form, Select, DatePicker, Input, Button, Icon } from "antd";
import Players from "../../players/index";

const { Content, Sider } = Layout;

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
      <Layout>
        <Query query={GET_COURSES_Q}>
          {({ loading, error, data }) => {
            const { courses } = data;

            return (
              <Form onSubmit={this.handleSubmit}>
                {error ? <div>{error}</div> : null}
                {loading ? <div>Loading...</div> : null}
                <Content style={{ padding: "30px" }}>
                  <Layout style={{ padding: "30px", background: "#FFFFFF" }}>
                    {courses && (
                      <Sider
                        width={280}
                        style={{
                          background: "#FFFFFF",
                          borderRight: "1px solid #EEEEEE",
                          paddingRight: "30px"
                        }}
                      >
                        <Form.Item label="Course">
                          <Select placeholder="Select course">
                            {courses.map(course => (
                              <option key={course.id} value={course.id}>
                                {course.name}
                              </option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item label="Tee date">
                          <DatePicker
                            placeholder="Select date"
                            onChange={this.onCalendarChange}
                            value={this.state.date}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                        <Form.Item label="Tee time">
                          <Input placeholder="Tee time" />
                        </Form.Item>
                        <Button type="primary">
                          Start round
                          <Icon type="right" />
                        </Button>
                      </Sider>
                    )}
                    <Content style={{ padding: "0 30px", minHeight: 400 }}>
                      <Form.Item label="Players">
                        <Players layout="list" selectable />
                      </Form.Item>
                    </Content>
                  </Layout>
                </Content>
              </Form>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default addRound;
