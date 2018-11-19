const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var session = require("express-session");
const bodyParser = require("body-parser");
require("./models/User");
mongoose.connect("mongodb://hamza:hamza123@ds011963.mlab.com:11963/dummy-post");
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

// app.get("/", function(req, res) {
//   sess = req.session;
//   if (sess.email) {
//     res.redirect("/admin");
//   } else {
//     res.render("index.html");
//   }
// });

// API calls dummy
app.get("/", (req, res) => {
  res.send({ express: "Hello From Express" });
});

// api for new User Post call
require("./services/auth/registration")(app);
// app.post("/api/auth", (req, res) => {
//   request.post(
//     "http://54.66.225.168/auth",
//     {
//       json: {
//         email: req.body.email,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword
//       }
//     },
//     function(error, response, body) {
//       if (!error && response.statusCode == 200) {
//         console.log(body);
//       }
//     }
//   );
//   // new User({ postTweet: req.body.post }).save();
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.email}`
//   );
// });

// api for create Ad Post call
require("./services/createAd/createAd")(app);
// app.post("/api/post_ad_p", (req, res) => {
//   request.post(
//     {
//       url: "http://54.66.225.168/post_ad_p",
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36",
//         "Content-Type": "application/x-www-form-urlencoded",
//         "access-token": access_token,
//         client: client,
//         expiry: expiry,
//         uid: email
//       },
//       form: req.body.data,
//       method: "POST"
//     },
//     function(e, r, body) {
//       if (!e && r.statusCode == 200) {
//         console.log(body);
//       }
//     }
//   );

//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.data}`
//   );
// });

// Login User Api Call Post
require("./services/auth/login")(app);

// app.post("/api/sign_in", (req, res) => {
//   console.log("i am in login call");

//   request.post(
//     "http://54.66.225.168/auth/sign_in",
//     {
//       json: {
//         email: req.body.email,
//         password: req.body.password
//       }
//     },
//     function(error, response, body) {
//       if (!error && response.statusCode == 200) {
//         email = response.headers.uid;
//         client = response.headers.client;
//         var result = [];
//         for (var i in response.headers) result.push(i, response.headers[i]);
//         access_token = result[17];
//         expiry = response.headers.expiry;
//         //store Session Data User
//         sess = req.session;
//         sess.email = email;
//         req.session.save();
//         res = access_token;
//         console.log("in user login session create");
//         console.log(req.session);
//         //res.end("done");
//         //res.redirect("/admin");
//         //console.log(response.body);
//         apiresponse = response.body;
//         console.log("apiresponse");
//         console.log(apiresponse);
//       } else {
//         apiresponse = response.body.errors;
//       }
//     }
//   );
//   console.log(apiresponse);
//   res.send({
//     apiresponse
//   });
// });

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
