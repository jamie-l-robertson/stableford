import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { Layout } from "antd";
import Navigation from "./components/nav";
import Dashboard from "./components/dashboard";
import Courses from "./components/courses";
import { Course } from "./components/courses/course";
import Players from "./components/players";
import { Player } from "./components/players/player";
import Rounds from "./components/rounds";
import { Round } from "./components/rounds/round";
import addRound from "./components/rounds/addRound";
import { NotFound } from "./components/NotFound";
import LoginPage from "./components/login";
import Competitions from './components/competitions';
import addCompetition from './components/competitions/addCompetition';

const { Content, Footer } = Layout;

class App extends Component {
  // Add offline data persistance
  // Make it pretty

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation />
            <Layout>
              <Content style={{ padding: "30px" }}>
                <Layout style={{ padding: "30px", background: "#FFFFFF" }}>
                  <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <SecureRoute
                      exact
                      path={process.env.PUBLIC_URL + "/dashboard"}
                      component={Dashboard}
                    />
                    <SecureRoute exact path="/courses" component={Courses} />
                    <SecureRoute exact path="/courses/:id" component={Course} />
                    <SecureRoute exact path="/players" component={Players} />
                    <SecureRoute exact path="/players/:id" component={Player} />
                    <SecureRoute exact path="/rounds" component={Rounds} />
                    <SecureRoute exact path="/round/:id" component={Round} />
                    <SecureRoute exact path="/add-round" component={addRound} />
                    <SecureRoute exact path="/competitions" component={Competitions} />
                    <SecureRoute exact path="/add-competition" component={addCompetition} />
                    <Route
                      path="/implicit/callback"
                      component={ImplicitCallback}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </Layout>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Created by Jamie Robertson ©2019
              </Footer>
            </Layout>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
