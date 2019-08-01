import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { PageHeader, List, Divider, Button, Icon, Tag } from "antd";

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
              {data.rounds && (
                <List
                  dataSource={data.rounds}
                  itemLayout="horizontal"
                  renderItem={round => {
                    const formattedDate = new Date(round.teeTime);

                    return (
                      <List.Item
                        key={round.id}
                        actions={[
                          <Link to={`/round/${round.id}`}>
                            {round.complete ? (
                              <Icon type="file-text" />
                            ) : (
                              <Icon type="edit" />
                            )}
                          </Link>
                        ]}
                      >
                        <List.Item.Meta
                          title={round.courses[0].name}
                          description={formattedDate.toString()}
                        />
                        {round.complete ? (
                          <Tag color="green">Complete</Tag>
                        ) : (
                          <Tag color="orange">In progress</Tag>
                        )}
                      </List.Item>
                    );
                  }}
                />
              )}
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
