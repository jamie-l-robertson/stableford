import React from "react";

export const Hole = props => {
  const { name, par, index } = props;
  return (
    <li>
      <h4>
        {name} - Par: {par} - Index: {index}
      </h4>
    </li>
  );
};
