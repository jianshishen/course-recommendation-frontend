import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { history } from "./helpers";
import { HomePage, SignIn, RegisterPage } from "./views";
import { PrivateRoute } from "./components";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={RegisterPage} />
        </div>
      </Router>
    );
  }
}

export default App;
