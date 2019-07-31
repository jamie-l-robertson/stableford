import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, Icon, Image } from "semantic-ui-react";

const PlayerGrid = ({ players }) => {
  return (
    <Grid columns={3}>
      {players &&
        players.map(player =>
          player.status === "PUBLISHED" ? (
            <Grid.Column>
              <Card key={player.id}>
                <Link to={`/players/${player.id}`}>
                  <Image src="/images/user-default.svg" wrappedi={false} />
                </Link>
                <Card.Content>
                  <Card.Header>{player.name}</Card.Header>
                </Card.Content>

                <Card.Content extra>
                  <Link to={`/players/${player.id}`}>
                    <Icon name="user" /> View Profile
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          ) : null
        )}
    </Grid>
  );
};

export default PlayerGrid;
