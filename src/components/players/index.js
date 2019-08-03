import React, { Fragment } from "react";
import { Query } from "react-apollo";
import PlayerGrid from "./grid";
import PlayerList from "./list";
import { Row, PageHeader, Spin, Divider } from "antd";
import { PLAYERS_Q } from "../../threads/queries";

class Players extends React.Component {
  render() {
    return (
      <Query query={PLAYERS_Q}>
        {({ loading, error, data }) => {
          const { layout } = this.props;

          return (
            <Fragment>
              {!this.props.noHeader && (
                <Fragment>
                  <Row gutter={30}>
                    <PageHeader
                      onBack={() => window.history.back()}
                      title="Players"
                    />
                  </Row>
                  <Divider />
                </Fragment>
              )}
              <Row gutter={30}>
                {error ? <div>{error}</div> : null}
                {loading ? <Spin /> : null}
                {data.players && layout === "list" ? (
                  <PlayerList players={data.players} {...this.props} />
                ) : (
                  <PlayerGrid players={data.players} {...this.props} />
                )}
              </Row>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Players;
