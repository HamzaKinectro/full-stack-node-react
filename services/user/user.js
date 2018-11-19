const key = require("../../config/key");
module.exports = app => {
  app.get("/api/login_user_data", (req, res) => {
    res.send({
      client: key.client,
      access_token: key.access_token,
      expiry: key.expiry,
      email: key.email
    });
  });
};
