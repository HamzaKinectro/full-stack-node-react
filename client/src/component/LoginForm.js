import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Card } from "antd";

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { userName, password } = values;
      if (!err) {
        fetch("/api/sign_in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: userName,
            password: password
          })
        });
      } else {
        console.log("Something went Wrong!");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ marginLeft: "40%", marginRight: "36%", marginTop: "10%" }}>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{ width: "300px" }}
        >
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" style={{ float: "right" }}>
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
            Or <a>register now!</a>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm;
