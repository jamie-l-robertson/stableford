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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

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
