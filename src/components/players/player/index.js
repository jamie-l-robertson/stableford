import React from "react";
import { PlayerWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PLAYER_Q = gql`
  query playerInfo($playerID: ID!) {
    player(where: { id: $playerID }) {
      name
      id
      handicap
    }
  }
`;

export const Player = props => {
  const playerID = props.match.params.id;
  return (
    <PlayerWrapper>
      <Query query={PLAYER_Q} variables={{ playerID }}>
        {({ loading, error, data }) => {
          return (
            <React.Fragment>
              <ul>
                {error ? <li>{error}</li> : null}
                {loading ? <li>Loading...</li> : null}
                {data.player && (
                  <article>
                    <h2>
                      {data.player.name} <small>#{playerID}</small>
                    </h2>
                    <h3>Handicap: {data.player.handicap}</h3>
                  </article>
                )}
              </ul>
            </React.Fragment>
          );
        }}
      </Query>
    </PlayerWrapper>
  );
};
