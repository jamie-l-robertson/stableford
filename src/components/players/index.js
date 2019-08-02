import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PlayerGrid from "./grid";
import PlayerList from "./list";
import { Layout } from "antd";

const PLAYERS_Q = gql`
  {
    players(where: { status: PUBLISHED }) {
      id
      name
      status
      bio
      mugshot {
        url
      }
    }
  }
`;

class Players extends React.Component {
  render() {
    return (
      <Query query={PLAYERS_Q}>
        {({ loading, error, data }) => {
          const { layout } = this.props;

          return (
            <Fragment>
              <h2>Players</h2>
              {error ? <div>{error}</div> : null}
              {loading ? <div>Loading...</div> : null}
              {data.players && layout === "list" ? (
                <PlayerList players={data.players} {...this.props} />
              ) : (
                <PlayerGrid players={data.players} {...this.props} />
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Players;
