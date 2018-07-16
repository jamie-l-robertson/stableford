import React from "react";
import { CourseWrapper } from "./styles";

const courseData = {
  name: "Kingsknowe golf club",
  location: "Edinburgh",
  description: "A description of the the course...",
  holes: [
    {
      id: 1,
      par: 4,
      index: 1
    },
    {
      id: 2,
      par: 3,
      index: 0
    }
  ]
};

export const Course = props => {
  return (
    <CourseWrapper>
      <h2>{courseData.name}</h2>
      <h3>Location: {courseData.location}</h3>
      <div>{courseData.description}</div>
      <h4>Holes</h4>
      <ul>
        {courseData.holes.map((hole, i) => (
          <li key={hole.id}>
            Hole {i + 1} - Par: {hole.par}
          </li>
        ))}
      </ul>
    </CourseWrapper>
  );
};
