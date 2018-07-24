import React from "react";
import { Link } from "react-router-dom";
import { RoundsWrapper } from "./styles";
import { PlayersWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ROUNDS_Q = gql`
  {
    rounds {
      id
      courses {
        id
        name
      }
      players {
        name
        handicap
      }
    }
  }
`;

class Rounds extends React.Component {
  render() {
    return (
      <RoundsWrapper>
        <Query query={ROUNDS_Q}>
          {({ loading, error, data }) => {
            return (
              <React.Fragment>
                <ul>
                  {error ? <li>{error}</li> : null}
                  {loading ? <li>Loading...</li> : null}
                  {data.rounds &&
                    data.rounds.map(round => (
                      <li key={round.id}>
                        <Link to={`/round/${round.id}`}>
                          {round.courses[0].name}
                        </Link>
                      </li>
                    ))}
                </ul>
                <Link to="/add-round">Add round +</Link>
              </React.Fragment>
            );
          }}
        </Query>
      </RoundsWrapper>
    );
  }
}

export default Rounds;
