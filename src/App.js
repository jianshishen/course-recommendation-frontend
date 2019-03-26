import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { history } from "./helpers";
import { HomePage, SignIn, RegisterPage } from "./views";
import { PrivateRoute } from "./components";

class App extends Component {
  render() {
    return (
      <BrowserRouter
        history={history}
        basename="/course-recommendation-frontend"
      >
        <div>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={RegisterPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
