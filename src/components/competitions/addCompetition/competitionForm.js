import React from 'react';
import { Query, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import Players from "../../players/index";
import generateDefaultScoreCard from '../../../helpers/scorecardGenerator';
import { COURSES_LIST_Q } from "../../../threads/queries";
import { ADD_COMPETITION_MUTATION } from "../../../threads/mutations";
import dayjs from "dayjs";
import {
  Layout,
  Form,
  Select,
  Input,
  DatePicker,
  Button,
  Icon,
  Spin
} from "antd";


const { Content, Sider } = Layout;

class CompetitionForm extends React.Component {

  state = {
    date: null,
    courseID: null,
    players: []
  };

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

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) console.log("ERROR :: ", err);

      const startDate = dayjs(values.startDate);
      const endDate = dayjs(values.endDate);
      const tournament_length = endDate.diff(startDate, 'day');
      let players = [];
      let names = [];
      let roundData = {};


      this.state.players.map(player => {
        players.push({ id: player.id });
        names.push({ name: player.name });
      });

      roundData = {
        name: values.name,
        courseID: values.courseID,
        startDate: startDate,
        endDate: endDate,
        rounds: []
      }

      for (var i = 0; i < tournament_length; i++) {
        const roundEntry = {
          players: {
            connect: players
          },
          courses: {
            connect: {
              id: values.courseID
            }
          },
          teeTime: "2019-08-01T00:00:00.570Z",
          scorecard: generateDefaultScoreCard(players, names),
          status: "PUBLISHED"
        };

        roundData.rounds.push(roundEntry);
      }

      this.props.client
        .mutate({
          mutation: ADD_COMPETITION_MUTATION,
          variables: roundData
        })
        .then(result => {
          this.props.history.push(`/competition/${result.data.createCompetition.id}`);
        });
    });
  };

  render() {
    return (
      <Query query={COURSES_LIST_Q}>
        {({ loading, error, data }) => {
          const { courses } = data;
          const { getFieldDecorator } = this.props.form;

          return (
            <Form onSubmit={this.handleSubmit}>
              {error ? <div>{error}</div> : null}
              {loading ? <Spin /> : null}

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

                      <Form.Item label="Competition name">
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
                              message: "Please name your competition"
                            }
                          ]
                        })(
                          <Input />
                        )}
                      </Form.Item>

                      <Form.Item label="Start date">
                        {getFieldDecorator("startDate", {
                          rules: [
                            {
                              required: true,
                              message: "Please choose a start date!"
                            }
                          ]
                        })(
                          <DatePicker
                            placeholder="Select start date"
                            onChange={this.onCalendarChange}
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item label="End date">
                        {getFieldDecorator("endDate", {
                          rules: [
                            {
                              required: true,
                              message: "Please choose a end date!"
                            }
                          ]
                        })(
                          <DatePicker
                            placeholder="Select end date"
                            onChange={this.onCalendarChange}
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>

                      <Button type="primary" htmlType="submit">
                        Start competition <Icon type="right" />
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
    )
  }
}

export default withApollo(withRouter(Form.create({ name: "create_competition" })(CompetitionForm)));