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
      status
    }
  }
`;

class Players extends React.Component {
  render() {
    const { playersVisible } = this.props;

    return (
      <PlayersWrapper show={playersVisible}>
        <Query query={PLAYERS_Q}>
          {({ loading, error, data }) => {
            console.log(data);
            return (
              <React.Fragment>
                <ul>
                  {error ? <li>{error}</li> : null}
                  {loading ? <li>Loading...</li> : null}
                  {data.players &&
                    data.players.map(
                      player =>
                        player.status === "PUBLISHED" ? (
                          <li key={player.id}>
                            <Link to={`/players/${player.id}`}>
                              {player.name}
                            </Link>
                          </li>
                        ) : null
                    )}
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
