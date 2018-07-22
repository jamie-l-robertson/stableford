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
      bio
    }
  }
`;

export const Player = props => {
  const playerID = props.match.params.id;
  return (
    <PlayerWrapper>
      <Query query={PLAYER_Q} variables={{ playerID }}>
        {({ loading, error, data }) => {
          const { player } = data;

          return (
            <React.Fragment>
              <ul>
                {error ? <li>{error}</li> : null}
                {loading ? <li>Loading...</li> : null}
                {player && (
                  <article>
                    <h2>
                      {player.name} <small>#{playerID}</small>
                    </h2>
                    <img
                      src="/images/user-default.svg"
                      width="50px"
                      height="50px"
                    />
                    <h3>Handicap: {player.handicap}</h3>
                    {player.bio && <div>{player.bio}</div>}
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
