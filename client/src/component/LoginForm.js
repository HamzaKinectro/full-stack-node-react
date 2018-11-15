import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    response: "",
    responseToPost: "",
    email: "",
    password: ""
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  //   callApi = async () => {
  //     const response = await fetch("/api/hello");
  //     const body = await response.json();

  //     if (response.status !== 200) throw Error(body.message);

  //     return body;
  //   };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    const response = await fetch("/api/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
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

export default LoginForm;
