import React, { Fragment } from "react";
import { Statistic, Row, Col } from "antd";

function getAverageScore(arr, key) {
  const data = arr.map(item => item[key]);
  return (data.reduce((p, c) => p + c, 0) / data.length).toFixed(1);
}

const AverageScoreChart = props => {
  const { rounds, playerID } = props;
  let scorecards = [];

  for (var i = 0; i < rounds.length; i++) {
    rounds[i].scorecard.map(row => {
      if (row.id !== playerID) return false;

      scorecards.push({ scratch: row.total, stableford: row.stableford });
    });
  }

  const scratchScores = getAverageScore(scorecards, "scratch");
  const stableFordScores = getAverageScore(scorecards, "stableford");

  return (
    <Fragment>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Scratch" value={scratchScores} />
        </Col>
        <Col span={12}>
          <Statistic title="Stableford" value={stableFordScores} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default AverageScoreChart;
