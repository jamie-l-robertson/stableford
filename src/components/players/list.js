import React from "react";
import { List, Image, Form, Checkbox } from "semantic-ui-react";

const PlayerList = ({ players, selectable = false, ...props }) => {
  return (
    <List divided verticalAlign="middle">
      {players &&
        players.map(player =>
          player.status === "PUBLISHED" ? (
            <List.Item key={player.id}>
              <List.Content floated="right">
                {selectable && (
                  <Form.Field>
                    <Checkbox label="Participant" />
                  </Form.Field>
                )}
              </List.Content>
              <Image src="/images/user-default.svg" avatar />
              <List.Content>{player.name}</List.Content>
            </List.Item>
          ) : null
        )}
    </List>
  );
};

export default PlayerList;
