import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import CompetitionHeader from '../competitionHeader';
import Leaderboard from '../../leaderboard';
import { Round } from '../../rounds/round';
import { Divider, Spin } from "antd";
import { COMPETITION_SINGLE_Q } from '../../../threads/queries';


class Competition extends React.Component {

  render() {
    const competitionID = this.props.competitionID || this.props.match.params.id;

    return (
      <Fragment>
        <Query
          query={COMPETITION_SINGLE_Q}
          variables={{ competitionID }}
          onCompleted={data => this.setState({ data })}
          fetchPolicy="cache-and-network"
          errorPolicy="ignore"
        >
          {({ loading, error, data }) => {
            const { competition } = data;

            return (
              <Fragment>
                {error ? <div>{error}</div> : null}
                {loading ? <Spin /> : null}
                {data.competition &&
                  <CompetitionHeader details={competition} {...this.props} />}

                {data.competition && data.competition.rounds.map((round, i) => {
                  return (
                    <Fragment>
                      <Round
                        roundID={round.id}
                        competitionID={competition.id}
                        roundLabel={`Round #${i + 1}`}
                        handleCompRoundSubmit={this.handleSubmit}
                        competitionRoundData={data.competition.roundData[i] || null}
                        hideHeader />
                      <Divider />
                    </Fragment>
                  )
                })}
                {data.competition && <Leaderboard data={data.competition} />}
              </Fragment>
            )
          }}
        </Query>

        {/* <h3>Leaderboard</h3> */}
      </Fragment>
    )
  }
}

export default Competition;