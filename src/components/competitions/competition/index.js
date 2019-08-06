import React, { Fragment } from 'react';
import { Round } from '../../rounds/round';

class Competition extends React.Component {
  state = {
    leaderboard: []
  };

  // TODO
  // Hookup competition data
  // Comp header
  // Comp leaderboard

  render() {
    return (
      <Fragment>
        <h2>Competition header</h2>
        <Round roundID="cjk074b20wyvt0953djxocvjp" hideHeader />
        <h3>Leaderboard</h3>
      </Fragment>
    )
  }
}

export default Competition;