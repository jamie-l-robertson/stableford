import React, { PureComponent } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default class RoundPerformanceChart extends PureComponent {
  render() {
    const { rounds, playerID } = this.props;
    let scorecards = [];

    for (var i = 0; i < rounds.length; i++) {
      rounds[i].scorecard.map(row => {
        if (row.id !== playerID) return false;

        scorecards.push({ scratch: row.total, stableford: row.stableford });
      });
    }

    return (
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={scorecards}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="scratch" />
          <YAxis width={20} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="scratch"
            stroke="#1890ff"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="stableford"
            stroke="#ff1898"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
