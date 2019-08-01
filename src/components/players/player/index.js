import React from "react";
import { PlayerWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Layout, Card, Icon, Divider, Tag } from "antd";

const { Content, Sider } = Layout;
const { Meta } = Card;

const PLAYER_Q = gql`
  query playerInfo($playerID: ID!) {
    player(where: { id: $playerID }) {
      name
      id
      handicap
      bio
      rounds {
        id
        scorecard
      }
    }
  }
`;

export const Player = props => {
  const playerID = props.match.params.id;
  return (
    <Query query={PLAYER_Q} variables={{ playerID }}>
      {({ loading, error, data }) => {
        const { player } = data;

        return (
          <Content>
            <Layout style={{ background: "#FFFFFF" }}>
              <Sider
                width={280}
                style={{
                  background: "#FFFFFF",
                  borderRight: "1px solid #EEEEEE",
                  paddingRight: "30px"
                }}
              >
                {error ? <li>{error}</li> : null}
                {loading ? <li>Loading...</li> : null}
                {player && (
                  <Card
                    cover={<img alt="example" src="/images/user-default.svg" />}
                  >
                    <Meta title={player.name} />
                    <Divider />
                    <Meta title="Bio" description={player.bio} />
                    <Divider />
                    <Meta title="Handicap" description={player.handicap} />
                    <Divider />
                    <Meta title="ID" description={[<Tag>{player.id}</Tag>]} />
                  </Card>
                )}
              </Sider>
              <Content style={{ padding: "0 30px", minHeight: 400 }}>
                round data
              </Content>
            </Layout>
          </Content>
        );
      }}
    </Query>
  );
};
