import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Layout, List, Divider, Button, Icon } from "antd";

const { Content } = Layout;

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
    }
  }
`;

class Rounds extends React.Component {
  render() {
    return (
      <Layout>
        <Query query={ROUNDS_Q}>
          {({ loading, error, data }) => {
            return (
              <Content style={{ padding: "30px" }}>
                <Layout style={{ padding: "30px", background: "#FFFFFF" }}>
                  <h2>Completed Rounds</h2>
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
                              <Link to={`/round/${round.id}`}>Scorecard</Link>
                            ]}
                          >
                            <List.Item.Meta
                              title={round.courses[0].name}
                              description={formattedDate.toString()}
                            />
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
                </Layout>
              </Content>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default Rounds;
