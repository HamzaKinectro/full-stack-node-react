//import React from "react";
import React, { Component } from "react";
//import axios from "axios";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email);
    // axios({
    //   method: "post",
    //   url: "http://localhost:3000/import_ad",
    //   data: {
    //     ad_id: this.state.adId,
    //     adset_id: this.state.adsetId,
    //     fb_ad_acc_id: this.state.adAccountId,
    //     campaign_id: this.state.CampaginId,
    //     ad_title: this.state.adTitle
    //   },
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div className="ui comments" style={{ margin: "5%" }}>
        <div className="comment">
          <div className="content">
            <form className="ui equal width form" onSubmit={this.handleSubmit}>
              <div className="fields">
                <div className="field">
                  <label>Enter Email </label>
                  <input
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    type="text"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="field">
                  <label>Enter Password </label>
                  <input
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    type="text"
                    placeholder="Enter Password"
                  />
                </div>
              </div>

              <input
                className="ui primary button"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
