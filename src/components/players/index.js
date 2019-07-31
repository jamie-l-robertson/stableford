import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PlayerGrid from "./grid";
import PlayerList from "./list";

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
        <Query query={PLAYERS_Q}>
          {({ loading, error, data }) => {
            const { layout } = this.props;
            return (
              <Fragment>
                {error ? <div>{error}</div> : null}
                {loading ? <div>Loading...</div> : null}
                {data.players && layout === "grid" ? (
                  <PlayerGrid players={data.players} {...this.props} />
                ) : (
                  <PlayerList players={data.players} {...this.props} />
                )}
              </Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default Players;
