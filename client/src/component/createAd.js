import React from "react";
import { Input } from "antd";
import { Button } from "antd";

const { TextArea } = Input;

class CreateAd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const data1 = this.state.value;

    // axios({
    //   method: "post",
    //   url: "http://localhost:3000/post_ad_p",
    //   data: data1,
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
    const response = await fetch("/api/post_ad_p", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: data1
      })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="ui comments" style={{ margin: "5%" }}>
        <div className="comment">
          <div className="content">
            <form className="ui reply form" onSubmit={this.handleSubmit}>
              <label>
                ENTER JSON OBJECT :
                <br />
                <br />
                <TextArea
                  rows={8}
                  value={this.state.value}
                  onChange={this.handleChange}
                  type="text"
                  className="field"
                />
              </label>
              <br />
              <br />

              {/* <input
                className="ui primary button"
                type="submit"
                value="Submit"
              /> */}
              <Button type="primary" htmlType="submit" value="Submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAd;
