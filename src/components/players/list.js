import React from "react";
import { List, Avatar, Checkbox } from "antd";

const PlayerList = ({ players, selectable = false, ...props }) => {
  return (
    <List
      dataSource={players}
      itemLayout="horizontal"
      renderItem={player =>
        player.status === "PUBLISHED" ? (
          <List.Item
            key={player.id}
            actions={selectable && [<Checkbox>Playing</Checkbox>]}
          >
            <List.Item.Meta
              avatar={<Avatar src="images/user-default.svg" />}
              description={player.name}
            />
          </List.Item>
        ) : null
      }
    />
  );
};

export default PlayerList;
