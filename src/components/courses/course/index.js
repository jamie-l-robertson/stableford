import React from "react";
import { Holes } from "./holes";
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
      holes
    }
  }
`;

export const Course = props => {
  const courseID = props.match.params.id || props.courseID;

  console.log(props);

  return (
    <CourseWrapper>
      {courseID && (
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

                    {data.course.holes &&
                      data.course.holes.items.length > 0 && (
                        <React.Fragment>
                          <h3>Holes</h3>
                          <Holes
                            data={data.course.holes}
                            editable={props.editable}
                          />
                        </React.Fragment>
                      )}
                  </article>
                )}
              </React.Fragment>
            );
          }}
        </Query>
      )}
    </CourseWrapper>
  );
};

Course.defaultProps = {
  match: {
    params: {
      id: ""
    }
  }
};
