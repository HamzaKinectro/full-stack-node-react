import React from "react";
// Page Imports
import { Route } from "react-router-dom";

import Login from "../component/LoginForm";
import CreateAd from "../component/createAd";
//import RegistrationForm from "../component/form";
import Welcome from "../component/Welcome";
import Navbar from "../component/Navigation";
import Register from "../component/Registration";
class Router extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/registration" component={RegistrationForm} /> */}
        <Route exact path="/createAd" component={CreateAd} />
        <Route exact path="/registration" component={Register} />
        <Route exact path="/" component={Welcome} />
      </div>
    );
  }
}
export default Router;
