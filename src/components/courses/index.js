import React from "react";
import { Link } from "react-router-dom";
import { CoursesWrapper } from "./styles";

const courseData = [
  {
    id: "1",
    name: "Kingsknowe Golf Club",
    location: "Edinburgh"
  },
  {
    id: "2",
    name: "Muirfield",
    location: "Gullane"
  }
];

export const Courses = props => {
  return (
    <CoursesWrapper>
      <ul>
        {courseData.map(course => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              {course.name}, {course.location}
            </Link>
          </li>
        ))}
      </ul>
    </CoursesWrapper>
  );
};
