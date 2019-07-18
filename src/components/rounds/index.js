import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { Item, Container } from 'semantic-ui-react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ROUNDS_Q = gql`
  {
    rounds {
      id
      teeTime
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
      <Container>
        <Query query={ROUNDS_Q}>
          {({ loading, error, data }) => {
            return (
              <Item.Group divided>
                {error ? <li>{error}</li> : null}
                {loading ? <li>Loading...</li> : null}
                {data.rounds &&
                  data.rounds.map(round => {
                    const formattedDate = new Date(round.teeTime);
                    return (
                      <Item key={round.id}>

                        <Item.Content>
                          <Item.Header>{round.courses[0].name}</Item.Header>
                          <Item.Meta>{formattedDate.toString()}</Item.Meta>
                          <Item.Description>
                            <Link to={`/round/${round.id}`}>
                              View
                            </Link>
                          </Item.Description>
                        </Item.Content>


                      </Item>
                    )
                  })}
                <Link to="/add-round">Add round +</Link>
              </Item.Group>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default Rounds;
