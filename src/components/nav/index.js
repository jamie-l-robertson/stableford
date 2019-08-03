import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
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
  }
];

const LogoStyle = {
  width: "120px",
  height: "31px",
  background: "rgba(255, 255, 255, 0.2)",
  margin: "16px 28px 16px 0",
  float: "left"
};

// const Navigation = props => {
//   return (
//     <Header>
//       <Link to="/">
//         <div className="logo" style={LogoStyle} />
//       </Link>
//       <Menu
//         theme="dark"
//         mode="horizontal"
//         style={{ lineHeight: "64px", float: "right" }}
//       >
//         {navItems.map((item, i) => (
//           <Menu.Item key={i}>
//             <Link to={item.url}>
//               <Icon type={item.icon} />
//               {item.text}
//             </Link>
//           </Menu.Item>
//         ))}
//       </Menu>
//     </Header>
//   );
// };

class Navigation extends React.Component {
  render() {
    return (
      <Header>
        <Link to="/">
          <div className="logo" style={LogoStyle} />
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

export default withAuth(Navigation);
