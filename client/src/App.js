import React, { Component } from "react";

import "./App.css";

import FormRegister from "./component/form";
import LoginForm from "./component/LoginForm";
import CreateAd from "./component/createAd";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <FormRegister /> */}
        <LoginForm />
        <CreateAd />
      </div>
    );
  }
}

export default App;
