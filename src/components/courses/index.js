import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { List, Avatar, Divider, Typography, Button } from "antd";
import { COURSES_LIST_Q } from "../../threads/queries";

const { Title, Paragraph } = Typography;

export const Courses = props => {
  return (
    <Query query={COURSES_LIST_Q}>
      {({ data }) => {
        return (
          <Fragment>
            <Title>Welcome to Stableford</Title>
            <Paragraph>
              Webapp is currently still in Alpha, we welcome any{" "}
              <a href="mailto: jrobertson_uk@msn.com">feedback</a>
            </Paragraph>
            <Divider />
            <h2>What would you like to do?</h2>
            <List bordered>
              <List.Item>
                <Link to="/rounds">
                  <Button>View rounds</Button>
                </Link>
              </List.Item>
              <List.Item>
                <Link to="/add-round">
                  <Button>Start a new round </Button>
                </Link>
              </List.Item>
              <List.Item>
                <Link to="/players">
                  <Button>View Players</Button>
                </Link>
              </List.Item>
            </List>

            <Divider />
            <h2>Active Courses</h2>
            <List
              dataSource={data.courses}
              itemLayout="horizontal"
              renderItem={course => (
                <List.Item
                  key={course.id}
                  actions={[
                    <Link to={`/courses/${course.id}`}>
                      <Button>Course detail</Button>
                    </Link>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Link to={`/courses/${course.id}`}>{course.name}</Link>
                    }
                    description={course.location}
                    avatar={<Avatar src="images/user-default.svg" />}
                  />
                </List.Item>
              )}
            />
          </Fragment>
        );
      }}
    </Query>
  );
};
