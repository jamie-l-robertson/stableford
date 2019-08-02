import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { List, Avatar, Divider, Typography } from "antd";
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
              Currently still in Alpha, we welcome{" "}
              <a href="mailto: jrobertson_uk@msn.com">feedback</a>
            </Paragraph>
            <Divider />
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
