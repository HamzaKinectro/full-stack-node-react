const express = require("express");
const app = express();
var session = require("express-session");
var request = require("request");
const key = require("../../config/key");

app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));

var access_token = "";
var apiresponse;
var sess;

module.exports = app => {
  // Login User Api Call Post
  app.post("/api/sign_in", (req, res) => {
    console.log("i am in login call");
    request.post(
      key.sign_in_url,
      {
        json: {
          email: req.body.email,
          password: req.body.password
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          email = response.headers.uid;

          key.email = response.headers.uid;
          key.client = response.headers.client;
          console.log("user client id :" + response.headers.client);
          console.log(key.client);
          var result = [];
          for (var i in response.headers) result.push(i, response.headers[i]);
          access_token = result[17];
          key.access_token = access_token;
          key.expiry = response.headers.expiry;
          //store Session Data User
          sess = req.session;
          sess.email = email;
          req.session.save();
          res = access_token;
          console.log("in user login session create");
          console.log(req.session);
          //res.end("done");
          //res.redirect("/admin");
          //console.log(response.body);
          apiresponse = response.body;
          console.log("apiresponse");
          console.log(apiresponse);
        } else {
          apiresponse = response.body.errors;
        }
      }
    );
    console.log(apiresponse);
    res.send({
      apiresponse
    });
  });
};
