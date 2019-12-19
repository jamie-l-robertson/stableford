import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Button } from "antd";

const { Header } = Layout;
const navItems = [
  {
    url: "/players",
    text: "Players",
    icon: "user"
  },
  {
    url: "/courses",
    text: "Courses",
    icon: "bank"
  },
  {
    url: "/rounds",
    text: "Rounds",
    icon: "database"
  },
  {
    url: "/competitions",
    text: "Competitions",
    icon: "trophy"
  }
];

const LogoStyle = {
  width: "90px",
  height: "31px",
  margin: "16px 28px 16px 0",
  float: "left"
};

class Navigation extends React.Component {
  render() {
    return (
      <Header>
        <Link to="/">
          <span className="logo" style={LogoStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260.66" style={{ width: '100%', height: 'auto' }}>
              <polygon points="319.52 12.01 263.06 260.66 399.95 56.02 319.52 12.01" fill="#9e005d" />
              <polygon points="297.9 0 0 117.72 400 56.46 297.9 0" fill="#544cc1" />
            </svg>
          </span>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px", float: "right" }}
        >
          {navItems.map((item, i) => (
            <Menu.Item key={i}>
              <Link to={item.url}>
                <Icon type={item.icon} />
                {item.text}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    );
  }
}

export default Navigation;
