import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import RoundList from "./roundList";
import { PageHeader, Divider, Button, Icon, Spin } from "antd";
import { ROUNDS_Q } from "../../threads/queries";

class Rounds extends React.Component {
  render() {
    return (
      <Query query={ROUNDS_Q}>
        {({ loading, error, data }) => {
          return (
            <Fragment>
              {error ? <div>{error}</div> : null}
              {loading ? <Spin /> : null}
              <PageHeader title="Rounds" onBack={() => window.history.back()} />
              {data.rounds && <RoundList rounds={data.rounds} />}
              <Divider />
              <Link to="/add-round">
                <Button type="primary">
                  Add round <Icon type="plus" />
                </Button>
              </Link>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Rounds;
