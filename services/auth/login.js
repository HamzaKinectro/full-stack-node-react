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

  function scaryClown(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          request.post(
            key.sign_in_url,
            {
              json: {
                email: email,
                password: password
              }
            },
            function(error, response, body) {
              if (!error && response.statusCode == 200) {
                email = response.headers.uid;

                key.email = response.headers.uid;
                key.client = response.headers.client;
                var result = [];
                for (var i in response.headers)
                  result.push(i, response.headers[i]);
                access_token = result[17];
                key.access_token = access_token;
                key.expiry = response.headers.expiry;

                apiresponse = response.body;
                console.log("apiresponse");
                console.log(apiresponse);
                respo = apiresponse;
              }

              console.log("==============");
              console.log(response.body);
              respo = response.body;
            }
          )
        );
      }, 5000);
    });
  }

  app.post("/api/sign_in", async (req, res) => {
    console.log("i am in login call");
    console.log(req.body.email);

    // const msg = await nestedApi(req.body.email, req.body.password);
    const msg = await scaryClown(req.body.email, req.body.password);
    console.log("message is");
    console.log(msg);
    console.log("here you should wait for above");
  });

  //
};
