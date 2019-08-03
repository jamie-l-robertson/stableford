import React, { Fragment } from "react";
import { Statistic, Row, Col } from "antd";

function getBestScores(arr) {
  const stableford = arr.map(item => item["stableford"]);
  const scratch = arr.map(item => item["scratch"]);

  return {
    scratch: Math.min(...scratch),
    stableford: Math.max(...stableford).toFixed(2)
  };
}

const BestScoreChart = props => {
  const { rounds, playerID } = props;
  let scorecards = [];

  for (var i = 0; i < rounds.length; i++) {
    rounds[i].scorecard.map(row => {
      if (row.id !== playerID) return false;

      scorecards.push({ scratch: row.total, stableford: row.stableford });
    });
  }

  const scores = getBestScores(scorecards);

  return (
    <Fragment>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Scratch" value={scores.scratch} />
        </Col>
        <Col span={12}>
          <Statistic title="Stableford" value={scores.stableford} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default BestScoreChart;
