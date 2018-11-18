import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
const { Header } = Layout;

class Navbar extends React.Component {
  state = {
    email: "",
    client: "",
    expiry: "",
    access_token: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = axios
      .get("/api/login_user_data")
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    //console.log(body);
    return body;
  };

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div
            className="logo"
            style={{
              width: "120px",
              height: "31px",
              background: "rgba(255, 255, 255, 0.2)",
              margin: "16px 24px 16px 0",
              float: "left"
            }}
          />
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/createAd">CreateAd</Link>
            </Menu.Item>

            <Menu.Item key="4" style={{ marginLeft: "60%" }}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/registration">Sign Up</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default Navbar;
