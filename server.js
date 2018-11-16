const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("./models/User");
mongoose.connect("mongodb://hamza:hamza123@ds011963.mlab.com:11963/dummy-post");
var request = require("request");

const app = express();
const port = process.env.PORT || 5000;
const User = mongoose.model("users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var client = "";
var access_token = "";
var expiry = "";
var email = "";
// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

// api for new User
app.post("/api/auth", (req, res) => {
  request.post(
    "http://54.66.225.168/auth",
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
    `I received your POST request. This is what you sent me: ${req.body.email}`
  );
});

// api for create Ad
app.post("/api/post_ad_p", (req, res) => {
  request.post(
    {
      url: "http://54.66.225.168/post_ad_p",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "access-token": access_token,
        client: client,
        expiry: expiry,
        uid: email
      },
      form: req.body.data,
      method: "POST"
    },
    function(e, r, body) {
      if (!e && r.statusCode == 200) {
        console.log(body);
      }
    }
  );

  res.send(
    `I received your POST request. This is what you sent me: ${req.body.data}`
  );
});

// Login User Api Call
app.post("/api/sign_in", (req, res) => {
  request.post(
    "http://54.66.225.168/auth/sign_in",
    {
      json: {
        email: req.body.email,
        password: req.body.password
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        email = response.headers.uid;
        client = response.headers.client;
        var result = [];

        for (var i in response.headers) result.push(i, response.headers[i]);
        access_token = result[17];
        expiry = response.headers.expiry;
      }
    }
  );
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.email}`
  );
});

// get api use to store the login User Data
app.get("/api/login_user_data", (req, res) => {
  res.send({
    client: client,
    access_token: access_token,
    expiry: expiry,
    email: email
  });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
