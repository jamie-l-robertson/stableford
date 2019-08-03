import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Icon, Avatar } from "antd";

const { Meta } = Card;

const PlayerGrid = ({ players }) => {
  return (
    <Fragment>
      {players &&
        players.map(player =>
          player.status === "PUBLISHED" ? (
            <Col span={8} key={Math.random() * 1000}>
              <Card
                actions={[
                  <Link to={`/players/${player.id}`}>
                    <Icon type="profile" /> View Player Profile
                  </Link>
                ]}
                style={{ marginBottom: "30px" }}
              >
                <Meta
                  title={player.name}
                  description={player.bio}
                  avatar={
                    <Avatar
                      src={
                        (player.mugshot && player.mugshot.url) ||
                        "/images/user-default.svg"
                      }
                    />
                  }
                />
              </Card>
            </Col>
          ) : null
        )}
    </Fragment>
  );
};

export default PlayerGrid;
