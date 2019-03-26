import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from "./helpers";
import { HomePage, SignIn, RegisterPage } from "./views";
import { PrivateRoute } from "./components";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/home" component={HomePage} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={RegisterPage} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    );
  }
}

export default App;
