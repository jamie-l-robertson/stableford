import Styled from "styled-components";

export const PlayersWrapper = Styled.div`
    
    ${props =>
      props.show === false
        ? `
        display: none;
        visibility: hidden;
    `
        : `display: block;`};
`;
