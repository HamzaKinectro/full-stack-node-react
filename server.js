const express = require("express");
const path = require("path");
var session = require("express-session");
const bodyParser = require("body-parser");
require("./models/User");

var request = require("request");
const app = express();
const port = process.env.PORT || 5000;
//const User = mongoose.model("users");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));

var client = "";
var access_token = "";
var expiry = "";
var email = "";
var apiresponse;

var sess;

app.get("/", (req, res) => {
  res.send({ express: "Hello From Express" });
});

// api for new User Post call
require("./services/auth/registration")(app);

// api for create Ad Post call
require("./services/createAd/createAd")(app);

// Login User Api Call Post
require("./services/auth/login")(app);

// get api use to store the login User Data
app.get("/api/login_user_data", (req, res) => {
  res.send({
    client: client,
    access_token: access_token,
    expiry: expiry,
    email: email
  });
});

app.get("/admin", function(req, res) {
  sess = req.session;
  console.log("I am in admin api");
  console.log(sess);
  //sess = req.session;
  // console.log("i am at admin api");
  // console.log(req.session);
  // console.log(sess.email);
  if (sess.email) {
    res.write("<h1>Hello " + sess.email + "</h1><br>");
    res.end("<a href=" + "/logout" + ">Logout</a>");
  } else {
    res.write("<h1>Please login first.</h1>");
    res.end("<a href=" + "/" + ">Login</a>");
  }
});

app.get("/logout", function(req, res) {
  console.log(req.session);
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
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
