import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import RoundList from "../../rounds/roundList";
import { Layout, Card, Divider, Tag, Spin } from "antd";

const { Content, Sider } = Layout;
const { Meta } = Card;

const PLAYER_Q = gql`
  query playerInfo($playerID: ID!) {
    player(where: { id: $playerID }) {
      name
      id
      handicap
      bio
      mugshot {
        url
      }
      rounds {
        id
        courses {
          name
        }
        scorecard
        complete
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
              {error ? <p>{error}</p> : null}
              {loading ? <Spin /> : null}
              {player && (
                <Fragment>
                  <Sider
                    width={280}
                    style={{
                      background: "#FFFFFF",
                      borderRight: "1px solid #EEEEEE",
                      paddingRight: "30px"
                    }}
                  >
                    <Card
                      cover={
                        <img
                          alt={player.name}
                          src={
                            (player.mugshot && player.mugshot.url) ||
                            "/images/user-default.svg"
                          }
                        />
                      }
                    >
                      <Meta title={player.name} />
                      <Divider />
                      <Meta title="Bio" description={player.bio} />
                      <Divider />
                      <Meta title="Handicap" description={player.handicap} />
                      <Divider />
                      <Meta title="ID" description={[<Tag>{player.id}</Tag>]} />
                    </Card>
                  </Sider>
                  <Content style={{ padding: "0 30px", minHeight: 400 }}>
                    <h2>Rounds</h2>
                    {player.rounds && <RoundList rounds={player.rounds} />}
                  </Content>
                </Fragment>
              )}
            </Layout>
          </Content>
        );
      }}
    </Query>
  );
};
