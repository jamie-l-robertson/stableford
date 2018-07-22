import React from "react";
import { CourseWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const COURSE_Q = gql`
  query courseInfo($courseID: ID!) {
    course(where: { id: $courseID }) {
      name
      id
      location
      description
    }
  }
`;

export const Course = props => {
  const courseID = props.match.params.id;
  return (
    <CourseWrapper>
      <Query query={COURSE_Q} variables={{ courseID }}>
        {({ loading, error, data }) => {
          return (
            <React.Fragment>
              {error ? <p>{error}</p> : null}
              {loading ? <p>Loading...</p> : null}
              {data.course && (
                <article>
                  <h2>
                    {data.course.name} <small>#{courseID}</small>
                  </h2>
                  <h3>Location: {data.course.location}</h3>
                  <div>Handicap: {data.course.description}</div>
                </article>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    </CourseWrapper>
  );
};
