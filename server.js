const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("./models/User");
mongoose.connect("mongodb://hamza:hamza123@ds011963.mlab.com:11963/dummy-post");

const app = express();
const port = process.env.PORT || 5000;
const User = mongoose.model("users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  //console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.confirmPassword);
  console.log("i am at post call");
  // new User({ postTweet: req.body.post }).save();
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.email}`
  );
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
