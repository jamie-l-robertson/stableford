import React, { Fragment } from 'react';
import { Row, Col, Card, Divider } from "antd";
import RoundPerformanceChart from "./roundPerformanceChart";
import AverageScoreChart from "./averageScoreChart";
import BestScoreChart from "./bestScoreChart";
import RoundList from "../../rounds/roundList";

const ProfileDashboard = props => {
  const { rounds, id } = props;

  return (
    rounds && (
      <Fragment>
        <Card title="Recent Rounds">
          <RoundList rounds={rounds} limit={5} />
        </Card>
        < Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Round Scores">
              <RoundPerformanceChart
                rounds={rounds}
                playerID={id}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Average Score">
              <AverageScoreChart
                rounds={rounds}
                playerID={id}
              />
            </Card>
            <Divider />
            <Card title="Best Score">
              <BestScoreChart
                rounds={rounds}
                playerID={id}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  )
};

export default ProfileDashboard;