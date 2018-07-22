import React from "react";
import { Hole } from "./hole";
import { HolesWrapper } from "./styles";

export const Holes = props => {
  return (
    <HolesWrapper>
      <ul>
        {props.data.items.map((hole, i) => (
          <Hole
            key={`hole-${i}`}
            name={hole.name}
            par={hole.par}
            index={hole.index}
          />
        ))}
      </ul>
    </HolesWrapper>
  );
};
