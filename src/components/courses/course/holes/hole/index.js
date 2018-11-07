import React from "react";

export const Hole = props => {
  const { name, par, index, editable } = props;

  return editable ? (
    <td>
      <input type="number" placeholder={par} />
    </td>
  ) : (
    <li>
      <h4>
        {name} - Par: {par} - Index: {index}
      </h4>
    </li>
  );
};

Hole.defaultProps = {
  name: "",
  par: "",
  index: "",
  editable: false
};
