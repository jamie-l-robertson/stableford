import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { Card, Button, Spin } from "antd";

class LoginPage extends React.Component {
  state = {
    authenticated: null
  };

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return (
      <Fragment>
        {!this.state.authenticated === null && <Spin />}
        {this.state.authenticated === true && <Redirect to="/dashboard" />}
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
