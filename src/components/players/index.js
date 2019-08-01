import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PlayerGrid from "./grid";
import PlayerList from "./list";

import { Layout, List } from "antd";
const { Content } = Layout;

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
      <Layout>
        <Query query={PLAYERS_Q}>
          {({ loading, error, data }) => {
            const { layout } = this.props;
            return (
              <Content style={{ padding: "30px" }}>
                <Layout style={{ padding: "30px", background: "#FFFFFF" }}>
                  <h2>Players</h2>
                  {error ? <div>{error}</div> : null}
                  {loading ? <div>Loading...</div> : null}
                  {data.players && layout === "list" ? (
                    <PlayerList players={data.players} {...this.props} />
                  ) : (
                    <PlayerGrid players={data.players} {...this.props} />
                  )}
                </Layout>
              </Content>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default Players;
