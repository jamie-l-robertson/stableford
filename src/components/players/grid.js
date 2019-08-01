import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Icon, Avatar } from "antd";

const { Meta } = Card;

const PlayerGrid = ({ players }) => {
  return (
    <Row gutter={30}>
      {players &&
        players.map(player =>
          player.status === "PUBLISHED" ? (
            <Col span={8}>
              <Card
                actions={[
                  <Link to={`/players/${player.id}`}>
                    <Icon type="profile" /> View Profile
                  </Link>
                ]}
                style={{ marginBottom: "30px" }}
              >
                <Meta
                  title={player.name}
                  description="Average Golfer"
                  avatar={<Avatar src="/images/user-default.svg" />}
                />
              </Card>
            </Col>
          ) : null
        )}
    </Row>
  );
};

export default PlayerGrid;
