import React from "react";
// Page Imports
import { Route } from "react-router-dom";

import Login from "../component/LoginForm";
import CreateAd from "../component/createAd";
import RegistrationForm from "../component/form";
import Welcome from "../component/Welcome";

class Router extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={RegistrationForm} />
        <Route exact path="/createAd" component={CreateAd} />
        <Route path="/" component={Welcome} />
      </div>
    );
  }
}
export default Router;
