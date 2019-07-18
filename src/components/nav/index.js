import React from "react";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';

const navItems = [
  {
    url: '/',
    text: 'Home'
  },
  {
    url: '/players',
    text: 'Players'
  },
  {
    url: '/rounds',
    text: 'Rounds'
  }
]

const Navigation = () => (
  <Menu>
    {navItems.map(item =>
      <Menu.Item>
        <Link to={item.url}>{item.text}</Link>
      </Menu.Item>
    )}
  </Menu>
);

export default Navigation;