import React from "react";

import { Table } from "antd";

const columns = [
  {
    title: "Hole",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Par",
    dataIndex: "par",
    key: "par"
  },
  {
    title: "Stroke Index",
    dataIndex: "index",
    key: "strokeIndex"
  }
];

export const Holes = props => {
  return <Table columns={columns} dataSource={props.data.items} />;
};
