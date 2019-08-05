import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { List, Icon, Tag } from "antd";

const CompetitionList = ({ data, limit = 0 }) => {
  const competitionData = limit > 0 ? data.slice(0, limit) : data;

  return (
    <List
      dataSource={data}
      itemLayout="horizontal"
      renderItem={competition => {
        return (
          <List.Item
            key={competition.id}
            actions={[
              <Link to={`/competition/${competition.id}`}>
                <Icon type="edit" />
              </Link>
            ]}>
            <List.Item.Meta title={competition.name} />
            {competition.complete ? (
              <Tag color="green">Complete</Tag>
            ) : (
                <Tag color="orange">In progress</Tag>
              )}
          </List.Item>
        );
      }}
    />
  );
};

export default CompetitionList;
