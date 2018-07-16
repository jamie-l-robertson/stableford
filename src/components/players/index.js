import React from "react";
import { Link } from "react-router-dom";
import { PlayersWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PLAYERS_Q = gql`
  {
    players {
      id
      name
    }
  }
`;

class Players extends React.Component {
  render() {
    return (
      <PlayersWrapper>
        <Query query={PLAYERS_Q}>
          {({ loading, error, data }) => {
            return (
              <React.Fragment>
                <ul>
                  {error ? <li>{error}</li> : null}
                  {loading ? <li>Loading...</li> : null}
                  {data.players &&
                    data.players.map(player => (
                      <li key={player.id}>
                        <Link to={`/players/${player.id}`}>{player.name}</Link>
                      </li>
                    ))}
                </ul>
              </React.Fragment>
            );
          }}
        </Query>
      </PlayersWrapper>
    );
  }
}

export default Players;
