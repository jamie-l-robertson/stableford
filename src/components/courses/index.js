import React from "react";
import { Link } from "react-router-dom";
import { CoursesWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
    <CoursesWrapper>
      <Query query={COURSES_Q}>
        {({ loading, error, data }) => {
          return (
            <React.Fragment>
              <ul>
                {error ? <li>{error}</li> : null}
                {loading ? <li>Loading...</li> : null}

                {data.courses &&
                  data.courses.map(course => (
                    <li key={course.id}>
                      <Link to={`/courses/${course.id}`}>
                        {course.name}, {course.location}
                      </Link>
                    </li>
                  ))}
              </ul>
            </React.Fragment>
          );
        }}
      </Query>
    </CoursesWrapper>
  );
};
