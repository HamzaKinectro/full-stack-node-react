const express = require("express");
var request = require("request");
const key = require("../../config/key");

module.exports = app => {
  app.post("/api/auth", (req, res) => {
    request.post(
      key.registration_url,
      {
        json: {
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      }
    );
    // new User({ postTweet: req.body.post }).save();
    res.send(
      `I received your POST request. This is what you sent me: ${
        req.body.email
      }`
    );
  });
};
