import React, { Fragment } from "react";
import { Query } from "react-apollo";
import RoundList from "../../rounds/roundList";
import { Layout, Card, Divider, Tag, Spin } from "antd";
import { PLAYER_SINGLE_Q } from "../../../threads/queries";
import RoundPerformanceChart from "./roundPerformanceChart";

const { Content, Sider } = Layout;
const { Meta } = Card;

export const Player = props => {
  const playerID = props.match.params.id;
  return (
    <Query query={PLAYER_SINGLE_Q} variables={{ playerID }}>
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
                      <Meta
                        title="ID"
                        description={[
                          <Tag key={Math.random() * 1000}>{player.id}</Tag>
                        ]}
                      />
                    </Card>
                  </Sider>
                  <Content style={{ padding: "0 30px", minHeight: 400 }}>
                    <h2>Rounds</h2>
                    {player.rounds && <RoundList rounds={player.rounds} />}
                    <Divider />
                    <h2>Rounds Score Stats</h2>
                    <RoundPerformanceChart
                      rounds={player.rounds}
                      playerID={player.id}
                    />
                    <Divider />
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
