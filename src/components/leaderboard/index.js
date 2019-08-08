import React from 'react';
import { Table } from 'antd';

const data = [
  {
    key: 1,
    name: 'Jamie Robertson',
    position: 1,
    score: 30
  }
];


class LeaderBoard extends React.Component {

  state = {
    leaderboard: [
      {
        key: 1,
        name: 'Jamie Robertson',
        position: 1,
        score: 30
      }
    ]
  };

  generateLeaderboardColumns(data) {
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
        align: 'center'
      })
    }

    //Total stableford score
    columns.push({
      title: 'Total Stableford',
      dataIndex: 'stablefordScore',
      align: 'center'
    });

    return columns;


  }

  calculateLeaderboardStandings(data) {
    console.log(data)
  }


  render() {
    const { data } = this.props;
    const columns = this.generateLeaderboardColumns(data);

    return (
      <Table
        columns={columns}
        dataSource={this.calculateLeaderboardStandings(data)}
        bordered
        title={() => 'Competition Leaderboard'}
        pagination={false}
      />
    )
  }
};

export default LeaderBoard;