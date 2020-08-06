import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.less";
import Login from "./containers/login";
import Admin from "./containers/admin";
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}
