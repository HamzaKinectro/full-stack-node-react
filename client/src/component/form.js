import React, { Component } from "react";

class form extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Email:</strong>
          </p>
          <input
            type="text"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <p>
            <strong>Password:</strong>
          </p>
          <input
            type="text"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <p>
            <strong>Confirm Password:</strong>
          </p>
          <input
            type="text"
            value={this.state.confirmPassword}
            onChange={e => this.setState({ confirmPassword: e.target.value })}
          />
          <br />
          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default form;
