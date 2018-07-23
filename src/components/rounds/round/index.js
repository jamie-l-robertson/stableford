import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ROUND_Q = gql`
  query roundInfo($roundID: ID!) {
    round(where: { id: $roundID }) {
      course {
        name
        id
        holes
      }
      players {
        id
        name
        handicap
        status
      }
    }
  }
`;

export const Round = props => {
  const roundID = props.match.params.id;

  return (
    <React.Fragment>
      <Query query={ROUND_Q} variables={{ roundID }}>
        {({ loading, error, data }) => {
          return (
            <React.Fragment>
              {error ? <div>{error}</div> : null}
              {loading ? <div>{loading}</div> : null}
              {data.round && (
                <div>
                  <h2>Round</h2>
                  <h3>Course name: {data.round.course.name}</h3>
                  <ul>
                    {data.round.course.holes.items &&
                      data.round.course.holes.items.map((hole, i) => (
                        <li key={i}>
                          {hole.name} - Par: {hole.par} - STAB: #{hole.index}
                        </li>
                      ))}
                  </ul>
                  <h3>Players</h3>
                  <ul>
                    {data.round.players &&
                      data.round.players.map(
                        player =>
                          player.status === 'PUBLISHED' ? (
                            <li key={player.id}>
                              <Link to={`/players/${player.id}`}>{player.name}</Link>
                            </li>
                          ) : null
                      )}
                  </ul>
                </div>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};
