import React, { Fragment } from "react";
import { Query } from "react-apollo";
import RoundList from "../../rounds/roundList";
import { Row, Col, Layout, Card, Divider, PageHeader, Spin } from "antd";
import { PLAYER_SINGLE_Q } from "../../../threads/queries";
import RoundPerformanceChart from "./roundPerformanceChart";
import AverageScoreChart from "./averageScoreChart";
import BestScoreChart from "./bestScoreChart";

const { Content, Sider } = Layout;
const { Meta } = Card;

export const Player = props => {
  const playerID = props.match.params.id;
  return (
    <Query query={PLAYER_SINGLE_Q} variables={{ playerID }}>
      {({ loading, error, data }) => {
        const { player } = data;

        return (
          <Fragment>
            {player && (
              <Fragment>
                <Row gutter={30}>
                  <PageHeader
                    onBack={() => window.history.back()}
                    title={player.name}
                  />
                </Row>
                <Divider />
              </Fragment>
            )}
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
                      </Card>
                    </Sider>
                    <Content style={{ padding: "0 0 0 30px", minHeight: 400 }}>
                      {player.rounds && (
                        <Card title="Recent Rounds">
                          <RoundList rounds={player.rounds} limit={5} />
                        </Card>
                      )}
                      <Divider />
                      <Row gutter={16}>
                        <Col span={12}>
                          <Card title="Round Scores">
                            <RoundPerformanceChart
                              rounds={player.rounds}
                              playerID={player.id}
                            />
                          </Card>
                        </Col>
                        <Col span={12}>
                          <Card title="Average Score">
                            <AverageScoreChart
                              rounds={player.rounds}
                              playerID={player.id}
                            />
                          </Card>
                          <Divider />
                          <Card title="Best Score">
                            <BestScoreChart
                              rounds={player.rounds}
                              playerID={player.id}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </Content>
                  </Fragment>
                )}
              </Layout>
            </Content>
          </Fragment>
        );
      }}
    </Query>
  );
};
