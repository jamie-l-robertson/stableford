import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Row, Col, Card, PageHeader, Icon, Divider } from "antd";

import { COURSES_LIST_Q } from "../../threads/queries";

const Courses = props => {
  return (
    <Query query={COURSES_LIST_Q}>
      {({ data }) => {
        const { courses } = data;

        return (
          <Fragment>
            <Row gutter={30}>
              <PageHeader
                onBack={() => window.history.back()}
                title="Courses"
              />
            </Row>

            <Divider />
            <Row gutter={30}>
              {courses &&
                courses.map(course => (
                  <Col span={8} key={Math.random() * 1000}>
                    <Card
                      actions={[
                        <Link to={`/courses/${course.id}`}>
                          <Icon type="bank" /> View Course details
                        </Link>
                      ]}
                      style={{ marginBottom: "30px" }}
                    >
                      <Card.Meta
                        title={course.name}
                        description={course.location}
                        avatar={<Icon type="global" />}
                      />
                    </Card>
                  </Col>
                ))}
            </Row>
          </Fragment>
        );
      }}
    </Query>
  );
};

export default Courses;
