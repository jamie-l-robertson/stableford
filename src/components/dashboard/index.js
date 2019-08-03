import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { Query } from "react-apollo";

import {
  Row,
  List,
  Divider,
  Typography,
  Button,
  PageHeader,
  Tag,
  Card
} from "antd";

const data = [
  {
    title: "Recent rounds",
    description: "View all in-progress and completed rounds",
    link: {
      url: "/rounds",
      text: "View"
    }
  },
  {
    title: "Latest courses",
    description: "View all available courses",
    link: {
      url: "/courses",
      text: "View"
    }
  },
  {
    title: "Latest Players",
    description: "View all registered players and their statistics",
    link: {
      url: "/players",
      text: "View"
    }
  }
];

const Dashboard = props => {
  return (
    <Fragment>
      <Row gutter={30}>
        <PageHeader
          title="Welcome to Stableford"
          tags={<Tag color="orange">Alpha</Tag>}
          extra={[
            <Button onClick={() => props.auth.logout()} type="danger">
              Logout
            </Button>
          ]}
        />
      </Row>
      <Divider />
      <List
        grid={{ gutter: 30, column: 3 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.title}
              actions={[
                <Link to={item.link.url}>
                  <Button type="primary">{item.link.text}</Button>
                </Link>
              ]}
            >
              {item.description}
            </Card>
          </List.Item>
        )}
      />
      <Divider />
      Site stats coming soon...
    </Fragment>
  );
};

export default withAuth(Dashboard);
