import React, { Fragment } from "react";
import { Query, withApollo } from "react-apollo";
import dayjs from "dayjs";
import {
  Row,
  Divider,
  Layout,
  Form,
  Select,
  DatePicker,
  Button,
  Icon,
  Spin,
  PageHeader
} from "antd";
import Players from "../../players/index";
import { COURSES_LIST_Q } from "../../../threads/queries";
import { COMPETITION_LIST_Q } from '../../../threads/queries';
import { ADD_ROUND_MUTATION } from "../../../threads/mutations";

const { Content, Sider } = Layout;

class addRound extends React.Component {
  state = {
    date: null,
    courseID: null,
    players: []
  };

  generateDefaultScoreCard(players, names) {
    let data = [];
    let holes = [];

    for (var i = 0; i < 18; i++) {
      holes.push({
        number: i + 1,
        putts: 0
      });
    }

    data = players.map((player, i) => {
      return {
        key: i,
        id: player.id,
        name: names[i].name,
        hole: holes
      };
    });

    return data;
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) console.log("ERROR :: ", err);

      const date = dayjs(values.date).toISOString();
      const players = [];
      const names = [];

      this.state.players.map(player => {
        players.push({ id: player.id });
        names.push({ name: player.name });
      });

      this.props.client
        .mutate({
          mutation: ADD_ROUND_MUTATION,
          variables: {
            courseID: values.courseID,
            playerIDS: players,
            teeTime: date,
            scorecard: this.generateDefaultScoreCard(players, names)
          }
        })
        .then(result => {
          this.props.history.push(`/round/${result.data.createRound.id}`);
        });
    });
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

  handleSelected = e => {
    e.preventDefault();
    let newPlayers = [...this.state.players];

    newPlayers = e.target.checked
      ? [
        { id: e.target.playerID, name: e.target.playerName },
        ...this.state.players
      ]
      : (newPlayers = newPlayers.filter(id => id !== e.target.playerID));

    this.setState({
      players: newPlayers
    });
  };

  render() {
    return (
      <Query query={COURSES_LIST_Q}>
        {({ loading, error, data }) => {
          const { courses, competitions } = data;
          const { getFieldDecorator } = this.props.form;

          console.log(data);

          return (
            <Form onSubmit={this.handleSubmit}>
              {error ? <div>{error}</div> : null}
              {loading ? <Spin /> : null}
              <Fragment>
                <Row gutter={30}>
                  <PageHeader
                    onBack={() => window.history.back()}
                    title="Add Round"
                  />
                </Row>
                <Divider />
              </Fragment>
              <Content>
                <Layout style={{ background: "#FFFFFF" }}>
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
                        {getFieldDecorator("courseID", {
                          rules: [
                            {
                              required: true,
                              message: "Please choose a course!"
                            }
                          ]
                        })(
                          <Select placeholder="Select course">
                            {courses.map(course => (
                              <Select.Option key={course.id} value={course.id}>
                                {course.name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>

                      {competitions &&
                        <Form.Item label="Competition">
                          <Select placeholder="Select competition">
                            {competitions.map(competition => (
                              <Select.Option key={competition.id} value={competition.id}>
                                {competition.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>}

                      <Form.Item label="Tee date">
                        {getFieldDecorator("date", {
                          rules: [
                            {
                              required: true,
                              message: "Please choose a date!"
                            }
                          ]
                        })(
                          <DatePicker
                            showTime={{ format: "HH:mm", minuteStep: 5 }}
                            placeholder="Select date"
                            onChange={this.onCalendarChange}
                            value={this.state.date}
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>


                      <Button type="primary" htmlType="submit">
                        Start round
                        <Icon type="right" />
                      </Button>
                    </Sider>
                  )}
                  <Content style={{ padding: "0 30px", minHeight: 400 }}>
                    <Form.Item>
                      <Players
                        layout="list"
                        handleSelected={this.handleSelected}
                        selectable
                        noHeader
                      />
                    </Form.Item>
                  </Content>
                </Layout>
              </Content>
            </Form>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(Form.create({ name: "create_round" })(addRound));
