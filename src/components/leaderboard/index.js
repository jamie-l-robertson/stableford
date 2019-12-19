import React, { Component } from 'react';
import getUnique from '../../helpers/getUnique';
import { Row, Table, PageHeader } from 'antd';

function generateLeaderboardColumns(data) {
  let columns = [];
  const roundCount = data.rounds.length;

  // Initial columns
  columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Position',
      className: 'position',
      dataIndex: 'position',
      align: 'center'
    },
  ];

  for (var i = 0; i < roundCount; i++) {
    columns.push({
      title: `Round #${i + 1}`,
      dataIndex: `roundTotal[${i}]`,
      align: 'center'
    })
  }

  //Total stableford score
  columns.push({
    title: 'Total Stableford',
    dataIndex: 'overallTotal',
    align: 'center'
  });

  return columns;
}

function getRoundScores(scoreboard) {
  const players = getUnique(scoreboard, 'id').map(item => item.id);
  let scores = [];
  let scoreBreakdown;

  for (var i = 0; i < players.length; i++) {
    let player = {
      roundTotal: [],
      overallTotal: 0
    };

    const playerRound = scoreboard.filter(item => {
      return item.id === players[i];
    });

    playerRound.map((item, i) => {
      player.id = item.id;
      player.name = item.name;
      player.roundTotal.push(item.stableford);
      player.overallTotal = player.overallTotal + item.stableford;
    });

    scores.push(player);

  }

  scoreBreakdown = getUnique(scores, 'id').sort((a, b) => {
    let comparison = 0;

    if (a.overallTotal < b.overallTotal) {
      comparison = 1;
    } else if (a.overallTotal > b.overallTotal) {
      comparison = -1;
    }
    return comparison;
  });


  //Append position
  for (var p = 0; p < scoreBreakdown.length; p++) {
    scoreBreakdown[p].position = p + 1;
  }

  return scoreBreakdown;
}

function calculateLeaderboardStandings(data) {
  const rounds = data.rounds;
  let players = [];
  let scores = [];
  let Totals;

  for (var i = 0; i < rounds.length; i++) {
    rounds[i].scorecard.map(score => {
      players.push({
        id: score.id,
        name: score.name,
        total: score.total,
        stableford: score.stableford
      });
    });
  }

  Totals = getRoundScores(players);

  return Totals;
}

const LeaderBoard = props => {
  const { data } = props;
  const columns = generateLeaderboardColumns(data);

  return (
    <>
      <Row gutter={40}>
        <PageHeader title="Competition Leaderboard" />
      </Row>
      <Table
        columns={columns}
        dataSource={calculateLeaderboardStandings(data)}
        bordered
        pagination={false}
      />
    </>
  )
}

export default LeaderBoard;