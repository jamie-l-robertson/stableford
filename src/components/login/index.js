import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { Card, Button, Typography } from "antd";

class LoginPage extends React.Component {
  state = {
    authenticated: false
  };

  async componentDidMount() {
    const authenticated = await this.props.auth.isAuthenticated();

    if (authenticated) {
      this.props.auth.getUser().then(result => {
        this.setState({ authenticated: true });
      });
    }
  }
  render() {
    return (
      <Fragment>
        {!this.state.authenticated ? (
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
        ) : (
          <Redirect to="/dashboard" />
        )}
      </Fragment>
    );
  }
}

export default withAuth(LoginPage);
