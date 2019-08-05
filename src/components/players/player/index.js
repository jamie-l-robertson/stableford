import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { Row, Divider, PageHeader, Spin } from "antd";
import { TwoColumn } from '../../../layout';
import { PLAYER_SINGLE_Q } from "../../../threads/queries";
import ProfileCard from './profileCard';
import ProfileDashboard from './profileDashboard';


export const Player = props => {
  const playerID = props.match.params.id;

  return (
    <Query query={PLAYER_SINGLE_Q} variables={{ playerID }}>
      {({ loading, error, data }) => {
        const { player } = data;

        return (
          <Fragment>
            {player && (
              <Fragment>
                <Row gutter={30}>
                  <PageHeader
                    onBack={() => window.history.back()}
                    title={player.name}
                  />
                </Row>
                <Divider />
              </Fragment>
            )}
            {error ? <p>{error}</p> : null}
            {loading ? <Spin /> : null}
            {player && (
              <TwoColumn side={<ProfileCard {...player} />} content={<ProfileDashboard {...player} />} />
            )}
          </Fragment>
        );
      }}
    </Query>
  );
};
