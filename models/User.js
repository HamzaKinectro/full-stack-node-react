const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  postTweet: String
});

mongoose.model("users", userSchema);
