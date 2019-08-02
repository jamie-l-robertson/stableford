import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import RoundList from "./roundList";
import { PageHeader, Divider, Button, Icon } from "antd";

const ROUNDS_Q = gql`
  {
    rounds {
      id
      teeTime
      courses {
        id
        name
      }
      players {
        name
        handicap
      }
      complete
    }
  }
`;

class Rounds extends React.Component {
  render() {
    return (
      <Query query={ROUNDS_Q}>
        {({ loading, error, data }) => {
          return (
            <Fragment>
              <PageHeader title="Rounds" onBack={() => window.history.back()} />
              {error ? <li>{error}</li> : null}
              {loading ? <li>Loading...</li> : null}
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
