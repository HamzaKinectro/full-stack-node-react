import React, { Component } from "react";

import "./App.css";

import FormRegister from "./component/form";
import LoginForm from "./component/LoginForm";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <FormRegister /> */}
        <LoginForm />
      </div>
    );
  }
}

export default App;
