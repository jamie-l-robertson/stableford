import React from "react";
import { Hole } from "./hole";
import { HolesWrapper } from "./styles";

export const Holes = props => {
  return props.editable ? (
    <HolesWrapper>
      <table>
        <thead>
          {props.data.items.map(hole => (
            <th>{hole.name}</th>
          ))}
        </thead>
        <tbody>
          <tr>
            {props.data.items.map((hole, i) => (
              <Hole
                key={`hole-${i}`}
                name={hole.name}
                par={hole.par}
                index={hole.index}
                editable={props.editable}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </HolesWrapper>
  ) : (
    <HolesWrapper>
      <ul>
        {props.data.items.map((hole, i) => (
          <Hole
            key={`hole-${i}`}
            name={hole.name}
            par={hole.par}
            index={hole.index}
            editable={props.editable}
          />
        ))}
      </ul>
    </HolesWrapper>
  );
};
