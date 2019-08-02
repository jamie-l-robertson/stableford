import React, { Fragment } from "react";
import { Holes } from "./holes";
import { Query } from "react-apollo";
import { COURSE_SINGLE_Q } from "../../../threads/queries";
import { Col, Row, PageHeader, Divider, Typography, Spin } from "antd";

const { Paragraph } = Typography;

const Description = ({ term, children, span = 4 }) => (
  <Col span={span}>
    <div className="description">
      <div className="term">
        <b>{term}</b>
      </div>
      <div className="detail">{children}</div>
    </div>
  </Col>
);

export const Course = props => {
  const courseID = props.match.params.id || props.courseID;

  return (
    <Fragment>
      {courseID && (
        <Query query={COURSE_SINGLE_Q} variables={{ courseID }}>
          {({ loading, error, data }) => {
            return (
              <React.Fragment>
                {error ? <p>{error}</p> : null}
                {loading ? <Spin /> : null}
                {data.course && (
                  <Fragment>
                    <PageHeader
                      onBack={() => window.history.back()}
                      title={data.course.name}
                    />
                    <Divider />
                    <Row>
                      <Description term="Course ID">{courseID}</Description>
                      <Description term="Location">
                        {data.course.location}
                      </Description>
                    </Row>

                    <Divider />
                    <Row>
                      <Paragraph>{data.course.description}</Paragraph>
                    </Row>

                    {data.course.holes && data.course.holes.items.length > 0 && (
                      <Fragment>
                        <Divider />
                        <Row>
                          <h3>Holes</h3>
                          <Holes
                            data={data.course.holes}
                            editable={props.editable}
                          />
                        </Row>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </React.Fragment>
            );
          }}
        </Query>
      )}
    </Fragment>
  );
};

Course.defaultProps = {
  match: {
    params: {
      id: ""
    }
  }
};
