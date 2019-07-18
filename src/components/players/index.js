import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { PlayersWrapper } from "./styles";
import { Grid, Container, Card, Icon, Image } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PLAYERS_Q = gql`
  {
    players {
      id
      name
      status
      bio
    }
  }
`;

class Players extends React.Component {
  render() {
    return (
      <Container>
        <Grid columns={3}>
          <Query query={PLAYERS_Q}>
            {({ loading, error, data }) => {
              console.log(data);
              return (
                <Fragment>
                  {error ? <li>{error}</li> : null}
                  {loading ? <li>Loading...</li> : null}
                  {data.players &&
                    data.players.map(
                      player =>
                        player.status === "PUBLISHED" ? (
                          <Grid.Column>
                            <Card key={player.id}>
                              <Link to={`/players/${player.id}`}>
                                <Image src="/images/user-default.svg" wrappedi={false} />
                              </Link>
                              <Card.Content>
                                <Card.Header>{player.name}</Card.Header>
                              </Card.Content>

                              <Card.Content extra>
                                <Link to={`/players/${player.id}`}>
                                  <Icon name='user' /> View Profile
                              </Link>
                              </Card.Content>

                            </Card>
                          </Grid.Column>
                        ) : null
                    )}
                </Fragment>
              );
            }}
          </Query>
        </Grid>
      </Container>
    );
  }
}

export default Players;
