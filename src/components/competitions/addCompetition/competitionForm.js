import React from 'react';
import { Query, withApollo } from "react-apollo";
import Players from "../../players/index";
import { COURSES_LIST_Q } from "../../../threads/queries";
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

      // this.props.client
      //   .mutate({
      //     mutation: ADD_COMPETITION_MUTATION,
      //     variables: {}
      //   })
      //   .then(result => {
      //     this.props.history.push(`/round/${result.data.createCompetition.id}`);
      //   });
    });
  };

  render() {
    return (
      <Query query={COURSES_LIST_Q}>
        {({ loading, error, data }) => {
          const { courses, competitions } = data;
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

export default withApollo(Form.create({ name: "create_competition" })(CompetitionForm));