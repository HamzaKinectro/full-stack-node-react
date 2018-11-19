const key = require("../../config/key");

module.exports = app => {
  app.post("/api/post_ad_p", (req, res) => {
    request.post(
      {
        url: key.create_ad_url,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36",
          "Content-Type": "application/x-www-form-urlencoded",
          "access-token": key.access_token,
          client: key.client,
          expiry: key.expiry,
          uid: key.email
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
};
