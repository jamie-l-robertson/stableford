import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Courses } from './components/courses';
import { Course } from './components/courses/course';
import Players from './components/players';
import { Player } from './components/players/player';
import Rounds from './components/rounds';
import { Round } from './components/rounds/round';
import { NotFound } from './components/NotFound';

class App extends Component {
  // Add offline data persistance
  // Make it pretty

  state = {};

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/'} component={Courses} />
            <Route exact path="/courses/:id" component={Course} />
            <Route exact path="/players" component={Players} />
            <Route exact path="/players/:id" component={Player} />
            <Route exact path="/rounds" component={Rounds} />
            <Route exact path="/round/:id" component={Round} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
