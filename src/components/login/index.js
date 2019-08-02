import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { Card, Button, Spin } from "antd";

class LoginPage extends React.Component {
  state = {
    authenticated: null
  };

  async componentDidMount() {
    const authenticated = await this.props.auth.isAuthenticated();
    this.setState({ authenticated });
  }

  render() {
    return (
      <Fragment>
        {!this.state.authenticated === null && <Spin />}
        {this.state.authenticated === true && (
          <Card
            style={{
              maxWidth: "300px",
              margin: "auto",
              textAlign: "center"
            }}
            cover={<img alt="example" src="/images/user-default.svg" />}
            actions={[
              <Link as={Button} to="/dashboard">
                <Button type="primary"> Visit your dashboard</Button>
              </Link>
            ]}
          >
            <Card.Meta title="Welcome back" />
          </Card>
        )}
        {this.state.authenticated === false && (
          <Card
            style={{
              maxWidth: "300px",
              margin: "auto",
              textAlign: "center"
            }}
            cover={<img alt="example" src="/images/user-default.svg" />}
            actions={[
              <Button onClick={() => this.props.auth.login()} type="primary">
                Login
              </Button>
            ]}
          >
            <Card.Meta
              title="Hello there!"
              description="Please login with your Okta account to proceed"
            />
          </Card>
        )}
      </Fragment>
    );
  }
}

export default withAuth(LoginPage);
