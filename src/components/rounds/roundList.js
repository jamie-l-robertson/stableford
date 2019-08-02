import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { List, Icon, Tag } from "antd";

const RoundList = ({ rounds }) => {
  return (
    <List
      dataSource={rounds}
      itemLayout="horizontal"
      renderItem={round => {
        const date = dayjs(round.teeTime).toISOString();

        return (
          <List.Item
            key={round.id}
            actions={[
              <Link to={`/round/${round.id}`}>
                {round.complete ? (
                  <Icon type="file-text" />
                ) : (
                  <Icon type="edit" />
                )}
              </Link>
            ]}
          >
            <List.Item.Meta
              title={round.courses[0].name}
              description={dayjs(date).format("DD/MM/YYYY, hh:mm")}
            />
            {round.complete ? (
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

export default RoundList;
