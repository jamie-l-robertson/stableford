import React from "react";
import { Link } from "react-router-dom";
import { CoursesWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Layout, List } from "antd";
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
    <Layout>
      <Query query={COURSES_Q}>
        {({ loading, error, data }) => {
          return (
            <Content style={{ padding: "30px" }}>
              <Layout style={{ padding: "30px", background: "#FFFFFF" }}>
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
                      />
                    </List.Item>
                  )}
                />
              </Layout>
            </Content>
          );
        }}
      </Query>
    </Layout>
  );
};
