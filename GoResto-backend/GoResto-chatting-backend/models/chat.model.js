const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  firstUserId: { type: String },
  secondUserId: { type: String },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
