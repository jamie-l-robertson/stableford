import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Navigation from "./components/nav";
import { Courses } from "./components/courses";
import { Course } from "./components/courses/course";
import Players from "./components/players";
import { Player } from "./components/players/player";
import Rounds from "./components/rounds";
import { Round } from "./components/rounds/round";
import addRound from "./components/rounds/addRound";
import { NotFound } from "./components/NotFound";

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
                    <Route
                      exact
                      path={process.env.PUBLIC_URL + "/"}
                      component={Courses}
                    />
                    <Route exact path="/courses/:id" component={Course} />
                    <Route exact path="/players" component={Players} />
                    <Route exact path="/players/:id" component={Player} />
                    <Route exact path="/rounds" component={Rounds} />
                    <Route exact path="/round/:id" component={Round} />
                    <Route exact path="/add-round" component={addRound} />
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
