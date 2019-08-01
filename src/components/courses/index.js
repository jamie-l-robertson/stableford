import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Layout, List, Avatar } from "antd";
const { Content } = Layout;

const COURSES_Q = gql`
  {
    courses {
      id
      name
      location
    }
  }
`;

export const Courses = props => {
  return (
    <Query query={COURSES_Q}>
      {({ loading, error, data }) => {
        return (
          <Fragment>
            <h2>Courses</h2>
            <List
              dataSource={data.courses}
              itemLayout="horizontal"
              renderItem={course => (
                <List.Item
                  key={course.id}
                  actions={[
                    <Link to={`/courses/${course.id}`}>Course detail</Link>
                  ]}
                >
                  <List.Item.Meta
                    title={course.name}
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
