import React from 'react'
import { Card, Divider } from "antd";

const ProfileCard = (props) => {
  const { name, mugshot, bio, handicap } = props;

  return (
    <Card
      cover={
        <img
          alt={name}
          src={
            (mugshot && mugshot.url) ||
            "/images/user-default.svg"
          }
        />
      }
    >
      <Card.Meta title={name} />
      <Divider />
      <Card.Meta title="Bio" description={bio} />
      <Divider />
      <Card.Meta title="Handicap" description={handicap} />
    </Card >
  )
}

export default ProfileCard;